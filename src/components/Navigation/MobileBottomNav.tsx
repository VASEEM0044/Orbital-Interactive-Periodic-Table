import React from 'react';
import {
  LayoutGrid,
  TrendingUp,
  ArrowRightLeft,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';
import { NavView } from './IconRail';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface MobileBottomNavProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  isMuted,
  onToggleSound,
  onReset,
}) => {
  const { t } = useLanguage();

  const navItems: { id: NavView; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'table', labelKey: 'navTable', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'trends', labelKey: 'navTrends', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'compare', labelKey: 'navCompare', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { id: 'quiz', labelKey: 'navChallenge', icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-black/[0.08] px-2 py-1.5 shadow-lg select-none pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playClickSound();
                onSelectView(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[54px] min-h-[44px] touch-manipulation ${
                isActive
                  ? 'text-neutral-900 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-700 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-neutral-500'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 leading-none truncate max-w-[64px]">
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}

        {/* Quick sound toggle */}
        <button
          onClick={() => {
            soundFx.playClickSound();
            onToggleSound();
          }}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-neutral-400 hover:text-neutral-700 min-h-[44px] touch-manipulation"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <div className="p-1 rounded-lg text-neutral-500">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </div>
          <span className="text-[9px] tracking-tight mt-0.5 leading-none">
            {isMuted ? 'Muted' : 'Sound'}
          </span>
        </button>

        {/* Quick reset */}
        <button
          onClick={() => {
            soundFx.playClickSound();
            onReset();
          }}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-neutral-400 hover:text-neutral-700 min-h-[44px] touch-manipulation"
          title="Reset View"
        >
          <div className="p-1 rounded-lg text-neutral-500">
            <RotateCcw className="w-4 h-4" />
          </div>
          <span className="text-[9px] tracking-tight mt-0.5 leading-none">Reset</span>
        </button>
      </div>
    </nav>
  );
};
