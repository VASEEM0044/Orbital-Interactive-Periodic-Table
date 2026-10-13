import React, { useState, useEffect } from 'react';
import { ChemicalElement } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { BohrModelVisualizer } from './BohrModelVisualizer';
import { OrbitalDiagramVisualizer } from './OrbitalDiagramVisualizer';
import { HolographicSpecimen } from './HolographicSpecimen';
import { speakElementName, convertTemp, getElementStateAtTemp } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import {
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Atom,
  Flame,
  Layers,
  Sparkles,
  Compass,
  ArrowRightLeft,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface ElementDetailModalProps {
  element: ChemicalElement | null;
  allElements: ChemicalElement[];
  currentTempK: number;
  onClose: () => void;
  onSelectElement: (element: ChemicalElement) => void;
  onOpenCompare: (element: ChemicalElement) => void;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({
  element,
  allElements,
  currentTempK,
  onClose,
  onSelectElement,
  onOpenCompare,
}) => {
  const { getElementName, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'hologram' | 'bohr' | 'orbitals' | 'trends' | 'applications'>('hologram');

  useEffect(() => {
    if (element) {
      soundFx.playHologramScan();
    }
  }, [element?.number]);

  useEffect(() => {
    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prevNum = element.number > 1 ? element.number - 1 : 118;
        const prevEl = allElements.find((el) => el.number === prevNum);
        if (prevEl) {
          soundFx.playHoverChime(prevEl.number);
          onSelectElement(prevEl);
        }
      } else if (e.key === 'ArrowRight') {
        const nextNum = element.number < 118 ? element.number + 1 : 1;
        const nextEl = allElements.find((el) => el.number === nextNum);
        if (nextEl) {
          soundFx.playHoverChime(nextEl.number);
          onSelectElement(nextEl);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [element, allElements, onClose, onSelectElement]);

  if (!element) return null;

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const stateAtTemp = getElementStateAtTemp(element, currentTempK);
  const tempConv = convertTemp(currentTempK);

  const prevElement = allElements.find(
    (el) => el.number === (element.number > 1 ? element.number - 1 : 118)
  );
  const nextElement = allElements.find(
    (el) => el.number === (element.number < 118 ? element.number + 1 : 1)
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-black/[0.08] shadow-2xl overflow-hidden"
        >
          {/* Top Bar with Element Identity and Quick Nav */}
          <div className="p-4 sm:p-5 border-b border-black/[0.06] bg-[#F7F7F5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border font-mono font-bold shadow-xs ${catStyle.bg} ${catStyle.border}`}
              >
                <span className="text-[10px] text-neutral-500 leading-none">
                  {element.number}
                </span>
                <span className="text-2xl leading-none mt-1 font-display font-black text-neutral-900">
                  {element.symbol}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
                    {getElementName(element.number, element.name)}
                  </h2>
                  <button
                    onClick={() => speakElementName(element.name, element.symbol)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
                    title="Listen to pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${catStyle.pillBg} ${catStyle.pillText} ${catStyle.border}`}>
                    {catStyle.label}
                  </span>
                  <span>·</span>
                  <span className="font-mono">{t('atomicMass')}: {element.atomicMass} u</span>
                  <span>·</span>
                  <span className="font-mono">
                    Period {element.period}, Group {element.group ?? 'N/A'} ({element.block}-block)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClickSound();
                  onOpenCompare(element);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('compareWith')}</span>
              </button>

              <div className="flex items-center bg-neutral-100 rounded-full p-0.5 border border-black/[0.04]">
                <button
                  onClick={() => {
                    if (prevElement) {
                      soundFx.playHoverChime(prevElement.number);
                      onSelectElement(prevElement);
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-white text-neutral-600 hover:text-neutral-900 transition-colors"
                  title={`Previous element (${prevElement?.symbol})`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (nextElement) {
                      soundFx.playHoverChime(nextElement.number);
                      onSelectElement(nextElement);
                    }
                  }}
                  className="p-1.5 rounded-full hover:bg-white text-neutral-600 hover:text-neutral-900 transition-colors"
                  title={`Next element (${nextElement?.symbol})`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pill Selector Tabs */}
          <div className="flex items-center gap-1.5 px-6 pt-3 pb-2 border-b border-black/[0.06] bg-neutral-50 overflow-x-auto">
            {[
              { id: 'hologram', label: t('physicalSpecimen'), icon: <Eye className="w-3.5 h-3.5" /> },
              { id: 'bohr', label: t('bohrAtom'), icon: <Atom className="w-3.5 h-3.5" /> },
              { id: 'orbitals', label: t('aufbauOrbitals'), icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'trends', label: t('atomicTrendsTab'), icon: <Compass className="w-3.5 h-3.5" /> },
              { id: 'applications', label: t('applications'), icon: <Sparkles className="w-3.5 h-3.5" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClickSound();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-black/[0.04]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {activeTab === 'hologram' && (
              <div className="space-y-4">
                <HolographicSpecimen element={element} />
                <div className="p-4 rounded-xl bg-neutral-50 border border-black/[0.05] text-xs leading-relaxed text-neutral-700">
                  <div className="font-semibold text-neutral-900 mb-1">
                    {t('chemicalBehavior')}
                  </div>
                  <p>{element.summary}</p>
                </div>
              </div>
            )}

            {activeTab === 'bohr' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">{t('groundStateConfig')}</span>
                    <span className="font-mono text-neutral-900 font-bold text-sm">{element.electronConfiguration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[11px]">{t('totalElectrons')}</span>
                    <span className="font-mono text-neutral-900 font-bold">{element.number} {t('electronsInShells')} ({element.shells.join(', ')})</span>
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-xl p-3 text-white">
                  <BohrModelVisualizer element={element} />
                </div>
              </div>
            )}

            {activeTab === 'orbitals' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05] text-xs">
                  <div className="text-neutral-400 text-[11px]">{t('expandedNotation')}</div>
                  <div className="font-mono text-neutral-900 font-bold mt-0.5 break-all">
                    {element.electronConfigurationExpanded}
                  </div>
                </div>

                <div className="bg-neutral-900 rounded-xl p-3 text-white">
                  <OrbitalDiagramVisualizer element={element} />
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('electronegativity')} (Pauling)</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 block mt-1">
                      {element.electronegativity ?? '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('atomicRadius')}</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 block mt-1">
                      {element.atomicRadius ? `${element.atomicRadius} pm` : '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('firstIonizationEnergy')}</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 block mt-1">
                      {element.ionizationEnergy ? `${element.ionizationEnergy} kJ/mol` : '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('electronAffinity')}</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 block mt-1">
                      {element.electronAffinity !== null ? `${element.electronAffinity} kJ/mol` : '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('density')}</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 block mt-1">
                      {element.density !== null ? `${element.density} g/cm³` : '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[11px] text-neutral-400 block">{t('phase')} @ {tempConv.kelvin}K</span>
                    <span className="text-xl font-bold font-mono text-neutral-900 capitalize block mt-1">
                      {stateAtTemp === 'solid' ? t('solid') : stateAtTemp === 'liquid' ? t('liquid') : stateAtTemp === 'gas' ? t('gas') : stateAtTemp}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <h4 className="text-xs font-semibold text-neutral-700 mb-2">Known Oxidation States</h4>
                    <div className="flex flex-wrap gap-2">
                      {element.oxidationStates.map((st, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.06] font-mono text-xs font-bold text-neutral-800"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <h4 className="text-xs font-semibold text-neutral-700 mb-2">Crystal Structure</h4>
                    <div className="font-mono text-sm text-neutral-800">{element.crystalStructure}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {element.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05] text-xs text-neutral-700 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-black/[0.05]">
                  <span className="text-xs font-semibold text-neutral-800 block">Historical Discovery</span>
                  <div className="text-xs text-neutral-600 mt-1">
                    Discovered in <strong className="text-neutral-900">{element.yearDiscovered}</strong> by{' '}
                    <span className="text-neutral-800 font-medium">{element.discoverer}</span>.
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
