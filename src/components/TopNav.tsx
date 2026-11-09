import React from 'react';
import { ViewMode } from '../types';
import { Download, Sparkles, Compass, BookOpen, PlayCircle, Trophy } from 'lucide-react';

interface TopNavProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenExport: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onSelectView,
  onOpenExport
}) => {
  return (
    <header className="h-16 px-6 bg-white/95 backdrop-blur-sm border-b-2 border-[#27272a] shadow-[0_2px_0_rgba(0,0,0,0.8)] flex items-center justify-between gap-8 z-40 relative">
      {/* Zona 1: Brand Wordmark (Single line, expressive display face) */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); onSelectView('canvas'); }}
          className="text-2xl font-bold tracking-tight text-[#18181b] whitespace-nowrap flex items-center gap-2 font-['Caveat',cursive]"
        >
          <span className="text-2xl">🎨</span>
          <span>Astro Explorer</span>
        </a>
        <span className="hidden sm:inline-block font-sans text-[11px] font-extrabold uppercase tracking-wide bg-[#fde047] px-2 py-0.5 rounded-full border border-[#27272a] shadow-[1px_1px_0_#27272a]">
          Pizarra de Estudio
        </span>
      </div>

      {/* Zona 2: Nav Links (Clean single-line links with active indicators) */}
      <nav className="flex items-center gap-1 md:gap-3 text-sm font-semibold text-[#64646e] overflow-x-auto py-1 scrollbar-none">
        <button
          onClick={() => onSelectView('canvas')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            currentView === 'canvas'
              ? 'bg-[#fde047] text-[#18181b] border-[#27272a] shadow-[2px_2px_0_#27272a] font-bold'
              : 'border-transparent hover:border-[#27272a] hover:bg-neutral-100 text-[#27272a]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Pizarra de Nodos</span>
        </button>

        <button
          onClick={() => onSelectView('docs')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            currentView === 'docs'
              ? 'bg-[#60a5fa] text-white border-[#27272a] shadow-[2px_2px_0_#27272a] font-bold'
              : 'border-transparent hover:border-[#27272a] hover:bg-neutral-100 text-[#27272a]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Guía Markdown</span>
        </button>

        <button
          onClick={() => onSelectView('simulator')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            currentView === 'simulator'
              ? 'bg-[#4ade80] text-[#18181b] border-[#27272a] shadow-[2px_2px_0_#27272a] font-bold'
              : 'border-transparent hover:border-[#27272a] hover:bg-neutral-100 text-[#27272a]'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Simulador Blog</span>
        </button>

        <button
          onClick={() => onSelectView('quiz-global')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
            currentView === 'quiz-global'
              ? 'bg-[#c084fc] text-[#18181b] border-[#27272a] shadow-[2px_2px_0_#27272a] font-bold'
              : 'border-transparent hover:border-[#27272a] hover:bg-neutral-100 text-[#27272a]'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Reto Ninja</span>
        </button>
      </nav>

      {/* Zona 3: 1 Primary Action (Descargar Proyecto .ZIP / tablero-blog.html) */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="/astro-explorer-proyecto.zip"
          download="astro-explorer-proyecto.zip"
          className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-extrabold text-[#18181b] bg-[#4ade80] hover:bg-[#22c55e] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] hover:shadow-[1px_1px_0_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
          title="Descargar archivo ZIP del proyecto completo"
        >
          <Download className="w-4 h-4" />
          <span>Descargar .ZIP</span>
        </a>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-extrabold text-[#18181b] bg-[#fb923c] hover:bg-[#f97316] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] hover:shadow-[1px_1px_0_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer whitespace-nowrap"
          title="Opciones de exportación y comandos Git Push"
        >
          <Sparkles className="w-4 h-4 hidden sm:inline" />
          <span>Exportar / Git Push</span>
        </button>
      </div>
    </header>
  );
};
