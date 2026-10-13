import React from 'react';
import { ChemicalElement, StateOfMatter } from '../../types/element';
import { getElementStateAtTemp, convertTemp } from '../../utils/chemistry';
import { Thermometer, RotateCcw } from 'lucide-react';

interface TemperatureSliderProps {
  currentTempK: number;
  elements: ChemicalElement[];
  onTempChange: (tempK: number) => void;
}

export const TemperatureSlider: React.FC<TemperatureSliderProps> = ({
  currentTempK,
  elements,
  onTempChange,
}) => {
  const [unit, setUnit] = React.useState<'K' | 'C' | 'F'>('K');

  const tempConv = convertTemp(currentTempK);

  // Calculate live phase counts across all 118 elements
  const counts: Record<StateOfMatter, number> = {
    solid: 0,
    liquid: 0,
    gas: 0,
    unknown: 0,
  };

  elements.forEach((el) => {
    const s = getElementStateAtTemp(el, currentTempK);
    counts[s]++;
  });

  const getDisplayedTemp = () => {
    if (unit === 'K') return `${tempConv.kelvin} K`;
    if (unit === 'C') return `${tempConv.celsius} °C`;
    return `${tempConv.fahrenheit} °F`;
  };

  const checkpoints = [
    { label: '0K (Abs. Zero)', temp: 0 },
    { label: '77K (Liq. N₂)', temp: 77 },
    { label: '273K (0°C)', temp: 273.15 },
    { label: '293K (Room)', temp: 293.15 },
    { label: '373K (Boiling H₂O)', temp: 373.15 },
    { label: '1811K (Fe Melts)', temp: 1811 },
    { label: '3695K (W Melts)', temp: 3695 },
  ];

  return (
    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3 shadow-md">
      {/* Header with Title & Value */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200">
            Interactive Temperature Simulation
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-400">
            Real-time phase transitions (Solid, Liquid, Gas)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Temperature unit switcher */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs font-mono">
            {(['K', 'C', 'F'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  unit === u
                    ? 'bg-sky-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                °{u}
              </button>
            ))}
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-slate-950 font-mono text-sm font-bold text-sky-300 border border-slate-800">
            {getDisplayedTemp()}
          </span>

          <button
            onClick={() => onTempChange(293.15)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset to Room Temperature (293 K / 20 °C)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-1.5">
        <input
          type="range"
          min="0"
          max="6000"
          step="10"
          value={currentTempK}
          onChange={(e) => onTempChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />

        {/* Quick Checkpoints */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {checkpoints.map((cp) => (
            <button
              key={cp.label}
              onClick={() => onTempChange(cp.temp)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                Math.abs(currentTempK - cp.temp) < 15
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {cp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phase State Summary Counter Badges */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
          <span className="text-slate-300 font-mono font-medium">
            Solid: <strong className="text-white">{counts.solid}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span className="text-slate-300 font-mono font-medium">
            Liquid: <strong className="text-sky-300">{counts.liquid}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="text-slate-300 font-mono font-medium">
            Gas: <strong className="text-rose-300">{counts.gas}</strong>
          </span>
        </div>
        {counts.unknown > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-slate-500 font-mono text-[11px]">
              Unknown/Synthetic: {counts.unknown}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
