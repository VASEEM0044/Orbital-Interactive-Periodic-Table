import React from 'react';
import {
  LayoutGrid,
  TrendingUp,
  ArrowRightLeft,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export type NavView = 'table' | 'trends' | 'compare' | 'quiz';

interface IconRailProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export const IconRail: React.FC<IconRailProps> = ({
  currentView,
  onSelectView,
  isMuted,
  onToggleSound,
  onReset,
}) => {
  const navItems: { id: NavView; label: string; icon: React.ReactNode }[] = [
    { id: 'table', label: 'Periodic Table Grid', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'trends', label: 'Atomic Trends & Heatmaps', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'compare', label: 'Side-by-Side Element Comparison', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { id: 'quiz', label: 'Chemistry Trends Challenge', icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-14 shrink-0 flex flex-col items-center justify-between py-5 border-r border-black/[0.06] bg-white/70 backdrop-blur-sm select-none">
      {/* Brand Icon Mark */}
      <div className="flex flex-col items-center gap-6">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClickSound();
                  onSelectView(item.id);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm scale-100'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
                title={item.label}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Utility Buttons */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={onToggleSound}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isMuted
              ? 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              : 'text-neutral-700 bg-neutral-100 hover:bg-neutral-200'
          }`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            soundFx.playClickSound();
            onReset();
          }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-all"
          title="Reset Dashboard & Filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
