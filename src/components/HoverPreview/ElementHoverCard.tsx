import React from 'react';
import { ChemicalElement, StateOfMatter } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { getElementStateAtTemp, convertTemp } from '../../utils/chemistry';
import { Sparkles, Thermometer, Layers, Compass } from 'lucide-react';

interface ElementHoverCardProps {
  element: ChemicalElement | null;
  currentTempK: number;
}

export const ElementHoverCard: React.FC<ElementHoverCardProps> = ({
  element,
  currentTempK,
}) => {
  if (!element) {
    return (
      <div className="h-full flex items-center justify-center p-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-slate-500 text-xs text-center">
        <div>
          <Compass className="w-5 h-5 mx-auto mb-1.5 opacity-40 text-sky-400" />
          <span>Hover over any element tile to preview quick atomic properties</span>
        </div>
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const stateAtTemp: StateOfMatter = getElementStateAtTemp(element, currentTempK);
  const tempConv = convertTemp(currentTempK);

  const stateColors: Record<StateOfMatter, { label: string; text: string }> = {
    solid: { label: 'Solid', text: 'text-slate-300' },
    liquid: { label: 'Liquid', text: 'text-sky-400' },
    gas: { label: 'Gas', text: 'text-rose-400' },
    unknown: { label: 'Synthetic/Unknown', text: 'text-slate-500' },
  };

  return (
    <div className="h-full p-3.5 rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all duration-150 animate-in fade-in zoom-in-95">
      {/* Top row: Symbol, Number, Category */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border font-mono font-bold text-white shadow-sm ${catStyle.bg} ${catStyle.border}`}
          >
            <span className="text-[10px] text-slate-400 leading-none">
              {element.number}
            </span>
            <span className="text-xl leading-none mt-0.5">{element.symbol}</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-base text-white tracking-tight">
                {element.name}
              </h4>
              <span className="text-slate-400 text-xs font-mono">
                {element.atomicMass} u
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs mt-0.5">
              <span className={`font-medium ${catStyle.text}`}>
                {catStyle.label}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {element.block}-block
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] font-mono text-slate-400">
            {stateColors[stateAtTemp].label} @ {tempConv.kelvin}K
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Group {element.group ?? 'N/A'}, Period {element.period}
          </div>
        </div>
      </div>

      {/* Middle row: Minimal chemical stats */}
      <div className="grid grid-cols-4 gap-2 my-2 py-2 border-y border-slate-800 text-center font-mono">
        <div className="bg-slate-950/40 rounded p-1">
          <span className="text-[10px] text-slate-500 block">Config</span>
          <span className="text-xs text-sky-300 font-semibold truncate block">
            {element.electronConfiguration}
          </span>
        </div>
        <div className="bg-slate-950/40 rounded p-1">
          <span className="text-[10px] text-slate-500 block">Electroneg.</span>
          <span className="text-xs text-amber-300 font-semibold block">
            {element.electronegativity ?? '—'}
          </span>
        </div>
        <div className="bg-slate-950/40 rounded p-1">
          <span className="text-[10px] text-slate-500 block">Radius</span>
          <span className="text-xs text-emerald-300 font-semibold block">
            {element.atomicRadius ? `${element.atomicRadius} pm` : '—'}
          </span>
        </div>
        <div className="bg-slate-950/40 rounded p-1">
          <span className="text-[10px] text-slate-500 block">Valence e⁻</span>
          <span className="text-xs text-rose-300 font-semibold block">
            {element.shells[element.shells.length - 1]}
          </span>
        </div>
      </div>

      {/* Bottom row: Shells summary & Click prompt */}
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1 font-mono">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Shells: [{element.shells.join(', ')}]</span>
        </div>
        <div className="text-sky-400 font-medium text-[11px] flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Click tile for advanced orbital lab</span>
        </div>
      </div>
    </div>
  );
};
