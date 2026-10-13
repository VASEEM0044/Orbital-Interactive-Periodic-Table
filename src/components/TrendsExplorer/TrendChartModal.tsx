import React, { useState } from 'react';
import { ChemicalElement, AtomicTrend } from '../../types/element';
import { TREND_INFO_LIST } from '../../data/elements';
import { soundFx } from '../../utils/audio';
import { X, TrendingUp, Filter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface TrendChartModalProps {
  elements: ChemicalElement[];
  isOpen: boolean;
  onClose: () => void;
  onSelectElement: (element: ChemicalElement) => void;
}

export const TrendChartModal: React.FC<TrendChartModalProps> = ({
  elements,
  isOpen,
  onClose,
  onSelectElement,
}) => {
  const { getElementName, t } = useLanguage();
  const [selectedTrend, setSelectedTrend] = useState<AtomicTrend>('ionizationEnergy');
  const [selectedPeriod, setSelectedPeriod] = useState<number | 'all'>('all');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{
    element: ChemicalElement;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  if (!isOpen) return null;

  const trendInfo =
    selectedTrend !== 'none'
      ? TREND_INFO_LIST[selectedTrend]
      : TREND_INFO_LIST['ionizationEnergy'];

  // Filter elements
  const filteredElements = elements.filter((el) => {
    if (selectedPeriod !== 'all' && el.period !== selectedPeriod) return false;
    const val = el[selectedTrend as keyof ChemicalElement] as number | null;
    return val !== null && !Number.isNaN(val);
  });

  // Calculate plot coordinates
  const svgWidth = 840;
  const svgHeight = 340;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const minX = selectedPeriod === 'all' ? 1 : Math.min(...filteredElements.map((e) => e.number));
  const maxX = selectedPeriod === 'all' ? 118 : Math.max(...filteredElements.map((e) => e.number));

  const values = filteredElements.map(
    (e) => (e[selectedTrend as keyof ChemicalElement] as number) || 0
  );
  const minY = Math.min(...values, 0);
  const maxY = Math.max(...values, trendInfo.max);

  const getX = (num: number) =>
    padding.left + ((num - minX) / Math.max(1, maxX - minX)) * plotWidth;

  const getY = (val: number) =>
    padding.top + plotHeight - ((val - minY) / Math.max(1, maxY - minY)) * plotHeight;

  // Generate SVG path for line
  const points = filteredElements.map((el) => {
    const val = el[selectedTrend as keyof ChemicalElement] as number;
    return {
      element: el,
      x: getX(el.number),
      y: getY(val),
      val,
    };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  const trendTabs: { id: AtomicTrend; labelKey: string }[] = [
    { id: 'ionizationEnergy', labelKey: 'ionizationEnergy' },
    { id: 'electronegativity', labelKey: 'electronegativity' },
    { id: 'atomicRadius', labelKey: 'atomicRadius' },
    { id: 'electronAffinity', labelKey: 'electronAffinity' },
    { id: 'density', labelKey: 'density' },
    { id: 'meltingPoint', labelKey: 'meltingPoint' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/35 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl p-5 sm:p-6 rounded-2xl bg-[#F7F7F5] border border-black/[0.08] shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-display">
                  {t('trendsModalTitle')}
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {t(selectedTrend)} ({trendInfo.unit}) {t('trendsModalSubtitle')}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trend Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {trendTabs.map((tab) => {
              const isActive = selectedTrend === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClickSound();
                    setSelectedTrend(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-black/[0.05]'
                  }`}
                >
                  {t(tab.labelKey)}
                </button>
              );
            })}
          </div>

          {/* Period Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-black/[0.05] text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-500 font-medium">{t('filterPeriod')}:</span>
              <div className="flex items-center gap-1">
                {(['all', 1, 2, 3, 4, 5, 6, 7] as const).map((period) => {
                  const isActive = selectedPeriod === period;
                  return (
                    <button
                      key={period}
                      onClick={() => {
                        soundFx.playClickSound();
                        setSelectedPeriod(period);
                      }}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-medium transition-colors ${
                        isActive
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {period === 'all' ? t('all') : `P${period}`}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="text-neutral-400 font-mono text-[11px]">
              {filteredElements.length} {t('elementsPlotted')}
            </span>
          </div>

          {/* SVG Chart Canvas */}
          <div className="relative bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[700px] select-none font-mono text-[10px]"
            >
              {/* Subtle Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = padding.top + plotHeight * pct;
                const val = maxY - (maxY - minY) * pct;
                return (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={svgWidth - padding.right}
                      y2={y}
                      stroke="#F3F4F6"
                      strokeWidth="1"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      textAnchor="end"
                      fill="#9CA3AF"
                    >
                      {val.toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Ticks (Atomic Number) */}
              {[1, 10, 18, 36, 54, 86, 118].map((num) => {
                const x = getX(num);
                return (
                  <g key={num}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + plotHeight}
                      stroke="#F3F4F6"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <text
                      x={x}
                      y={svgHeight - padding.bottom + 16}
                      textAnchor="middle"
                      fill="#9CA3AF"
                    >
                      #{num}
                    </text>
                  </g>
                );
              })}

              {/* Axis Labels */}
              <text
                x={svgWidth / 2}
                y={svgHeight - 10}
                textAnchor="middle"
                fill="#6B7280"
                className="font-sans font-semibold text-[11px]"
              >
                {t('atomicNumberAxis')}
              </text>

              <text
                x={-(svgHeight / 2)}
                y={16}
                transform="rotate(-90)"
                textAnchor="middle"
                fill="#6B7280"
                className="font-sans font-semibold text-[11px]"
              >
                {t(selectedTrend)} ({trendInfo.unit})
              </text>

              {/* Shaded Area Under Line */}
              <defs>
                <linearGradient id="trendLightArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {points.length > 0 && (
                <path
                  d={`${pathD} L ${points[points.length - 1].x} ${
                    padding.top + plotHeight
                  } L ${points[0].x} ${padding.top + plotHeight} Z`}
                  fill="url(#trendLightArea)"
                />
              )}

              {/* Trend Polyline */}
              <path
                d={pathD}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Point Dots */}
              {points.map((pt) => {
                const isHovered = hoveredDataPoint?.element.number === pt.element.number;
                return (
                  <g key={pt.element.number}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 3.5}
                      fill={isHovered ? '#2563EB' : '#FFFFFF'}
                      stroke="#2563EB"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => {
                        soundFx.playHoverChime(pt.element.number);
                        setHoveredDataPoint({
                          element: pt.element,
                          value: pt.val,
                          x: pt.x,
                          y: pt.y,
                        });
                      }}
                      onMouseLeave={() => setHoveredDataPoint(null)}
                      onClick={() => {
                        soundFx.playClickSound();
                        onSelectElement(pt.element);
                        onClose();
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredDataPoint && (
              <div
                style={{
                  left: `${hoveredDataPoint.x + 12}px`,
                  top: `${hoveredDataPoint.y - 40}px`,
                }}
                className="absolute z-20 pointer-events-none p-2 rounded-xl bg-[#1A1A1A] text-white text-[11px] font-mono shadow-xl border border-white/10"
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-sky-300">{hoveredDataPoint.element.symbol}</span>
                  <span>({getElementName(hoveredDataPoint.element.number, hoveredDataPoint.element.name)})</span>
                </div>
                <div className="text-neutral-300 mt-0.5">
                  {t(selectedTrend)}:{' '}
                  <strong className="text-white">
                    {hoveredDataPoint.value} {trendInfo.unit}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Periodic Rule Explanation Card */}
          <div className="p-4 rounded-xl bg-white border border-black/[0.05] text-xs">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
              {t('periodicBehaviorHeading')}
            </span>
            <p className="text-neutral-700 leading-relaxed">
              {trendInfo.periodicRule}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
