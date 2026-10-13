import React, { useState } from 'react';
import { ChemicalElement } from '../../types/element';
import { soundFx } from '../../utils/audio';
import { X, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedQuizQuestions } from '../../locales/quizTranslations';

interface ChemistryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectElement: (element: ChemicalElement) => void;
  allElements: ChemicalElement[];
}

export const ChemistryQuizModal: React.FC<ChemistryQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectElement,
  allElements,
}) => {
  const { t, currentLang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const questions = getLocalizedQuizQuestions(currentLang);
  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundFx.playClickSound();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    soundFx.playClickSound();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    soundFx.playClickSound();
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/35 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl max-h-[92vh] p-5 sm:p-6 rounded-2xl bg-[#F7F7F5] border border-black/[0.08] shadow-2xl flex flex-col gap-4 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-display">
                  {t('quizModalTitle')}
                </h3>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {t('quizModalSubtitle')}
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

          {!isCompleted ? (
            <div className="flex flex-col gap-4">
              {/* Progress & Score Strip */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 font-mono text-[11px] text-neutral-700 font-medium border border-black/[0.04]">
                    {t('questionProgress')} {currentIndex + 1} {t('of')} {questions.length}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] text-neutral-600 font-medium border border-black/[0.04]">
                    {currentQ.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-xs font-bold text-neutral-900">
                  <span>{t('scoreLabel')}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1A1A1A] text-white">
                    {score}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                <h4 className="font-display font-semibold text-base sm:text-lg text-neutral-900 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options List */}
              <div className="flex flex-col gap-2">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-white border-black/[0.06] hover:bg-neutral-50 text-neutral-800';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                    } else {
                      btnStyle = 'bg-white/50 border-black/[0.04] text-neutral-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button Card */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-3 animate-in fade-in">
                  <div className="text-xs text-neutral-700 leading-relaxed">
                    <strong className="text-neutral-900 block mb-0.5">{t('explanationLabel')}</strong>
                    <p>{currentQ.explanation}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
                    {currentQ.elementSymbolTarget ? (
                      <button
                        onClick={() => {
                          const target = allElements.find((e) => e.symbol === currentQ.elementSymbolTarget);
                          if (target) {
                            onSelectElement(target);
                            onClose();
                          }
                        }}
                        className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 hover:underline"
                      >
                        {currentQ.elementSymbolTarget} — {t('inspectElement')}
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>{currentIndex < questions.length - 1 ? t('nextQuestion') : t('viewResults')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Completed Screen */
            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-neutral-900">
                  {t('challengeCompleted')}
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  {t('scoreSummary')} <strong className="text-neutral-900 font-mono text-sm">{score}</strong> {t('of')}{' '}
                  <span className="font-mono">{questions.length}</span> (
                  {Math.round((score / questions.length) * 100)}%)
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('tryAgain')}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
                >
                  {t('backToTable')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
