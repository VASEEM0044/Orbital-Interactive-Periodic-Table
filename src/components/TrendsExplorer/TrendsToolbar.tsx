import React from 'react';
import { AtomicTrend } from '../../types/element';
import { TREND_INFO_LIST } from '../../data/elements';
import { TrendingUp, Info, BarChart3, RotateCcw } from 'lucide-react';

interface TrendsToolbarProps {
  activeTrend: AtomicTrend;
  onSelectTrend: (trend: AtomicTrend) => void;
  onOpenTrendGraph: () => void;
}

export const TrendsToolbar: React.FC<TrendsToolbarProps> = ({
  activeTrend,
  onSelectTrend,
  onOpenTrendGraph,
}) => {
  const currentTrendInfo = activeTrend !== 'none' ? TREND_INFO_LIST[activeTrend] : null;

  const trendButtons: { id: AtomicTrend; label: string }[] = [
    { id: 'none', label: 'Default Categories' },
    { id: 'electronegativity', label: 'Electronegativity' },
    { id: 'atomicRadius', label: 'Atomic Radius' },
    { id: 'ionizationEnergy', label: '1st Ionization Energy' },
    { id: 'electronAffinity', label: 'Electron Affinity' },
    { id: 'meltingPoint', label: 'Melting Point' },
    { id: 'density', label: 'Density' },
  ];

  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200">
            Atomic Trends Heatmap
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-400">
            Visualize periodic laws across periods & groups
          </span>
        </div>

        {/* Action: Open Graph Modal */}
        <div className="flex items-center gap-2">
          {activeTrend !== 'none' && (
            <button
              onClick={() => onSelectTrend('none')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Heatmap</span>
            </button>
          )}

          <button
            onClick={onOpenTrendGraph}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-medium transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Interactive Trend Curves</span>
          </button>
        </div>
      </div>

      {/* Trend Selector Chips */}
      <div className="flex flex-wrap gap-1.5">
        {trendButtons.map((btn) => {
          const isActive = activeTrend === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => onSelectTrend(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Trend Explanation & Heatmap Color Legend */}
      {currentTrendInfo && (
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in">
          {/* Explanation text */}
          <div className="flex items-start gap-2.5 max-w-2xl">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-sky-200 mr-1.5">
                {currentTrendInfo.name} ({currentTrendInfo.unit}):
              </span>
              <span className="text-slate-300">
                {currentTrendInfo.periodicRule}
              </span>
            </div>
          </div>

          {/* Color Gradient Legend Bar */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center justify-between w-48 text-[10px] font-mono text-slate-400 mb-1">
              <span>Low ({currentTrendInfo.min})</span>
              <span>High ({currentTrendInfo.max})</span>
            </div>
            <div
              className="w-48 h-2.5 rounded-full border border-white/20 shadow-inner"
              style={{
                background:
                  'linear-gradient(to right, rgb(30,27,75), rgb(59,130,246), rgb(6,182,212), rgb(16,185,129), rgb(245,158,11), rgb(239,68,68))',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
