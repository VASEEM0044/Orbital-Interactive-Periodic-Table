import React from 'react';
import { ElementCategory, OrbitalBlock } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { Search, Filter, Layers, BrainCircuit, ArrowRightLeft } from 'lucide-react';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ElementCategory | 'all';
  onCategoryChange: (category: ElementCategory | 'all') => void;
  selectedBlock: OrbitalBlock | 'all';
  onBlockChange: (block: OrbitalBlock | 'all') => void;
  onOpenQuiz: () => void;
  onOpenCompare: () => void;
}

const CATEGORIES: { id: ElementCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'alkali-metal', label: 'Alkali Metals' },
  { id: 'alkaline-earth', label: 'Alkaline Earth' },
  { id: 'transition-metal', label: 'Transition Metals' },
  { id: 'post-transition', label: 'Post-Transition' },
  { id: 'metalloid', label: 'Metalloids' },
  { id: 'reactive-nonmetal', label: 'Reactive Nonmetals' },
  { id: 'halogen', label: 'Halogens' },
  { id: 'noble-gas', label: 'Noble Gases' },
  { id: 'lanthanide', label: 'Lanthanides' },
  { id: 'actinide', label: 'Actinides' },
];

const BLOCKS: (OrbitalBlock | 'all')[] = ['all', 's', 'p', 'd', 'f'];

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBlock,
  onBlockChange,
  onOpenQuiz,
  onOpenCompare,
}) => {
  return (
    <div className="w-full flex flex-col gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg">
      {/* Top row: Search input + Educational Activity Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search element by name, symbol, or atomic number (e.g. Au, Carbon, 79)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Challenge & Compare Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCompare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 text-xs font-semibold transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Element Comparison</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Trends Challenge</span>
          </button>
        </div>
      </div>

      {/* Second row: Category chips filter */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Chemical Families:</span>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onCategoryChange('all')}
              className="text-sky-400 hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const style = cat.id !== 'all' ? CATEGORY_COLORS[cat.id] : null;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
                }`}
              >
                {style && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isSelected ? '#000' : style.text.replace('text-', ''),
                    }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Third row: Quantum Orbital Blocks (s, p, d, f) */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Orbital Blocks:</span>
        </div>

        <div className="flex items-center gap-1">
          {BLOCKS.map((blk) => (
            <button
              key={blk}
              onClick={() => onBlockChange(blk)}
              className={`px-2 py-0.5 rounded font-mono text-xs uppercase transition-colors ${
                selectedBlock === blk
                  ? 'bg-sky-500 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {blk === 'all' ? 'All' : `${blk}-block`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
