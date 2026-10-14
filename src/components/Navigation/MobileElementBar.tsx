import React from 'react';
import { ChemicalElement, StateOfMatter } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { getElementStateAtTemp } from '../../utils/chemistry';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { X, ArrowRight, ArrowRightLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileElementBarProps {
  element: ChemicalElement | null;
  currentTempK: number;
  onOpenModal: (element: ChemicalElement) => void;
  onOpenCompare: (element: ChemicalElement) => void;
  onClose: () => void;
}

export const MobileElementBar: React.FC<MobileElementBarProps> = ({
  element,
  currentTempK,
  onOpenModal,
  onOpenCompare,
  onClose,
}) => {
  const { t, getElementName } = useLanguage();

  if (!element) return null;

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const stateAtTemp: StateOfMatter = getElementStateAtTemp(element, currentTempK);

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="xl:hidden fixed bottom-[64px] left-3 right-3 z-30 bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.08] p-3 shadow-xl flex flex-col gap-2 max-w-lg mx-auto"
      >
        {/* Top summary row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Element Badge */}
            <div
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center border font-mono font-bold shrink-0 shadow-xs ${catStyle.bg} ${catStyle.border}`}
            >
              <span className="text-[9px] text-neutral-500 leading-none">#{element.number}</span>
              <span className="text-lg font-display font-black leading-none mt-0.5 text-neutral-900">
                {element.symbol}
              </span>
            </div>

            {/* Name + Mass + Category */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-neutral-900 tracking-tight truncate">
                  {getElementName(element.number, element.name)}
                </span>
                <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                  {element.atomicMass} u
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-0.5">
                <span className={`px-1.5 py-0.2 rounded-full font-medium border text-[9px] ${catStyle.pillBg} ${catStyle.pillText} ${catStyle.border}`}>
                  {catStyle.label}
                </span>
                <span>·</span>
                <span className="font-mono uppercase text-[9px]">
                  {stateAtTemp}
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors shrink-0 touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
            title="Dismiss element bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons row */}
        <div className="flex items-center gap-2 pt-1 border-t border-black/[0.04]">
          <button
            onClick={() => {
              soundFx.playClickSound();
              onOpenCompare(element);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors touch-manipulation"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-neutral-600" />
            <span>{t('compareWith', 'Compare')}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClickSound();
              onOpenModal(element);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors shadow-sm touch-manipulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('fullSpecs', 'Full Details')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
