import React, { useState } from 'react';
import { ChemicalElement, StateOfMatter } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { getElementVisualData } from '../../data/elementImages';
import { BohrModelVisualizer } from '../ElementModal/BohrModelVisualizer';
import { OrbitalDiagramVisualizer } from '../ElementModal/OrbitalDiagramVisualizer';
import { speakElementName, convertTemp, getElementStateAtTemp } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import {
  Volume2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowRightLeft,
  Atom,
  Flame,
  Info,
  ExternalLink,
} from 'lucide-react';

interface RightDetailPanelProps {
  element: ChemicalElement | null;
  currentTempK: number;
  onOpenCompare: (element: ChemicalElement) => void;
  onOpenModal: (element: ChemicalElement) => void;
}

export const RightDetailPanel: React.FC<RightDetailPanelProps> = ({
  element,
  currentTempK,
  onOpenCompare,
  onOpenModal,
}) => {
  const { t, getElementName } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'bohr' | 'orbitals' | 'properties'>('overview');
  const [imgError, setImgError] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shells: true,
    config: true,
    properties: true,
    applications: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  React.useEffect(() => {
    setImgError(false);
  }, [element?.number]);

  if (!element) {
    return (
      <div className="w-[320px] shrink-0 bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
          <Atom className="w-6 h-6 animate-spin-slow" />
        </div>
        <h3 className="font-display font-semibold text-neutral-800 text-sm">
          Select an Element
        </h3>
        <p className="text-xs text-neutral-400 mt-1 max-w-[200px]">
          Click any element on the periodic table to inspect its atomic telemetry, real specimen photo, and quantum orbitals.
        </p>
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const visualData = getElementVisualData(element.number, element.name, element.category);
  const stateAtTemp: StateOfMatter = getElementStateAtTemp(element, currentTempK);
  const tempConv = convertTemp(currentTempK);
  const localizedName = getElementName(element.number, element.name);

  const tabs: { id: 'overview' | 'bohr' | 'orbitals' | 'properties'; labelKey: string }[] = [
    { id: 'overview', labelKey: 'specimen' },
    { id: 'bohr', labelKey: 'bohrAtom' },
    { id: 'orbitals', labelKey: 'orbitals' },
    { id: 'properties', labelKey: 'properties' },
  ];

  return (
    <div className="w-[320px] shrink-0 flex flex-col gap-4 select-none">
      {/* MAIN INSPECTOR CARD */}
      <div className="bg-white rounded-2xl border border-black/[0.06] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
        {/* HEADER: Element Badge + Atomic Mass */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Soft Pastel Element Tile */}
            <div
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border font-mono font-bold shadow-xs ${catStyle.bg} ${catStyle.border}`}
            >
              <span className="text-[10px] text-neutral-500 leading-none">
                {element.number}
              </span>
              <span className="text-2xl font-display font-black leading-none mt-1 text-neutral-900">
                {element.symbol}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-bold text-lg text-neutral-900 tracking-tight leading-none">
                  {localizedName}
                </h2>
                <button
                  onClick={() => speakElementName(element.name, element.symbol)}
                  className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  title="Listen pronunciation"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${catStyle.pillBg} ${catStyle.pillText} ${catStyle.border}`}>
                  {catStyle.label}
                </span>
              </div>
            </div>
          </div>

          {/* LARGE ATOMIC MASS NUMBER */}
          <div className="text-right">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              {t('atomicMass')}
            </span>
            <div className="flex items-baseline justify-end gap-0.5 mt-0.5">
              <span className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
                {element.atomicMass}
              </span>
              <span className="text-[10px] font-mono font-medium text-neutral-400">
                u
              </span>
            </div>
          </div>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-full border border-black/[0.04]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClickSound();
                  setActiveTab(tab.id);
                }}
                className={`flex-1 py-1 rounded-full text-[11px] font-medium text-center transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & REAL SPECIMEN PHOTO */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-3">
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-black/[0.06] bg-neutral-100 group">
              {!imgError ? (
                <img
                  src={visualData.imageUrl}
                  alt={`Real specimen of ${element.name}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-neutral-50">
                  <Atom className="w-8 h-8 text-neutral-400 animate-spin-slow mb-1" />
                  <span className="text-xs font-semibold text-neutral-700">{localizedName}</span>
                  <span className="text-[10px] text-neutral-400">Synthetic Specimen</span>
                </div>
              )}

              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                STP: {element.standardState.toUpperCase()}
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono text-neutral-800 border border-black/5">
                Period {element.period} · Grp {element.group ?? 'N/A'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                {t('naturalAppearance')}
              </span>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {visualData.appearance}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{t('didYouKnow')}</span>
              </span>
              <p className="text-xs text-amber-900 leading-relaxed">
                {visualData.funFact}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: BOHR ATOM MODEL */}
        {activeTab === 'bohr' && (
          <div className="flex flex-col gap-3">
            <div className="bg-neutral-900 rounded-xl p-2 text-white">
              <BohrModelVisualizer element={element} />
            </div>
            <div className="text-center text-[11px] text-neutral-500 font-mono">
              {element.number} Electrons · {element.shells.length} Shells
            </div>
          </div>
        )}

        {/* TAB 3: ORBITALS AUFBAU */}
        {activeTab === 'orbitals' && (
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                {t('config')}
              </span>
              <span className="font-mono text-xs font-bold text-neutral-900 block mt-1">
                {element.electronConfiguration}
              </span>
            </div>
            <div className="bg-neutral-900 rounded-xl p-2 text-white max-h-56 overflow-y-auto">
              <OrbitalDiagramVisualizer element={element} />
            </div>
          </div>
        )}

        {/* TAB 4: PROPERTIES MATRIX */}
        {activeTab === 'properties' && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] text-neutral-400 block font-medium">{t('electronegativity')}</span>
              <span className="text-base font-bold font-mono text-neutral-900 block mt-0.5">
                {element.electronegativity ?? '—'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] text-neutral-400 block font-medium">{t('atomicRadius')}</span>
              <span className="text-base font-bold font-mono text-neutral-900 block mt-0.5">
                {element.atomicRadius ? `${element.atomicRadius} pm` : '—'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] text-neutral-400 block font-medium">{t('ionizationEnergy')}</span>
              <span className="text-base font-bold font-mono text-neutral-900 block mt-0.5">
                {element.ionizationEnergy ? `${element.ionizationEnergy}` : '—'}
              </span>
              <span className="text-[9px] text-neutral-400">kJ/mol</span>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/[0.04]">
              <span className="text-[10px] text-neutral-400 block font-medium">{t('density')}</span>
              <span className="text-base font-bold font-mono text-neutral-900 block mt-0.5">
                {element.density !== null ? `${element.density}` : '—'}
              </span>
              <span className="text-[9px] text-neutral-400">g/cm³</span>
            </div>
          </div>
        )}

        {/* COLLAPSIBLE SECTION: SHELLS */}
        <div className="border-t border-black/[0.05] pt-3">
          <button
            onClick={() => toggleSection('shells')}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-700 hover:text-neutral-900 py-1"
          >
            <span>{t('electronShells')}</span>
            {openSections.shells ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {openSections.shells && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {element.shells.map((count, idx) => {
                const shellLetters = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center px-2 py-1 rounded-lg bg-neutral-100 text-[10px] font-mono"
                  >
                    <span className="text-neutral-400 text-[9px]">{shellLetters[idx]}</span>
                    <span className="font-bold text-neutral-900">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COLLAPSIBLE SECTION: CONFIGURATION */}
        <div className="border-t border-black/[0.05] pt-3">
          <button
            onClick={() => toggleSection('config')}
            className="w-full flex items-center justify-between text-xs font-semibold text-neutral-700 hover:text-neutral-900 py-1"
          >
            <span>{t('expandedConfig')}</span>
            {openSections.config ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {openSections.config && (
            <div className="mt-2 p-2 rounded-lg bg-neutral-100 font-mono text-[10px] text-neutral-800 break-all leading-relaxed">
              {element.electronConfigurationExpanded}
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 pt-2 border-t border-black/[0.05]">
          <button
            onClick={() => {
              soundFx.playClickSound();
              onOpenCompare(element);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{t('compareWith')}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClickSound();
              onOpenModal(element);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t('fullSpecs')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
