import React, { useEffect, useRef, useState } from 'react';
import { ChemicalElement } from '../../types/element';
import { Play, Pause, Zap } from 'lucide-react';

interface BohrModelVisualizerProps {
  element: ChemicalElement;
}

const SHELL_LETTERS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export const BohrModelVisualizer: React.FC<BohrModelVisualizerProps> = ({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [hoveredShell, setHoveredShell] = useState<number | null>(null);

  const shells = element.shells;
  const protons = element.number;
  const neutrons = Math.round(element.atomicMass) - protons;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep radial glow in background
      const bgGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(centerX, centerY)
      );
      bgGradient.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      bgGradient.addColorStop(0.7, 'rgba(15, 23, 42, 0)');
      bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      const maxRadius = Math.min(centerX, centerY) - 26;
      const numShells = shells.length;
      const baseRadius = 36;
      const radiusStep = (maxRadius - baseRadius) / Math.max(1, numShells);

      // Draw electron shells (orbits)
      shells.forEach((electronCount, index) => {
        const shellRadius = baseRadius + (index + 1) * radiusStep;
        const isHovered = hoveredShell === index;
        const isValence = index === shells.length - 1;

        // Shell orbit line
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered
          ? '#38bdf8'
          : isValence
          ? 'rgba(244, 63, 94, 0.45)'
          : 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = isHovered ? 2.5 : isValence ? 1.5 : 1;
        if (!isHovered && !isValence) {
          ctx.setLineDash([3, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Shell label badge on outer edge
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = isHovered ? '#38bdf8' : 'rgba(148, 163, 184, 0.6)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelText = `n=${index + 1} (${SHELL_LETTERS[index]})`;
        ctx.fillText(labelText, centerX, centerY - shellRadius - 5);

        // Orbit speed decreases with distance (Kepler/Bohr law: v ~ 1/sqrt(r))
        const orbitalSpeed = ((1.2 / Math.sqrt(index + 1)) * speed * (isPlaying ? 1 : 0));
        const currentAngle = angleOffset * orbitalSpeed * (index % 2 === 0 ? 1 : -1);

        // Draw electrons
        for (let e = 0; e < electronCount; e++) {
          const electronAngle = currentAngle + (e * (Math.PI * 2)) / electronCount;
          const ex = centerX + shellRadius * Math.cos(electronAngle);
          const ey = centerY + shellRadius * Math.sin(electronAngle);

          // Electron glow
          const eGlow = ctx.createRadialGradient(ex, ey, 1, ex, ey, 7);
          eGlow.addColorStop(0, '#38bdf8');
          eGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = eGlow;
          ctx.beginPath();
          ctx.arc(ex, ey, 7, 0, Math.PI * 2);
          ctx.fill();

          // Electron dot
          ctx.beginPath();
          ctx.arc(ex, ey, isHovered ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? '#ffffff' : '#38bdf8';
          ctx.fill();
        }
      });

      // Nucleus
      const nucleusRadius = 24;
      const nucGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        4,
        centerX,
        centerY,
        nucleusRadius + 12
      );
      nucGlow.addColorStop(0, 'rgba(244, 63, 94, 0.9)');
      nucGlow.addColorStop(0.5, 'rgba(244, 63, 94, 0.4)');
      nucGlow.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = nucGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius + 12, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus body
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Nucleus text (Symbol & Z)
      ctx.font = 'bold 13px "Outfit", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.symbol, centerX, centerY - 4);

      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(244, 114, 182, 0.9)';
      ctx.fillText(`${protons}p⁺ ${neutrons}n⁰`, centerX, centerY + 8);

      if (isPlaying) {
        angleOffset += 0.015;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [element, isPlaying, speed, hoveredShell, shells, protons, neutrons]);

  return (
    <div className="flex flex-col items-center p-4 bg-slate-900/80 rounded-xl border border-slate-800">
      <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-200">Interactive Bohr Model</span>
          <span>·</span>
          <span className="text-slate-400 font-mono">
            {shells.reduce((a, b) => a + b, 0)} Electrons in {shells.length} Shells
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isPlaying ? 'Pause orbits' : 'Resume orbits'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-0.5 font-mono text-[11px]">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded ${
                  speed === s
                    ? 'bg-sky-500 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className="rounded-lg shadow-inner max-w-full"
        />
      </div>

      {/* Shell Breakdown Badges */}
      <div className="w-full mt-3 pt-3 border-t border-slate-800">
        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Shell Occupation (K through Q):</span>
          <span className="text-rose-400 font-medium">
            Valence Electrons: {shells[shells.length - 1]}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {shells.map((count, idx) => {
            const isValence = idx === shells.length - 1;
            const maxCap = 2 * Math.pow(idx + 1, 2);
            return (
              <button
                key={idx}
                onMouseEnter={() => setHoveredShell(idx)}
                onMouseLeave={() => setHoveredShell(null)}
                className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-all ${
                  hoveredShell === idx
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 scale-105'
                    : isValence
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300'
                }`}
              >
                <span className="font-semibold">{SHELL_LETTERS[idx]}</span>
                <span className="text-slate-400 text-[10px] ml-1">
                  (n={idx + 1})
                </span>
                : <span className="text-white font-bold">{count}</span>
                <span className="text-slate-500 text-[10px]">/{maxCap}</span>
                {isValence && (
                  <span className="ml-1 text-[9px] text-rose-400">Valence</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
