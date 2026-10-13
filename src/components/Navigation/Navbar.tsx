import React from 'react';
import { Atom } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenCompare: () => void;
  onOpenTrendGraph: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenCompare,
  onOpenTrendGraph,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Atom className="w-5 h-5" />
          </div>
          <span>Orbital</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#table"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Periodic Table
          </a>
          <button
            onClick={onOpenTrendGraph}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Atomic Trends
          </button>
          <button
            onClick={onOpenCompare}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Compare Elements
          </button>
          <button
            onClick={onOpenQuiz}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Trends Challenge
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-500 rounded-lg hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Test Concepts
          </button>
        </div>
      </div>
    </header>
  );
};
