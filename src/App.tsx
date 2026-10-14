/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ELEMENTS_DATA } from './data/elements';
import { ChemicalElement, AtomicTrend, ElementCategory, OrbitalBlock } from './types/element';
import { IconRail, NavView } from './components/Navigation/IconRail';
import { MobileBottomNav } from './components/Navigation/MobileBottomNav';
import { MobileElementBar } from './components/Navigation/MobileElementBar';
import { TopBar } from './components/Navigation/TopBar';
import { TemperatureRuler } from './components/TemperatureController/TemperatureRuler';
import { LeftStatColumn } from './components/Dashboard/LeftStatColumn';
import { PeriodicGrid } from './components/PeriodicTable/PeriodicGrid';
import { RightDetailPanel } from './components/Dashboard/RightDetailPanel';
import { ElementDetailModal } from './components/ElementModal/ElementDetailModal';
import { TrendChartModal } from './components/TrendsExplorer/TrendChartModal';
import { ElementCompareModal } from './components/ComparisonTool/ElementCompareModal';
import { ChemistryQuizModal } from './components/QuizMode/ChemistryQuizModal';
import { soundFx } from './utils/audio';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Heart, Mail, Facebook } from 'lucide-react';

function PeriodicApp() {
  const { isRtl, getElementName } = useLanguage();
  const [currentView, setCurrentView] = useState<NavView>('table');
  const [hoveredElement, setHoveredElement] = useState<ChemicalElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(
    ELEMENTS_DATA.find((e) => e.number === 6) || ELEMENTS_DATA[0] // Carbon by default
  );
  const [activeTrend, setActiveTrend] = useState<AtomicTrend>('none');
  const [currentTempK, setCurrentTempK] = useState<number>(293.15); // Room temperature 20°C
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<ElementCategory | 'all'>('all');
  const [filterBlock, setFilterBlock] = useState<OrbitalBlock | 'all'>('all');
  const [isMuted, setIsMuted] = useState(false);

  // Modals state
  const [isFullDetailModalOpen, setIsFullDetailModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareTargetElement, setCompareTargetElement] = useState<ChemicalElement>(
    ELEMENTS_DATA.find((e) => e.number === 11) || ELEMENTS_DATA[0] // Sodium
  );
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTrendGraphOpen, setIsTrendGraphOpen] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
  };

  const handleSelectNavView = (view: NavView) => {
    setCurrentView(view);
    if (view === 'trends') {
      setIsTrendGraphOpen(true);
    } else if (view === 'compare') {
      setIsCompareOpen(true);
    } else if (view === 'quiz') {
      setIsQuizOpen(true);
    }
  };

  const handleOpenCompare = (el?: ChemicalElement) => {
    if (el) setCompareTargetElement(el);
    soundFx.playClickSound();
    setIsCompareOpen(true);
  };

  const handleReset = () => {
    setActiveTrend('none');
    setCurrentTempK(293.15);
    setSearchQuery('');
    setFilterCategory('all');
    setFilterBlock('all');
    setSelectedElement(ELEMENTS_DATA.find((e) => e.number === 6) || ELEMENTS_DATA[0]);
    setCurrentView('table');
  };

  // Filter count computation
  const filteredElements = ELEMENTS_DATA.filter((el) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const localizedName = getElementName(el.number, el.name).toLowerCase();
      const match =
        el.name.toLowerCase().includes(q) ||
        localizedName.includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.number.toString() === q;
      if (!match) return false;
    }
    if (filterCategory !== 'all' && el.category !== filterCategory) return false;
    if (filterBlock !== 'all' && el.block !== filterBlock) return false;
    return true;
  });

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-[#E9E9EA] p-1.5 sm:p-5 lg:p-6 pb-20 md:pb-6 flex items-center justify-center font-sans antialiased text-neutral-900 selection:bg-neutral-200"
    >
      {/* MAIN APP SHELL: One big white-ish (#F7F7F5) container with 28px radius and soft shadow, floating with margin around it */}
      <div className="w-full max-w-[1680px] min-h-[92vh] bg-[#F7F7F5] rounded-2xl sm:rounded-[28px] border border-black/[0.06] shadow-2xl shadow-black/[0.04] overflow-hidden flex flex-row">
        {/* ICON-ONLY VERTICAL RAIL ON THE FAR LEFT (hidden on mobile, replaced by bottom nav) */}
        <IconRail
          currentView={currentView}
          onSelectView={handleSelectNavView}
          isMuted={isMuted}
          onToggleSound={toggleSound}
          onReset={handleReset}
        />

        {/* MAIN BODY AREA (Header + Temperature Scrubber + 3-Column Deck) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* 1. TOP BAR (Logo left, centered pill-nav, search/status right + Title & Print/Report/Share) */}
          <TopBar
            currentView={currentView}
            onSelectView={handleSelectNavView}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCount={filteredElements.length}
            totalCount={ELEMENTS_DATA.length}
          />

          {/* MAIN PADDED STAGE */}
          <div className="flex-1 p-2 sm:p-6 flex flex-col gap-4">
            {/* 2. TEMPERATURE SCRUBBER RULER (0K to 6000K with tick marks & preset chips) */}
            <TemperatureRuler
              currentTempK={currentTempK}
              elements={ELEMENTS_DATA}
              onTempChange={setCurrentTempK}
            />

            {/* 3. THREE-COLUMN INDUSTRIAL LAYOUT (Responsive ordering: Grid first on mobile!) */}
            <div className="flex-1 flex flex-col xl:flex-row gap-4 items-start">
              {/* CENTER COLUMN: Periodic table comes first on mobile for immediate visual exploration */}
              <div className="order-1 xl:order-2 flex-1 w-full min-w-0">
                <PeriodicGrid
                  elements={ELEMENTS_DATA}
                  activeTrend={activeTrend}
                  currentTempK={currentTempK}
                  hoveredElement={hoveredElement}
                  selectedElement={selectedElement}
                  filterCategory={filterCategory}
                  filterBlock={filterBlock}
                  searchQuery={searchQuery}
                  onHoverElement={(el) => setHoveredElement(el)}
                  onLeaveElement={() => setHoveredElement(null)}
                  onSelectElement={(el) => setSelectedElement(el)}
                />
              </div>

              {/* LEFT COLUMN (260px): Stacked stat cards (Phase distribution, Trend legend, Block filters) */}
              <div className="order-2 xl:order-1 w-full xl:w-[260px] shrink-0">
                <LeftStatColumn
                  elements={ELEMENTS_DATA}
                  currentTempK={currentTempK}
                  activeTrend={activeTrend}
                  onSelectTrend={setActiveTrend}
                  selectedBlock={filterBlock}
                  onSelectBlock={setFilterBlock}
                  selectedCategory={filterCategory}
                  onSelectCategory={setFilterCategory}
                />
              </div>

              {/* RIGHT COLUMN (320px): Detail panel for the CLICKED element */}
              <div className="order-3 w-full xl:w-[320px] shrink-0">
                <RightDetailPanel
                  element={selectedElement}
                  currentTempK={currentTempK}
                  onOpenCompare={handleOpenCompare}
                  onOpenModal={(el) => {
                    setSelectedElement(el);
                    setIsFullDetailModalOpen(true);
                  }}
                />
              </div>
            </div>

            {/* BRANDING & CONTACT FOOTER */}
            <footer className="mt-4 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-medium text-neutral-700 select-none">
                <span>Made With Love By</span>
                <span className="font-display font-bold text-neutral-900 tracking-tight text-sm">Vaseem Akram Ansari</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block animate-pulse ml-0.5" />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                <a
                  href="mailto:vaseemakramansari1@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-black/[0.06] text-neutral-700 hover:text-neutral-900 font-medium transition-all shadow-2xs"
                  title="Contact via Email"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-mono text-[11px]">vaseemakramansari1@gmail.com</span>
                </a>

                <a
                  href="https://www.facebook.com/mosir.khan.96/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 text-[#1877F2] font-semibold transition-all shadow-2xs"
                  title="Connect on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 fill-[#1877F2]" />
                  <span>Facebook Profile</span>
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM FLOATING ELEMENT BAR (for instant mobile preview without scrolling down) */}
      <MobileElementBar
        element={selectedElement}
        currentTempK={currentTempK}
        onOpenModal={(el) => {
          setSelectedElement(el);
          setIsFullDetailModalOpen(true);
        }}
        onOpenCompare={(el) => {
          setSelectedElement(el);
          handleOpenCompare(el);
        }}
        onClose={() => setSelectedElement(null)}
      />

      {/* MOBILE BOTTOM NAVIGATION BAR (Thumb-friendly 4 tabs + audio + reset) */}
      <MobileBottomNav
        currentView={currentView}
        onSelectView={handleSelectNavView}
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onReset={handleReset}
      />

      {/* FULL MODAL: Complete Holographic Specimen & Quantum Lab */}
      <ElementDetailModal
        element={isFullDetailModalOpen ? selectedElement : null}
        allElements={ELEMENTS_DATA}
        currentTempK={currentTempK}
        onClose={() => setIsFullDetailModalOpen(false)}
        onSelectElement={(el) => setSelectedElement(el)}
        onOpenCompare={(el) => {
          setIsFullDetailModalOpen(false);
          handleOpenCompare(el);
        }}
      />

      {/* FULL MODAL: Atomic Trends Graph */}
      <TrendChartModal
        elements={ELEMENTS_DATA}
        isOpen={isTrendGraphOpen}
        onClose={() => {
          setIsTrendGraphOpen(false);
          setCurrentView('table');
        }}
        onSelectElement={(el) => setSelectedElement(el)}
      />

      {/* FULL MODAL: Side-by-Side Comparison */}
      <ElementCompareModal
        initialElementA={compareTargetElement}
        allElements={ELEMENTS_DATA}
        isOpen={isCompareOpen}
        onClose={() => {
          setIsCompareOpen(false);
          setCurrentView('table');
        }}
      />

      {/* FULL MODAL: Chemistry Quiz Challenge */}
      <ChemistryQuizModal
        isOpen={isQuizOpen}
        onClose={() => {
          setIsQuizOpen(false);
          setCurrentView('table');
        }}
        onSelectElement={(el) => setSelectedElement(el)}
        allElements={ELEMENTS_DATA}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PeriodicApp />
    </LanguageProvider>
  );
}
