import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChemicalElement, StateOfMatter } from '../../types/element';
import { CATEGORY_COLORS } from '../../data/elements';
import { getElementStateAtTemp } from '../../utils/chemistry';
import { useLanguage } from '../../context/LanguageContext';

export interface TooltipState {
  element: ChemicalElement | null;
  targetRect: DOMRect | null;
  isVisible: boolean;
}

/**
 * Custom hook for hover intent (80ms delay) and position tracking via requestAnimationFrame
 */
export function useHoverTooltip(intentDelayMs: number = 80) {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    element: null,
    targetRect: null,
    isVisible: false,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  const showTooltip = useCallback((el: ChemicalElement, targetElement: HTMLElement) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = targetElement.getBoundingClientRect();
        setTooltipState({
          element: el,
          targetRect: rect,
          isVisible: true,
        });
      });
    }, intentDelayMs);
  }, [intentDelayMs]);

  const updatePosition = useCallback((targetElement: HTMLElement) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      const rect = targetElement.getBoundingClientRect();
      setTooltipState((prev) => ({
        ...prev,
        targetRect: rect,
      }));
    });
  }, []);

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTooltipState({
      element: null,
      targetRect: null,
      isVisible: false,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    tooltipState,
    showTooltip,
    updatePosition,
    hideTooltip,
  };
}

interface ElementHoloTooltipProps {
  element: ChemicalElement | null;
  targetRect: DOMRect | null;
  isVisible: boolean;
  currentTempK: number;
}

export const ElementHoloTooltip: React.FC<ElementHoloTooltipProps> = ({
  element,
  targetRect,
  isVisible,
  currentTempK,
}) => {
  const { getElementName, t } = useLanguage();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    placement: 'top' | 'bottom' | 'left' | 'right';
    connectorStart: { x: number; y: number };
    connectorEnd: { x: number; y: number };
  } | null>(null);

  // Position calculation with auto-flip and clamping
  useEffect(() => {
    if (!isVisible || !targetRect || !element) {
      setCoords(null);
      return;
    }

    const computePosition = () => {
      const tooltipW = tooltipRef.current?.offsetWidth || 270;
      const tooltipH = tooltipRef.current?.offsetHeight || 155;
      const offset = 12;

      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const tileCenterX = targetRect.left + targetRect.width / 2;
      const tileCenterY = targetRect.top + targetRect.height / 2;

      let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
      let top = 0;
      let left = 0;
      let connectorStart = { x: 0, y: 0 };
      let connectorEnd = { x: 0, y: 0 };

      // Determine best vertical / horizontal placement with auto-flip
      const spaceAbove = targetRect.top;
      const spaceBelow = viewportH - targetRect.bottom;
      const spaceRight = viewportW - targetRect.right;
      const spaceLeft = targetRect.left;

      if (spaceAbove >= tooltipH + offset + 8) {
        // PREFERRED: Above tile
        placement = 'top';
        top = targetRect.top - tooltipH - offset;
        left = tileCenterX - tooltipW / 2;
        connectorStart = { x: tileCenterX, y: targetRect.top };
        connectorEnd = { x: tileCenterX, y: top + tooltipH };
      } else if (spaceBelow >= tooltipH + offset + 8) {
        // FLIP: Below tile
        placement = 'bottom';
        top = targetRect.bottom + offset;
        left = tileCenterX - tooltipW / 2;
        connectorStart = { x: tileCenterX, y: targetRect.bottom };
        connectorEnd = { x: tileCenterX, y: top };
      } else if (spaceRight >= tooltipW + offset + 8) {
        // FLIP: Right of tile
        placement = 'right';
        left = targetRect.right + offset;
        top = tileCenterY - tooltipH / 2;
        connectorStart = { x: targetRect.right, y: tileCenterY };
        connectorEnd = { x: left, y: tileCenterY };
      } else {
        // FLIP: Left of tile
        placement = 'left';
        left = targetRect.left - tooltipW - offset;
        top = tileCenterY - tooltipH / 2;
        connectorStart = { x: targetRect.left, y: tileCenterY };
        connectorEnd = { x: left + tooltipW, y: tileCenterY };
      }

      // Clamp inside viewport with margin
      const clampLeft = Math.max(10, Math.min(viewportW - tooltipW - 10, left));
      const clampTop = Math.max(10, Math.min(viewportH - tooltipH - 10, top));

      // Adjust connector endpoints if clamped
      if (placement === 'top' || placement === 'bottom') {
        connectorEnd.x = Math.max(clampLeft + 16, Math.min(clampLeft + tooltipW - 16, tileCenterX));
      } else {
        connectorEnd.y = Math.max(clampTop + 16, Math.min(clampTop + tooltipH - 16, tileCenterY));
      }

      setCoords({
        left: clampLeft,
        top: clampTop,
        placement,
        connectorStart,
        connectorEnd,
      });
    };

    computePosition();
  }, [isVisible, targetRect, element]);

  if (typeof document === 'undefined') return null;
  if (!isVisible || !element || !coords) return null;

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];
  const stateAtTemp: StateOfMatter = getElementStateAtTemp(element, currentTempK);

  const stateLabels: Record<StateOfMatter, string> = {
    solid: t('solid', 'Solid'),
    liquid: t('liquid', 'Liquid'),
    gas: t('gas', 'Gas'),
    unknown: t('unknown', 'Synthetic'),
  };

  return createPortal(
    <aside
      aria-label={`${element.name} Quick Telemetry`}
      className="pointer-events-none fixed inset-0 z-[9999]"
    >
      {/* THIN DASHED CONNECTOR LINE TO TILE */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))' }}
      >
        <line
          x1={coords.connectorStart.x}
          y1={coords.connectorStart.y}
          x2={coords.connectorEnd.x}
          y2={coords.connectorEnd.y}
          stroke="#71717A"
          strokeWidth="1.25"
          strokeDasharray="3 3"
        />
        {/* Anchor point circle on tile */}
        <circle
          cx={coords.connectorStart.x}
          cy={coords.connectorStart.y}
          r="2.5"
          fill="#1A1A1A"
        />
      </svg>

      {/* FLOATING FROSTED DASHBOARD TOOLTIP (MATCHING ROCANVILLE LIGHT THEME) */}
      <div
        ref={tooltipRef}
        style={{
          position: 'fixed',
          left: `${coords.left}px`,
          top: `${coords.top}px`,
          width: '270px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
        }}
        className="relative rounded-2xl p-3 text-neutral-900 border border-black/[0.08] transition-all duration-150 ease-out select-none overflow-hidden animate-in fade-in zoom-in-95"
      >
        {/* Subtle Light HUD Corner Accents */}
        <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-neutral-400 pointer-events-none" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-neutral-400 pointer-events-none" />
        <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-neutral-400 pointer-events-none" />
        <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-neutral-400 pointer-events-none" />

        {/* CONTENT (EXACTLY 5 SHORT LINES) */}
        <div className="relative z-10 flex flex-col gap-1.5 text-xs">
          {/* LINE 1: Symbol + Atomic # Badge, Element Name, Atomic Mass */}
          <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] pb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-neutral-100 border border-black/[0.06] text-neutral-600 font-bold">
                #{element.number}
              </span>
              <span className="font-display font-black text-base text-neutral-900 tracking-tight leading-none">
                {element.symbol}
              </span>
              <span className="font-semibold text-neutral-800 tracking-tight text-xs truncate max-w-[100px]">
                {getElementName(element.number, element.name)}
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500 font-semibold shrink-0">
              {element.atomicMass} u
            </span>
          </div>

          {/* LINE 2: Category chip, Group / Period */}
          <div className="flex items-center justify-between text-[10px]">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${catStyle.pillBg} ${catStyle.pillText} ${catStyle.border} truncate max-w-[150px]`}>
              {catStyle.label}
            </span>
            <span className="font-mono text-neutral-400 text-[10px]">
              Gr {element.group ?? 'N/A'} · P {element.period} · {element.block}-block
            </span>
          </div>

          {/* LINE 3: Electron configuration (short form) */}
          <div className="flex items-center justify-between text-[11px] font-mono bg-neutral-100/80 px-2 py-1 rounded-lg border border-black/[0.04]">
            <span className="text-neutral-400 text-[10px]">{t('config', 'Config')}</span>
            <span className="text-neutral-900 font-bold tracking-tight">
              {element.electronConfiguration}
            </span>
          </div>

          {/* LINE 4: Electronegativity, Radius, State at current temp */}
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
            <div className="bg-neutral-50 px-1 py-1 rounded-lg border border-black/[0.04]">
              <span className="text-neutral-400 block text-[9px] font-sans">EN</span>
              <span className="text-amber-800 font-bold">
                {element.electronegativity ?? '—'}
              </span>
            </div>
            <div className="bg-neutral-50 px-1 py-1 rounded-lg border border-black/[0.04]">
              <span className="text-neutral-400 block text-[9px] font-sans">Radius</span>
              <span className="text-emerald-800 font-bold">
                {element.atomicRadius ? `${element.atomicRadius}pm` : '—'}
              </span>
            </div>
            <div className="bg-neutral-50 px-1 py-1 rounded-lg border border-black/[0.04]">
              <span className="text-neutral-400 block text-[9px] font-sans">{t('phase', 'Phase')}</span>
              <span className="text-sky-800 font-bold">
                {stateLabels[stateAtTemp]}
              </span>
            </div>
          </div>

          {/* LINE 5: Tiny shells line */}
          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 pt-1 border-t border-black/[0.05]">
            <span className="text-neutral-500 font-medium font-sans">{t('shells', 'Shells')}</span>
            <span className="text-neutral-800 font-semibold tracking-wider">
              {element.shells.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </aside>,
    document.body
  );
};
