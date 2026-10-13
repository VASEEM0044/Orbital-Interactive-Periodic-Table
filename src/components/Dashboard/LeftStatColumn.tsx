import React from 'react';
import { ChemicalElement, AtomicTrend, OrbitalBlock, ElementCategory } from '../../types/element';
import { TREND_INFO_LIST, CATEGORY_COLORS } from '../../data/elements';
import { getElementStateAtTemp } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface LeftStatColumnProps {
  elements: ChemicalElement[];
  currentTempK: number;
  activeTrend: AtomicTrend;
  onSelectTrend: (trend: AtomicTrend) => void;
  selectedBlock: OrbitalBlock | 'all';
  onSelectBlock: (block: OrbitalBlock | 'all') => void;
  selectedCategory: ElementCategory | 'all';
  onSelectCategory: (cat: ElementCategory | 'all') => void;
}

export const LeftStatColumn: React.FC<LeftStatColumnProps> = ({
  elements,
  currentTempK,
  activeTrend,
  onSelectTrend,
  selectedBlock,
  onSelectBlock,
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useLanguage();

  const phaseCounts = elements.reduce(
    (acc, el) => {
      const state = getElementStateAtTemp(el, currentTempK);
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    },
    { solid: 0, liquid: 0, gas: 0, unknown: 0 } as Record<string, number>
  );

  const total = elements.length || 118;
  const solidPct = (phaseCounts.solid / total) * 100;
  const liquidPct = (phaseCounts.liquid / total) * 100;
  const gasPct = (phaseCounts.gas / total) * 100;

  const currentTrendInfo = activeTrend !== 'none' ? TREND_INFO_LIST[activeTrend] : null;

  const trendsOptions: { id: AtomicTrend; labelKey: string }[] = [
    { id: 'none', labelKey: 'defaultView' },
    { id: 'electronegativity', labelKey: 'electronegativity' },
    { id: 'atomicRadius', labelKey: 'atomicRadius' },
    { id: 'ionizationEnergy', labelKey: 'ionizationEnergy' },
    { id: 'electronAffinity', labelKey: 'electronAffinity' },
    { id: 'meltingPoint', labelKey: 'meltingPoint' },
    { id: 'density', labelKey: 'density' },
  ];

  const blocks: { id: OrbitalBlock | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 's', label: 's-block' },
    { id: 'p', label: 'p-block' },
    { id: 'd', label: 'd-block' },
    { id: 'f', label: 'f-block' },
  ];

  return (
    <div className="w-[260px] shrink-0 flex flex-col gap-4 select-none">
      {/* CARD 1: PHASE DISTRIBUTION */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {t('phaseDistribution')}
          </span>
          <span className="text-[10px] font-mono font-medium text-neutral-400">
            @{Math.round(currentTempK)}K
          </span>
        </div>

        {/* Large Numbers */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div>
            <span className="text-[10px] font-medium text-neutral-500 block">{t('solid')}</span>
            <span className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
              {phaseCounts.solid}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-medium text-sky-600 block">{t('liquid')}</span>
            <span className="text-2xl font-bold tracking-tight text-sky-600 font-display">
              {phaseCounts.liquid}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-medium text-rose-500 block">{t('gas')}</span>
            <span className="text-2xl font-bold tracking-tight text-rose-500 font-display">
              {phaseCounts.gas}
            </span>
          </div>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full h-2 rounded-full bg-neutral-100 flex overflow-hidden">
          <div
            className="bg-neutral-800 transition-all duration-300"
            style={{ width: `${solidPct}%` }}
            title={`${t('solid')}: ${phaseCounts.solid}`}
          />
          <div
            className="bg-sky-400 transition-all duration-300"
            style={{ width: `${liquidPct}%` }}
            title={`${t('liquid')}: ${phaseCounts.liquid}`}
          />
          <div
            className="bg-rose-400 transition-all duration-300"
            style={{ width: `${gasPct}%` }}
            title={`${t('gas')}: ${phaseCounts.gas}`}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
          <span>{t('solid')} {solidPct.toFixed(0)}%</span>
          <span>{t('liquid')} {liquidPct.toFixed(0)}%</span>
          <span>{t('gas')} {gasPct.toFixed(0)}%</span>
        </div>
      </div>

      {/* CARD 2: ATOMIC TRENDS & GRADIENT BAR */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {t('atomicTrend')}
          </span>
          {activeTrend !== 'none' && (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ACTIVE
            </span>
          )}
        </div>

        {/* Trend Pills */}
        <div className="flex flex-wrap gap-1.5">
          {trendsOptions.map((item) => {
            const isActive = activeTrend === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClickSound();
                  onSelectTrend(item.id);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Gradient Bar with Min/Max & Indicator Triangle */}
        {currentTrendInfo && (
          <div className="pt-2 border-t border-black/[0.05] flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
              <span>Low ({currentTrendInfo.min} {currentTrendInfo.unit})</span>
              <span>High ({currentTrendInfo.max} {currentTrendInfo.unit})</span>
            </div>

            <div className="relative w-full h-2.5 rounded-full bg-gradient-to-r from-[#E0F2FE] via-[#D1FAE5] via-[#FEF3C7] to-[#FEE2E2] border border-black/[0.05]">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] text-[#1A1A1A]">
                ▼
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 leading-snug mt-1">
              {currentTrendInfo.periodicRule}
            </p>
          </div>
        )}
      </div>

      {/* CARD 3: ORBITAL BLOCKS & CATEGORIES */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm flex flex-col gap-3">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
          {t('orbitalBlocks')}
        </span>

        {/* Block Chips */}
        <div className="flex items-center gap-1.5">
          {blocks.map((b) => {
            const isActive = selectedBlock === b.id;
            return (
              <button
                key={b.id}
                onClick={() => {
                  soundFx.playClickSound();
                  onSelectBlock(b.id);
                }}
                className={`flex-1 py-1 rounded-full text-xs font-medium text-center transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700'
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>

        {/* Category Filter Dropdown */}
        <div className="pt-2 border-t border-black/[0.05] flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {t('chemicalFamily')}
          </span>

          <select
            value={selectedCategory}
            onChange={(e) => {
              soundFx.playClickSound();
              onSelectCategory(e.target.value as ElementCategory | 'all');
            }}
            className="w-full px-3 py-1.5 rounded-xl bg-neutral-100 border border-transparent focus:border-neutral-300 text-xs font-medium text-neutral-800 outline-none cursor-pointer"
          >
            <option value="all">{t('allFamilies')}</option>
            {Object.entries(CATEGORY_COLORS).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
