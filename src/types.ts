export interface CodeBreakdown {
  code: string;
  meaning: string;
  example: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
  note: string;
}

export interface QuizData {
  q: string;
  options: QuizOption[];
}

export interface ProjectNode {
  id: string;
  x: number;
  y: number;
  color: string; // CSS variable or hex
  category: 'config' | 'estructura' | 'rutas' | 'componentes' | 'estilos' | 'admin';
  tag: string;
  name: string;
  desc: string;
  badge: string;
  kidTitle: string;
  kidSummary: string;
  realLife: string;
  connections: string[];
  breakdown: CodeBreakdown[];
  quiz: QuizData;
  fullCodePreview?: string;
}

export type ViewMode = 'canvas' | 'docs' | 'simulator' | 'quiz-global';
