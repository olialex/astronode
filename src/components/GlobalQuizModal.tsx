import React, { useState } from 'react';
import { ProjectNode } from '../types';
import { Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles, Award } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

interface GlobalQuizModalProps {
  nodes: ProjectNode[];
  onClose: () => void;
}

export const GlobalQuizModal: React.FC<GlobalQuizModalProps> = ({
  nodes,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentNode = nodes[currentIndex];
  const currentQuiz = currentNode?.quiz;

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < nodes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    nodes.forEach((node, idx) => {
      const selectedIdx = userAnswers[idx];
      if (selectedIdx !== undefined && node.quiz.options[selectedIdx]?.correct) {
        score++;
      }
    });
    return score;
  };

  const restartQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / nodes.length) * 100);

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto bg-[#f8f8f6] p-6 md:p-10 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white border-3 border-[#27272a] rounded-2xl shadow-[8px_8px_0_#27272a] p-6 md:p-8 animate-in fade-in">
        {!isFinished ? (
          <div>
            {/* Header del Reto Ninja */}
            <div className="flex items-center justify-between border-b-2 border-[#27272a] pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#c084fc] border-2 border-[#27272a] flex items-center justify-center shadow-[2px_2px_0_#27272a]">
                  <Trophy className="w-5 h-5 text-[#18181b]" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide bg-[#fde047] px-2 py-0.5 rounded border border-[#27272a]">
                    Reto Ninja de Programación
                  </span>
                  <h2 className="text-xl font-extrabold font-mono text-[#18181b] mt-0.5">
                    Pregunta {currentIndex + 1} de {nodes.length}
                  </h2>
                </div>
              </div>

              {/* Barra de Progreso */}
              <div className="text-right">
                <span className="font-mono text-xs font-extrabold text-[#64646e]">
                  Progreso: {Math.round(((currentIndex + 1) / nodes.length) * 100)}%
                </span>
                <div className="w-28 h-2.5 bg-neutral-100 rounded-full border border-[#27272a] overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#c084fc] transition-all"
                    style={{ width: `${((currentIndex + 1) / nodes.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Contexto del archivo que se evalúa */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg border border-[#27272a]/30 text-xs font-mono">
              <span className="font-bold text-[#64646e]">Evaluando módulo:</span>
              <span className="font-extrabold text-[#18181b] bg-white px-2 py-0.5 rounded border border-[#27272a]">
                {currentNode.name}
              </span>
              <span className="font-['Caveat',cursive] text-base text-[#18181b]">
                ({currentNode.badge})
              </span>
            </div>

            {/* Pregunta */}
            <h3 className="text-base md:text-lg font-extrabold text-[#18181b] mb-5 leading-snug">
              {currentQuiz?.q}
            </h3>

            {/* Opciones */}
            <div className="space-y-3 mb-6">
              {currentQuiz?.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#fef9c3] border-[#27272a] text-[#18181b] shadow-[3px_3px_0_#27272a] translate-x-1 font-bold'
                        : 'bg-white border-[#27272a]/60 hover:border-[#27272a] text-[#3f3f46] hover:bg-neutral-50'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navegación de Preguntas */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-[#27272a]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-bold border-2 border-[#27272a] rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
              >
                ← Anterior
              </button>

              <button
                onClick={handleNext}
                disabled={userAnswers[currentIndex] === undefined}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold bg-[#4ade80] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] hover:bg-[#22c55e] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{currentIndex === nodes.length - 1 ? 'Finalizar Reto' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULTADOS FINALES & CERTIFICADO */
          <div className="text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#fde047] border-3 border-[#27272a] shadow-[4px_4px_0_#27272a] flex items-center justify-center">
              <Award className="w-10 h-10 text-[#18181b]" />
            </div>

            <div>
              <span className="font-['Caveat',cursive] text-3xl font-extrabold text-[#18181b] block">
                {score >= 8 ? '¡Sobresaliente, Maestro de Astro!' : score >= 5 ? '¡Buen trabajo, Aprendiz!' : '¡Sigue practicando en la pizarra!'}
              </span>
              <h2 className="text-3xl font-extrabold font-mono text-[#18181b] mt-1">
                Puntuación: {score} / {nodes.length} ({percentage}%)
              </h2>
              <p className="text-sm text-[#64646e] mt-1 max-w-md mx-auto">
                {score >= 8
                  ? 'Has demostrado dominio completo de los conceptos fundamentales: SSG, Zod schemas, rutas dinámicas, optimización con Sharp y arquitectura desacoplada.'
                  : 'Revisa las tarjetas de la pizarra y la guía Markdown para afianzar los conceptos clave.'}
              </p>
            </div>

            {/* Desglose de respuestas */}
            <div className="text-left bg-neutral-50 border-2 border-[#27272a] rounded-xl p-4 max-h-60 overflow-y-auto space-y-3">
              {nodes.map((node, idx) => {
                const selectedIdx = userAnswers[idx];
                const option = selectedIdx !== undefined ? node.quiz.options[selectedIdx] : null;
                const isCorrect = option?.correct;

                return (
                  <div key={node.id} className="p-3 bg-white rounded-lg border border-[#27272a]/20 text-xs">
                    <div className="flex items-center justify-between font-mono font-bold mb-1">
                      <span>{node.name}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-extrabold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcto
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-700 font-extrabold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrecto
                        </span>
                      )}
                    </div>
                    <p className="text-[#64646e]">{node.quiz.q}</p>
                    {option && (
                      <p className={`mt-1 font-medium ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {option.note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={restartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold bg-white border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Reto</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold bg-[#fde047] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] hover:bg-[#facc15] cursor-pointer"
              >
                <span>Volver a la Pizarra</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
