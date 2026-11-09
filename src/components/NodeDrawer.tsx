import React, { useState } from 'react';
import { ProjectNode } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  Gamepad2, 
  Code2, 
  Layers, 
  FileText 
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface NodeDrawerProps {
  node: ProjectNode | null;
  onClose: () => void;
  onNavigateNode?: (direction: 'next' | 'prev') => void;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({
  node,
  onClose,
  onNavigateNode
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isSuccess: boolean; note: string } | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedFullCode, setCopiedFullCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'study' | 'code'>('study');

  if (!node) return null;

  const handleQuizAnswer = (index: number) => {
    setSelectedQuizOption(index);
    const option = node.quiz.options[index];
    if (option.correct) {
      setQuizFeedback({ isSuccess: true, note: option.note });
      triggerConfetti();
    } else {
      setQuizFeedback({ isSuccess: false, note: option.note });
    }
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 1800);
    } else {
      setCopiedFullCode(true);
      setTimeout(() => setCopiedFullCode(false), 1800);
    }
  };

  const headerColor = node.color.startsWith('#') ? node.color : 'var(' + node.color + ')';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex justify-end transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[760px] h-full bg-white border-l-3 border-[#27272a] shadow-[-10px_0_0_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Drawer */}
        <div
          className="px-6 py-4 border-b-2 border-[#27272a] flex items-center justify-between gap-4"
          style={{ backgroundColor: headerColor }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-xl">📄</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded border border-[#27272a]">
                  {node.tag}
                </span>
                <span className="font-['Caveat',cursive] text-lg font-bold text-[#18181b]">
                  {node.badge}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold font-mono text-[#18181b] truncate mt-0.5">
                {node.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onNavigateNode && (
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <button
                  onClick={() => { setSelectedQuizOption(null); setQuizFeedback(null); onNavigateNode('prev'); }}
                  className="w-8 h-8 flex items-center justify-center bg-white border-2 border-[#27272a] rounded-lg shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer"
                  title="Anterior archivo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setSelectedQuizOption(null); setQuizFeedback(null); onNavigateNode('next'); }}
                  className="w-8 h-8 flex items-center justify-center bg-white border-2 border-[#27272a] rounded-lg shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer"
                  title="Siguiente archivo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-white border-2 border-[#27272a] rounded-lg shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer font-bold text-sm"
              title="Cerrar (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pestañas de Vista Rápida */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-100 border-b-2 border-[#27272a] text-xs font-bold">
          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
              activeTab === 'study'
                ? 'bg-white text-[#18181b] border-[#27272a] shadow-[2px_2px_0_#27272a]'
                : 'border-transparent text-[#64646e] hover:text-[#18181b]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Guía Pedagógica y Ejercicios</span>
          </button>
          {node.fullCodePreview && (
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-white text-[#18181b] border-[#27272a] shadow-[2px_2px_0_#27272a]'
                  : 'border-transparent text-[#64646e] hover:text-[#18181b]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código Fuente Completo</span>
            </button>
          )}
        </div>

        {/* Contenido con Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'study' ? (
            <>
              {/* Bloque 1: Explicación para 15 años */}
              <div className="bg-[#fefce8] border-2 border-[#ca8a04] rounded-xl p-4 shadow-[3px_3px_0_#ca8a04]/40">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-['Caveat',cursive] text-2xl font-bold text-[#854d0e]">
                    ¿Qué hace {node.name}?
                  </span>
                  <span className="text-xs font-bold text-[#a16207] bg-[#fef08a] px-2 py-0.5 rounded border border-[#ca8a04]">
                    {node.kidTitle}
                  </span>
                </div>
                <p className="text-sm text-[#713f12] leading-relaxed font-medium">
                  {node.kidSummary}
                </p>
              </div>

              {/* Bloque 2: Analogía en el mundo real */}
              <div className="bg-[#faf5ff] border-l-4 border-[#c084fc] border-y border-r border-neutral-200 rounded-r-xl p-3.5 text-sm">
                <span className="font-bold text-[#6b21a8] flex items-center gap-1 mb-1">
                  <span>🎯</span> Analogía cotidiana:
                </span>
                <p className="text-[#3b0764] leading-relaxed">
                  {node.realLife}
                </p>
              </div>

              {/* Bloque 3: Tabla detallada de código */}
              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#18181b] mb-3 flex items-center gap-2">
                  <span>🔍</span> Desglose línea por línea / bloque clave
                </h3>
                <div className="overflow-x-auto border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] bg-white">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-100 border-b-2 border-[#27272a]">
                        <th className="py-2.5 px-3 font-extrabold text-[#27272a] w-1/3">Código clave</th>
                        <th className="py-2.5 px-3 font-extrabold text-[#27272a] w-1/3">¿Qué significa?</th>
                        <th className="py-2.5 px-3 font-extrabold text-[#27272a] w-1/3">Ejemplo / Impacto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {node.breakdown.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-2.5 px-3 align-top font-mono">
                            <div className="relative group">
                              <code className="bg-[#f1f5f9] border border-[#cbd5e1] rounded px-1.5 py-0.5 text-[11px] text-[#0f172a] block font-semibold overflow-x-auto whitespace-pre-wrap">
                                {row.code}
                              </code>
                              <button
                                onClick={() => copyToClipboard(row.code, idx)}
                                className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[#64646e] hover:text-[#18181b] cursor-pointer"
                                title="Copiar snippet"
                              >
                                {copiedCodeIndex === idx ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-700">Copiado</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copiar</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 align-top text-[#3f3f46] leading-relaxed">
                            {row.meaning}
                          </td>
                          <td className="py-2.5 px-3 align-top text-[#0369a1] font-medium leading-relaxed">
                            {row.example}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bloque 4: Mini-Ejercicio / Quiz Ninja Evaluado en Vivo */}
              <div className="bg-[#f0fdf4] border-2 border-[#16a34a] rounded-xl p-5 shadow-[4px_4px_0_#16a34a]">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 className="w-5 h-5 text-[#15803d]" />
                  <h3 className="font-['Caveat',cursive] text-2xl font-bold text-[#15803d]">
                    🎮 Reto Ninja de Programación
                  </h3>
                </div>

                <p className="font-extrabold text-sm text-[#14532d] mb-3">
                  {node.quiz.q}
                </p>

                <div className="space-y-2">
                  {node.quiz.options.map((opt, optIdx) => {
                    const isSelected = selectedQuizOption === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizAnswer(optIdx)}
                        className={`w-full text-left p-3 rounded-lg border-2 text-xs font-bold transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? opt.correct
                              ? 'bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[2px_2px_0_#16a34a]'
                              : 'bg-rose-100 border-rose-600 text-rose-950 shadow-[2px_2px_0_#e11d48]'
                            : 'bg-white border-[#27272a] text-[#18181b] hover:bg-emerald-50 hover:translate-x-1'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px]">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {quizFeedback && (
                  <div
                    className={`mt-4 p-3 rounded-lg border-2 text-xs font-bold animate-in fade-in ${
                      quizFeedback.isSuccess
                        ? 'bg-emerald-200 border-emerald-600 text-emerald-950'
                        : 'bg-rose-200 border-rose-600 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {quizFeedback.isSuccess ? '🎉 ¡CORRECTO!' : '❌ PIÉNSALO DE NUEVO:'}
                    </div>
                    <p className="font-normal font-sans text-xs">
                      {quizFeedback.note}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Tab: Código fuente completo */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#64646e] font-mono">
                  {node.name} (código de ejemplo completo)
                </span>
                <button
                  onClick={() => copyToClipboard(node.fullCodePreview || '')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold bg-white border-2 border-[#27272a] rounded-lg shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer"
                >
                  {copiedFullCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado al portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar archivo completo</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-[#18181b] text-neutral-100 rounded-xl border-2 border-[#27272a] shadow-[3px_3px_0_#27272a] font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{node.fullCodePreview}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
