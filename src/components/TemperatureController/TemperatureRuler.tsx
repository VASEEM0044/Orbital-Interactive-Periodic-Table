import React, { useRef } from 'react';
import { ChemicalElement } from '../../types/element';
import { convertTemp } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface TemperatureRulerProps {
  currentTempK: number;
  elements: ChemicalElement[];
  onTempChange: (tempK: number) => void;
}

export const TemperatureRuler: React.FC<TemperatureRulerProps> = ({
  currentTempK,
  onTempChange,
}) => {
  const { t } = useLanguage();
  const rulerRef = useRef<HTMLDivElement>(null);
  const tempConv = convertTemp(currentTempK);

  const benchmarks = [
    { label: '0K', sub: t('absZero'), val: 0 },
    { label: '77K', sub: t('liquidN2'), val: 77.36 },
    { label: '273K', sub: t('iceMelts'), val: 273.15 },
    { label: '293K', sub: t('roomTemp'), val: 293.15 },
    { label: '373K', sub: t('waterBoils'), val: 373.15 },
    { label: '1811K', sub: t('ironMelts'), val: 1811 },
    { label: '3695K', sub: t('tungstenMelts'), val: 3695 },
    { label: '6000K', sub: t('solarPhotosphere'), val: 6000 },
  ];

  const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTempChange(parseFloat(e.target.value));
  };

  const percentage = (currentTempK / 6000) * 100;

  return (
    <div className="w-full bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-sm flex flex-col gap-3">
      {/* Top Header: Tiny Muted Label + Large Temperature Readout + Preset Chips */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              {t('thermalScrubber')}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-display">
                {Math.round(currentTempK)}
              </span>
              <span className="text-xs font-mono font-medium text-neutral-400">
                K · {tempConv.celsius}°C · {tempConv.fahrenheit}°F
              </span>
            </div>
          </div>
        </div>

        {/* Clickable Preset Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">
          {benchmarks.map((b) => {
            const isSelected = Math.abs(currentTempK - b.val) < 2;
            return (
              <button
                key={b.label}
                onClick={() => {
                  soundFx.playClickSound();
                  onTempChange(b.val);
                }}
                className={`px-3 py-1 rounded-full text-xs transition-all font-medium whitespace-nowrap shrink-0 touch-manipulation ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                }`}
                title={b.sub}
              >
                <span>{b.label}</span>
                <span className="hidden md:inline text-[10px] opacity-70 ml-1">({b.sub})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Ruler Scrubber with Calibrated Tick Marks */}
      <div className="relative pt-3 pb-1" ref={rulerRef}>
        <input
          type="range"
          min="0"
          max="6000"
          step="5"
          value={currentTempK}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 touch-none"
        />

        <div className="relative w-full h-8 flex items-center bg-neutral-50 rounded-lg border border-black/[0.05] px-2 overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-100 via-amber-100 to-rose-200 transition-all pointer-events-none opacity-60"
            style={{ width: `${percentage}%` }}
          />

          <div className="w-full flex items-center justify-between pointer-events-none relative z-10 px-1">
            {ticks.map((tVal) => (
              <div key={tVal} className="flex flex-col items-center">
                <div
                  className={`w-px ${
                    tVal % 1000 === 0 ? 'h-3 bg-neutral-400' : 'h-1.5 bg-neutral-300'
                  }`}
                />
                {tVal % 1000 === 0 && (
                  <span className="text-[9px] font-mono text-neutral-400 mt-1 select-none">
                    {tVal === 0 ? '0K' : `${tVal / 1000}k`}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center transition-all duration-75"
            style={{ left: `calc(${percentage}% + ${(0.5 - percentage / 100) * 16}px)` }}
          >
            <div className="w-3.5 h-3.5 bg-[#1A1A1A] rotate-45 rounded-[2px] shadow-md border border-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
