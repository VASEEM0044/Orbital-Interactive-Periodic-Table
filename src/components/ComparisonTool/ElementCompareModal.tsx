import React, { useState } from 'react';
import { ChemicalElement } from '../../types/element';
import { BohrModelVisualizer } from '../ElementModal/BohrModelVisualizer';
import { CATEGORY_COLORS } from '../../data/elements';
import { soundFx } from '../../utils/audio';
import { X, ArrowRightLeft, Sparkles, Scale, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface ElementCompareModalProps {
  initialElementA: ChemicalElement;
  allElements: ChemicalElement[];
  isOpen: boolean;
  onClose: () => void;
}

export const ElementCompareModal: React.FC<ElementCompareModalProps> = ({
  initialElementA,
  allElements,
  isOpen,
  onClose,
}) => {
  const { getElementName, t } = useLanguage();
  const [elementA, setElementA] = useState<ChemicalElement>(initialElementA);
  const defaultB =
    allElements.find((e) => e.number === (initialElementA.number === 11 ? 19 : initialElementA.number === 9 ? 17 : 8)) ||
    allElements[1];
  const [elementB, setElementB] = useState<ChemicalElement>(defaultB);

  if (!isOpen) return null;

  const catStyleA = CATEGORY_COLORS[elementA.category] || CATEGORY_COLORS['unknown'];
  const catStyleB = CATEGORY_COLORS[elementB.category] || CATEGORY_COLORS['unknown'];

  // Calculate electronegativity difference (bond character)
  const enA = elementA.electronegativity;
  const enB = elementB.electronegativity;
  let enDelta: number | null = null;
  let bondType: string | null = null;

  if (enA !== null && enB !== null) {
    enDelta = Math.round(Math.abs(enA - enB) * 100) / 100;
    if (enDelta >= 1.7) {
      bondType = t('bondIonic');
    } else if (enDelta >= 0.4) {
      bondType = t('bondPolarCovalent');
    } else {
      bondType = t('bondNonpolarCovalent');
    }
  }

  // Radius delta
  const rA = elementA.atomicRadius;
  const rB = elementB.atomicRadius;
  const rDelta = rA !== null && rB !== null ? rA - rB : null;

  // Ionization delta
  const ieA = elementA.ionizationEnergy;
  const ieB = elementB.ionizationEnergy;
  const ieDelta = ieA !== null && ieB !== null ? Math.round(ieA - ieB) : null;

  const PRESET_PAIRS = [
    { label: 'Na vs K', numA: 11, numB: 19 },
    { label: 'F vs Cl', numA: 9, numB: 17 },
    { label: 'C vs Si', numA: 6, numB: 14 },
    { label: 'Na vs Cl', numA: 11, numB: 17 },
    { label: 'H vs O', numA: 1, numB: 8 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/35 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl max-h-[92vh] p-5 sm:p-6 rounded-2xl bg-[#F7F7F5] border border-black/[0.08] shadow-2xl flex flex-col gap-4 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-display">
                  {t('compareModalTitle')}
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {t('compareModalSubtitle')}
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

          {/* Quick Preset Pairs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-400 font-medium text-[11px] uppercase tracking-wider mr-1">
              {t('presetPairs')}
            </span>
            {PRESET_PAIRS.map((pair) => (
              <button
                key={pair.label}
                onClick={() => {
                  soundFx.playClickSound();
                  const a = allElements.find((e) => e.number === pair.numA);
                  const b = allElements.find((e) => e.number === pair.numB);
                  if (a) setElementA(a);
                  if (b) setElementB(b);
                }}
                className="px-3 py-1 rounded-full bg-white hover:bg-neutral-100 border border-black/[0.05] text-neutral-700 text-xs font-medium transition-colors"
              >
                {pair.label}
              </button>
            ))}
          </div>

          {/* Top Row: Dual Element Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ELEMENT A CARD */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {t('elementA')}
                </span>
                <select
                  value={elementA.number}
                  onChange={(e) => {
                    soundFx.playClickSound();
                    const el = allElements.find((item) => item.number === parseInt(e.target.value, 10));
                    if (el) setElementA(el);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-transparent focus:border-neutral-300 text-xs font-medium text-neutral-800 outline-none cursor-pointer"
                >
                  {allElements.map((el) => (
                    <option key={el.number} value={el.number}>
                      #{el.number} {getElementName(el.number, el.name)} ({el.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border font-mono font-bold shadow-xs ${catStyleA.bg} ${catStyleA.border}`}
                >
                  <span className="text-[10px] text-neutral-500 leading-none">{elementA.number}</span>
                  <span className="text-2xl font-display font-black leading-none mt-1 text-neutral-900">
                    {elementA.symbol}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-neutral-900 leading-none">
                    {getElementName(elementA.number, elementA.name)}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${catStyleA.pillBg} ${catStyleA.pillText} ${catStyleA.border}`}>
                      {catStyleA.label}
                    </span>
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {elementA.atomicMass} u
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ELEMENT B CARD */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {t('elementB')}
                </span>
                <select
                  value={elementB.number}
                  onChange={(e) => {
                    soundFx.playClickSound();
                    const el = allElements.find((item) => item.number === parseInt(e.target.value, 10));
                    if (el) setElementB(el);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-transparent focus:border-neutral-300 text-xs font-medium text-neutral-800 outline-none cursor-pointer"
                >
                  {allElements.map((el) => (
                    <option key={el.number} value={el.number}>
                      #{el.number} {getElementName(el.number, el.name)} ({el.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border font-mono font-bold shadow-xs ${catStyleB.bg} ${catStyleB.border}`}
                >
                  <span className="text-[10px] text-neutral-500 leading-none">{elementB.number}</span>
                  <span className="text-2xl font-display font-black leading-none mt-1 text-neutral-900">
                    {elementB.symbol}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-neutral-900 leading-none">
                    {getElementName(elementB.number, elementB.name)}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${catStyleB.pillBg} ${catStyleB.pillText} ${catStyleB.border}`}>
                      {catStyleB.label}
                    </span>
                    <span className="text-neutral-400 font-mono text-[11px]">
                      {elementB.atomicMass} u
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chemical Bond Character Card */}
          {enDelta !== null && bondType && (
            <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-500 font-medium">{t('predictedBond')}</span>
                <span className="font-bold text-neutral-900">{bondType}</span>
              </div>
              <span className="font-mono text-neutral-600 px-2 py-0.5 rounded bg-neutral-100">
                Δχ = |{enA} − {enB}| = {enDelta}
              </span>
            </div>
          )}

          {/* Detailed Property Comparison Table */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-4 shadow-sm overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/[0.06] text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  <th className="py-2 px-3">{getElementName(elementA.number, elementA.name)} ({elementA.symbol})</th>
                  <th className="py-2 px-3 text-center">{t('property')}</th>
                  <th className="py-2 px-3 text-right">{getElementName(elementB.number, elementB.name)} ({elementB.symbol})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-neutral-900">{elementA.electronegativity ?? '—'}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('electronegativity')}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-neutral-900">{elementB.electronegativity ?? '—'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-neutral-900">{elementA.atomicRadius ? `${elementA.atomicRadius} pm` : '—'}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('atomicRadius')}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-neutral-900">{elementB.atomicRadius ? `${elementB.atomicRadius} pm` : '—'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-neutral-900">{elementA.ionizationEnergy ? `${elementA.ionizationEnergy} kJ/mol` : '—'}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('firstIonizationEnergy')}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-neutral-900">{elementB.ionizationEnergy ? `${elementB.ionizationEnergy} kJ/mol` : '—'}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-neutral-900">{elementA.electronConfiguration}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('valenceConfig')}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-neutral-900">{elementB.electronConfiguration}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-neutral-700">[{elementA.shells.join(', ')}]</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('shellsLabel')}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-700">[{elementB.shells.join(', ')}]</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-neutral-700 capitalize">{elementA.standardState}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('standardState')}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-700 capitalize">{elementB.standardState}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-neutral-700">{elementA.density !== null ? `${elementA.density} g/cm³` : '—'}</td>
                  <td className="py-2.5 px-3 text-center text-neutral-500 font-sans">{t('density')}</td>
                  <td className="py-2.5 px-3 text-right text-neutral-700">{elementB.density !== null ? `${elementB.density} g/cm³` : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dual Bohr Atom Visualizers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-neutral-900 text-white flex flex-col items-center">
              <span className="text-[11px] font-mono text-neutral-400 mb-1">
                {getElementName(elementA.number, elementA.name)} ({elementA.symbol}) {t('bohrShells')}
              </span>
              <BohrModelVisualizer element={elementA} />
            </div>

            <div className="p-3 rounded-2xl bg-neutral-900 text-white flex flex-col items-center">
              <span className="text-[11px] font-mono text-neutral-400 mb-1">
                {getElementName(elementB.number, elementB.name)} ({elementB.symbol}) {t('bohrShells')}
              </span>
              <BohrModelVisualizer element={elementB} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
