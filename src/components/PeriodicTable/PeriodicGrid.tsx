import React, { useState } from 'react';
import { ChemicalElement, AtomicTrend, ElementCategory, OrbitalBlock } from '../../types/element';
import { ElementTile } from './ElementTile';
import { ElementHoloTooltip, useHoverTooltip } from '../HoverPreview/ElementHoloTooltip';
import { soundFx } from '../../utils/audio';
import {
  ZoomIn,
  ZoomOut,
  MousePointer,
  Hand,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PeriodicGridProps {
  elements: ChemicalElement[];
  activeTrend: AtomicTrend;
  currentTempK: number;
  hoveredElement: ChemicalElement | null;
  selectedElement: ChemicalElement | null;
  filterCategory: ElementCategory | 'all';
  filterBlock: OrbitalBlock | 'all';
  searchQuery: string;
  onHoverElement?: (element: ChemicalElement) => void;
  onLeaveElement?: () => void;
  onSelectElement: (element: ChemicalElement) => void;
}

const GROUPS = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'
];

const PERIODS = ['1', '2', '3', '4', '5', '6', '7'];

export const PeriodicGrid: React.FC<PeriodicGridProps> = ({
  elements,
  activeTrend,
  currentTempK,
  selectedElement,
  filterCategory,
  filterBlock,
  searchQuery,
  onHoverElement,
  onLeaveElement,
  onSelectElement,
}) => {
  const { t, getElementName } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeTool, setActiveTool] = useState<'select' | 'pan'>('select');

  // Floating Holographic Hover Tooltip with 80ms hover intent
  const { tooltipState, showTooltip, updatePosition, hideTooltip } = useHoverTooltip(80);

  const handleZoomIn = () => {
    soundFx.playClickSound();
    setZoomLevel((prev) => Math.min(1.25, prev + 0.1));
  };

  const handleZoomOut = () => {
    soundFx.playClickSound();
    setZoomLevel((prev) => Math.max(0.8, prev - 0.1));
  };

  const handleResetZoom = () => {
    soundFx.playClickSound();
    setZoomLevel(1);
  };

  // Determine if an element should be dimmed based on search and filters
  const isElementDimmed = (el: ChemicalElement): boolean => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = el.name.toLowerCase().includes(q);
      const matchLocalized = getElementName(el.number, el.name).toLowerCase().includes(q);
      const matchSymbol = el.symbol.toLowerCase().includes(q);
      const matchNumber = el.number.toString() === q;
      const matchCat = el.category.toLowerCase().includes(q);
      if (!matchName && !matchLocalized && !matchSymbol && !matchNumber && !matchCat) return true;
    }

    if (filterCategory !== 'all' && el.category !== filterCategory) {
      return true;
    }

    if (filterBlock !== 'all' && el.block !== filterBlock) {
      return true;
    }

    return false;
  };

  return (
    <div className="relative flex-1 flex flex-col bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden">
      {/* FLOATING CANVAS TOOLBAR AT TOP OF CANVAS (Rocanville Mine Reference) */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-black/[0.05] bg-white/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-1.5">
          {/* Tool mode toggle */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-black/[0.04]">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTool === 'select'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Select tool"
            >
              <MousePointer className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTool('pan')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTool === 'pan'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Pan tool"
            >
              <Hand className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-medium text-neutral-400 ml-2 hidden sm:inline">
            {t('iupacGrid', 'IUPAC Standard 18-Column Grid')}
          </span>
        </div>

        {/* Zoom Controls Right */}
        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-black/[0.04]">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
            title={t('zoomOut', 'Zoom Out')}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-2 py-1 rounded-md text-[11px] font-mono font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
            title={t('fit', 'Fit to Canvas')}
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
            title={t('zoomIn', 'Zoom In')}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DOTTED-GRID CANVAS BACKGROUND CONTAINER */}
      <div className="flex-1 w-full p-2 sm:p-6 bg-dotted-grid overflow-x-auto overflow-y-auto scrollbar-thin touch-pan-x touch-pan-y overscroll-contain">
        <div
          className="min-w-[860px] max-w-[1100px] mx-auto transition-transform origin-top-left"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Periodic Grid Container */}
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: '24px repeat(18, minmax(40px, 1fr))',
              gridTemplateRows: '20px repeat(7, minmax(40px, 1fr)) 12px repeat(2, minmax(40px, 1fr))',
            }}
          >
            {/* Top Column (Group) Headers */}
            <div style={{ gridRow: 1, gridColumn: 1 }} />
            {GROUPS.map((g, idx) => (
              <div
                key={g}
                style={{ gridRow: 1, gridColumn: idx + 2 }}
                className="text-[9px] font-mono text-neutral-400 font-semibold text-center flex items-center justify-center"
              >
                {g}
              </div>
            ))}

            {/* Left Period Number Headers */}
            {PERIODS.map((p, idx) => (
              <div
                key={p}
                style={{ gridRow: idx + 2, gridColumn: 1 }}
                className="text-[9px] font-mono text-neutral-400 font-semibold flex items-center justify-center"
              >
                {p}
              </div>
            ))}

            {/* Lanthanide Placeholder Cell (Period 6, Group 3) */}
            <div
              style={{ gridRow: 7, gridColumn: 4 }}
              className="aspect-square rounded-[10px] border border-dashed border-pink-200 bg-pink-50/50 flex flex-col items-center justify-center text-center p-0.5"
            >
              <span className="text-[8px] font-mono text-pink-500 font-bold leading-none">57-71</span>
              <span className="text-[8px] font-display font-medium text-pink-600 mt-0.5 leading-none">La-Lu</span>
            </div>

            {/* Actinide Placeholder Cell (Period 7, Group 3) */}
            <div
              style={{ gridRow: 8, gridColumn: 4 }}
              className="aspect-square rounded-[10px] border border-dashed border-orange-200 bg-orange-50/50 flex flex-col items-center justify-center text-center p-0.5"
            >
              <span className="text-[8px] font-mono text-orange-500 font-bold leading-none">89-103</span>
              <span className="text-[8px] font-display font-medium text-orange-600 mt-0.5 leading-none">Ac-Lr</span>
            </div>

            {/* Lanthanide row label */}
            <div
              style={{ gridRow: 10, gridColumn: 1 }}
              className="text-[8px] font-mono text-pink-600 font-bold flex items-center justify-center"
            >
              La*
            </div>

            {/* Actinide row label */}
            <div
              style={{ gridRow: 11, gridColumn: 1 }}
              className="text-[8px] font-mono text-orange-600 font-bold flex items-center justify-center"
            >
              Ac*
            </div>

            {/* RENDER ALL 118 ELEMENT TILES */}
            {elements.map((el) => {
              const dimmed = isElementDimmed(el);
              const isSelected = selectedElement?.number === el.number;

              return (
                <ElementTile
                  key={el.number}
                  element={el}
                  activeTrend={activeTrend}
                  currentTempK={currentTempK}
                  isSelected={isSelected}
                  isDimmed={dimmed}
                  onHover={(element, target) => {
                    showTooltip(element, target);
                    if (onHoverElement) onHoverElement(element);
                  }}
                  onMouseMove={(target) => {
                    updatePosition(target);
                  }}
                  onLeave={() => {
                    hideTooltip();
                    if (onLeaveElement) onLeaveElement();
                  }}
                  onClick={onSelectElement}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* FLOATING HOLOGRAPHIC HOVER TOOLTIP VIA REACT PORTAL */}
      <ElementHoloTooltip
        element={tooltipState.element}
        targetRect={tooltipState.targetRect}
        isVisible={tooltipState.isVisible}
        currentTempK={currentTempK}
      />
    </div>
  );
};
