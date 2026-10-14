import React from 'react';
import { ChemicalElement, AtomicTrend, StateOfMatter } from '../../types/element';
import { CATEGORY_COLORS, TREND_INFO_LIST } from '../../data/elements';
import { getElementStateAtTemp, getTrendColor } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface ElementTileProps {
  element: ChemicalElement;
  activeTrend: AtomicTrend;
  currentTempK: number;
  isSelected: boolean;
  isDimmed: boolean;
  onHover: (element: ChemicalElement, target: HTMLElement) => void;
  onMouseMove?: (target: HTMLElement) => void;
  onLeave: () => void;
  onClick: (element: ChemicalElement) => void;
}

export const ElementTile: React.FC<ElementTileProps> = ({
  element,
  activeTrend,
  currentTempK,
  isSelected,
  isDimmed,
  onHover,
  onMouseMove,
  onLeave,
  onClick,
}) => {
  const { getElementName } = useLanguage();
  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const stateAtTemp: StateOfMatter = getElementStateAtTemp(element, currentTempK);

  // Compute trend value if trend mode is active
  let trendValue: number | null = null;
  let trendColor: string | null = null;

  if (activeTrend !== 'none') {
    const trend = TREND_INFO_LIST[activeTrend];
    if (trend) {
      trendValue = (element[activeTrend as keyof ChemicalElement] as number | null) ?? null;
      trendColor = getTrendColor(trendValue, trend);
    }
  }

  // Format trend value for top-right display
  const getTrendDisplay = () => {
    if (activeTrend === 'none') {
      return element.atomicMass.toFixed(1);
    }
    if (trendValue === null || Number.isNaN(trendValue)) return '—';
    if (activeTrend === 'electronegativity') return trendValue.toFixed(1);
    if (activeTrend === 'density') return trendValue < 0.01 ? trendValue.toFixed(3) : trendValue.toFixed(1);
    if (activeTrend === 'meltingPoint') return `${Math.round(trendValue)}K`;
    return Math.round(trendValue).toString();
  };

  // State indicators (subtle dots for liquid / gas)
  const stateDot =
    stateAtTemp === 'liquid' ? (
      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-xs" title="Liquid @ active temperature" />
    ) : stateAtTemp === 'gas' ? (
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-xs" title="Gas @ active temperature" />
    ) : null;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    soundFx.playHoverChime(element.number);
    onHover(element, e.currentTarget);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (onMouseMove) {
      onMouseMove(e.currentTarget);
    }
  };

  const handleClick = () => {
    soundFx.playClickSound();
    onClick(element);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={onLeave}
      onFocus={(e) => handleMouseEnter(e as unknown as React.MouseEvent<HTMLElement>)}
      onBlur={onLeave}
      whileHover={{ scale: 1.14, zIndex: 35, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      style={{
        gridRow: element.gridRow,
        gridColumn: element.gridCol,
        backgroundColor: trendColor ? trendColor : undefined,
      }}
      className={`relative group aspect-square p-1 rounded-[10px] flex flex-col justify-between text-left select-none outline-none transition-all duration-150 border cursor-pointer touch-manipulation ${
        isSelected
          ? 'ring-2 ring-[#1A1A1A] ring-offset-2 ring-offset-white z-30 border-[#1A1A1A] shadow-md bg-white'
          : isDimmed
          ? 'opacity-20 grayscale border-neutral-200 bg-neutral-100'
          : trendColor
          ? 'border-black/[0.08] text-neutral-900 shadow-xs'
          : `${catStyle.bg} border-black/[0.06] hover:border-black/20 hover:shadow-md`
      }`}
    >
      {/* Top Header: Atomic Number & Mass/Trend */}
      <div className="flex items-center justify-between w-full leading-none text-[9px] font-mono">
        <span className="font-semibold text-neutral-500 group-hover:text-neutral-900">
          {element.number}
        </span>
        <div className="flex items-center gap-1">
          {stateDot}
          <span className="text-[8px] opacity-75 truncate max-w-[28px] text-right text-neutral-500">
            {getTrendDisplay()}
          </span>
        </div>
      </div>

      {/* Center: Chemical Symbol */}
      <div className="text-center w-full my-auto">
        <span className="font-display font-extrabold text-sm sm:text-base leading-none tracking-tight block text-neutral-900 group-hover:scale-105 transition-transform">
          {element.symbol}
        </span>
      </div>

      {/* Bottom: Name */}
      <div className="flex items-center justify-center w-full leading-none">
        <span className="text-[8px] truncate text-neutral-600 font-medium group-hover:text-neutral-900">
          {getElementName(element.number, element.name)}
        </span>
      </div>
    </motion.button>
  );
};
