import React, { useState, useEffect } from 'react';
import { ChemicalElement } from '../../types/element';
import { computeOrbitalBoxes } from '../../utils/chemistry';
import { Play, RotateCcw, Info, ArrowUp, ArrowDown } from 'lucide-react';

interface OrbitalDiagramVisualizerProps {
  element: ChemicalElement;
}

export const OrbitalDiagramVisualizer: React.FC<OrbitalDiagramVisualizerProps> = ({ element }) => {
  const [animatingCount, setAnimatingCount] = useState<number>(element.number);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Reset animating count when element changes
  useEffect(() => {
    setAnimatingCount(element.number);
    setIsAutoFilling(false);
  }, [element.number]);

  // Handle step-by-step Aufbau animation
  useEffect(() => {
    if (!isAutoFilling) return;

    if (animatingCount >= element.number) {
      setIsAutoFilling(false);
      return;
    }

    const timer = setTimeout(() => {
      setAnimatingCount((prev) => Math.min(element.number, prev + 1));
    }, 180);

    return () => clearTimeout(timer);
  }, [isAutoFilling, animatingCount, element.number]);

  const { subshells } = computeOrbitalBoxes(animatingCount);

  const startAnimation = () => {
    setAnimatingCount(0);
    setIsAutoFilling(true);
  };

  const resetToFull = () => {
    setIsAutoFilling(false);
    setAnimatingCount(element.number);
  };

  return (
    <div className="flex flex-col p-4 bg-slate-900/80 rounded-xl border border-slate-800">
      {/* Header with Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800 text-xs">
        <div>
          <div className="font-semibold text-slate-200">
            Aufbau & Hund's Rule Orbital Diagram
          </div>
          <div className="text-slate-400 font-mono text-[11px] mt-0.5">
            Filled: <span className="text-sky-400 font-bold">{animatingCount}</span> / {element.number} electrons
            {isAutoFilling && <span className="text-amber-400 ml-2 animate-pulse">Filling in progress...</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startAnimation}
            disabled={isAutoFilling}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Animate Filling</span>
          </button>
          <button
            onClick={resetToFull}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset to full ground state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Orbitals Container */}
      <div className="max-h-72 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {subshells.map((sub, sIdx) => {
            const totalInSub = sub.boxes.reduce((sum, b) => sum + b.electrons, 0);
            return (
              <div
                key={sIdx}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-semibold text-slate-300">
                    {sub.name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    ({totalInSub} e⁻)
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {sub.boxes.map((box, bIdx) => (
                    <div
                      key={bIdx}
                      className={`flex-1 h-12 rounded border flex items-center justify-center gap-1 transition-all ${
                        box.electrons === 2
                          ? 'border-sky-500/50 bg-sky-500/10'
                          : box.electrons === 1
                          ? 'border-amber-500/50 bg-amber-500/10'
                          : 'border-slate-800 bg-slate-900/40'
                      }`}
                    >
                      {box.spinUp && (
                        <div
                          className="flex flex-col items-center text-sky-400"
                          title="Spin-up (+1/2)"
                        >
                          <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                      {box.spinDown && (
                        <div
                          className="flex flex-col items-center text-rose-400"
                          title="Spin-down (-1/2)"
                        >
                          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                      {box.electrons === 0 && (
                        <span className="text-[10px] text-slate-700 font-mono">0</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Rules Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong className="text-slate-200">Quantum Principles Demonstrated:</strong>{' '}
          <span className="text-sky-300 font-medium">Aufbau Principle</span> dictates electrons fill lowest available energy levels first (1s &lt; 2s &lt; 2p &lt; 3s...).{' '}
          <span className="text-amber-300 font-medium">Hund's Rule</span> ensures degenerate orbitals are each singly occupied with parallel spins (↑) before pairing (↓).{' '}
          <span className="text-rose-300 font-medium">Pauli Exclusion</span> requires no two electrons to have identical quantum states.
        </div>
      </div>
    </div>
  );
};
