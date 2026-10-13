import React, { useState } from 'react';
import { ChemicalElement } from '../../types/element';
import { getElementVisualData } from '../../data/elementImages';
import { CATEGORY_COLORS } from '../../data/elements';
import { Flame, Sparkles, Eye, Atom } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface HolographicSpecimenProps {
  element: ChemicalElement;
}

export const HolographicSpecimen: React.FC<HolographicSpecimenProps> = ({ element }) => {
  const { t, getElementName } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const visualData = getElementVisualData(element.number, element.name, element.category);
  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];

  React.useEffect(() => {
    setImgError(false);
  }, [element.number]);

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
      {/* Specimen Picture */}
      <div className="relative w-full md:w-72 sm:h-72 aspect-square shrink-0 rounded-xl overflow-hidden border border-black/[0.08] bg-neutral-100 flex items-center justify-center group shadow-inner">
        {!imgError ? (
          <img
            src={visualData.imageUrl}
            alt={`Physical specimen of pure ${element.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center z-10 bg-neutral-50">
            <Atom className="w-12 h-12 text-neutral-400 animate-spin-slow mb-2" />
            <span className="font-display font-bold text-lg text-neutral-900">
              {getElementName(element.number, element.name)}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
              Synthetic Isotopic Specimen
            </span>
          </div>
        )}

        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
          STP: {element.standardState.toUpperCase()}
        </div>
      </div>

      {/* Specimen Analysis & Description */}
      <div className="flex-1 flex flex-col justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-neutral-600" />
              <span className="font-bold text-neutral-900 text-sm tracking-tight">
                {t('physicalSpecimen')}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full font-medium text-[10px] border ${catStyle.pillBg} ${catStyle.pillText} ${catStyle.border}`}>
              {catStyle.label}
            </span>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-neutral-50 border border-black/[0.04]">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              {t('naturalAppearance')}:
            </span>
            <p className="text-neutral-800 leading-relaxed text-xs">
              {visualData.appearance}
            </p>
          </div>

          <div className="mt-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('didYouKnow')}</span>
            </span>
            <p className="text-amber-950 leading-relaxed text-xs">
              {visualData.funFact}
            </p>
          </div>
        </div>

        {/* Bottom Property Pills */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.06] font-mono text-center">
          <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
            <span className="text-[10px] text-neutral-400 block font-sans">{t('density')} (STP)</span>
            <span className="text-xs font-bold text-neutral-900 block mt-0.5">
              {element.density !== null ? `${element.density} g/cm³` : 'Synthetic'}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04]">
            <span className="text-[10px] text-neutral-400 block font-sans">Crystal Structure</span>
            <span className="text-xs font-bold text-neutral-900 truncate block mt-0.5">
              {element.crystalStructure || 'Amorphous'}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-neutral-50 border border-black/[0.04] flex flex-col items-center justify-center">
            <span className="text-[10px] text-neutral-400 block font-sans">Flame Test</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: element.spectralColor }}
              />
              <span className="text-xs font-bold text-neutral-900">
                {element.spectralColor ? 'Active' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
