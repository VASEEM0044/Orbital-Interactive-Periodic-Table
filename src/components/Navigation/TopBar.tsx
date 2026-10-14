import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  TrendingUp,
  ArrowRightLeft,
  Trophy,
  Share2,
  Printer,
  FileSpreadsheet,
  Search,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { NavView } from './IconRail';
import { soundFx } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface TopBarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCount: number;
  totalCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onSelectView,
  searchQuery,
  onSearchChange,
  activeCount,
  totalCount,
}) => {
  const { currentLang, currentMeta, languages, setLanguage, t } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(t('actionShare') + ' link copied!');
    }
  };

  const navItems: { id: NavView; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'table', labelKey: 'navTable', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'trends', labelKey: 'navTrends', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'compare', labelKey: 'navCompare', icon: <ArrowRightLeft className="w-3.5 h-3.5" /> },
    { id: 'quiz', labelKey: 'navChallenge', icon: <Trophy className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full flex flex-col border-b border-black/[0.06] bg-white px-4 sm:px-6 py-4 gap-4">
      {/* ROW 1: Logo left | Centered Pill-Nav | Search / Language / Status right */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-neutral-900 leading-none">
              {t('appTitle')}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium mt-1">
              {t('appSubtitle')}
            </span>
          </div>
        </div>

        {/* Center: Pill-Nav (hidden on mobile, replaced by MobileBottomNav) */}
        <div className="hidden md:flex items-center bg-neutral-100 p-1 rounded-full border border-black/[0.04]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClickSound();
                  onSelectView(item.id);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                {item.icon}
                <span>{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Search box + Language Selector + Live Status Pill */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Input */}
          <div className="relative w-40 sm:w-52">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white text-xs text-neutral-900 placeholder:text-neutral-400 outline-none transition-all"
            />
          </div>

          {/* LANGUAGE SELECTOR PILL DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                soundFx.playClickSound();
                setIsLangDropdownOpen((prev) => !prev);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-black/[0.05] text-xs font-semibold text-neutral-800 transition-colors cursor-pointer select-none"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span>{currentMeta.nativeName}</span>
              <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white border border-black/[0.08] shadow-xl p-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Select Language
                </div>
                {languages.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        soundFx.playClickSound();
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm leading-none">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] opacity-60">({lang.name})</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span>{t('liveStatus')}</span>
          </div>
        </div>
      </div>

      {/* ROW 2: Page Title Left + Text Buttons (Share / Report / Print) Right */}
      <div className="flex items-center justify-between pt-1 border-t border-black/[0.04] text-xs">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-semibold text-lg text-neutral-900 tracking-tight">
            {t('pageHeading')}
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] font-mono font-medium text-neutral-600">
            {activeCount === totalCount ? t('elementsCount') : `${activeCount} / ${totalCount}`}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 font-medium">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t('actionShare')}</span>
          </button>

          <button
            onClick={() => alert('Periodic Table IUPAC Report Generated')}
            className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{t('actionReport')}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t('actionPrint')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
