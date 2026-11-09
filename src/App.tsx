import React, { useState } from 'react';
import { ProjectNode, ViewMode } from './types';
import { INITIAL_NODES } from './data/projectData';
import { TopNav } from './components/TopNav';
import { CanvasBoard } from './components/CanvasBoard';
import { NodeDrawer } from './components/NodeDrawer';
import { MarkdownDocsView } from './components/MarkdownDocsView';
import { BlogSimulator } from './components/BlogSimulator';
import { GlobalQuizModal } from './components/GlobalQuizModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [nodes, setNodes] = useState<ProjectNode[]>(INITIAL_NODES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>('canvas');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Update position of a node when dragged
  const handleUpdateNodePosition = (id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, x, y } : node))
    );
  };

  // Add custom node
  const handleAddCustomNode = (customData: Partial<ProjectNode>) => {
    const newId = `custom_${Date.now()}`;
    const newNode: ProjectNode = {
      id: newId,
      name: customData.name || 'nuevo-modulo.astro',
      tag: customData.tag || 'Componente',
      desc: customData.desc || 'Módulo añadido.',
      category: customData.category || 'componentes',
      badge: customData.badge || '✨ Custom',
      color: customData.color || '#fde047',
      x: customData.x || 300,
      y: customData.y || 300,
      kidTitle: customData.kidTitle || 'Módulo creado por el usuario',
      kidSummary: customData.kidSummary || 'Nuevo archivo agregado al proyecto.',
      realLife: customData.realLife || 'Una nueva herramienta en tu mochila.',
      connections: [],
      breakdown: customData.breakdown || [
        {
          code: `// ${customData.name}`,
          meaning: 'Código del nuevo componente.',
          example: 'Listo para probar.'
        }
      ],
      quiz: customData.quiz || {
        q: '¿Qué hace este componente nuevo?',
        options: [
          { text: 'Añadir nueva funcionalidad', correct: true, note: '¡Correcto!' },
          { text: 'Causar un fallo en el servidor', correct: false, note: 'No causa fallos.' }
        ]
      },
      fullCodePreview: `---
// ${customData.name}
---
<div>
  <h3>Nuevo Componente</h3>
</div>`
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  // Reset positions back to initial layout
  const handleResetPositions = () => {
    setNodes(INITIAL_NODES);
  };

  // Cycle through nodes in drawer
  const handleNavigateNode = (direction: 'next' | 'prev') => {
    if (!selectedNode) return;
    const currentIndex = nodes.findIndex((n) => n.id === selectedNode.id);
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % nodes.length;
    } else {
      targetIndex = (currentIndex - 1 + nodes.length) % nodes.length;
    }

    setSelectedNode(nodes[targetIndex]);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#f8f8f6] text-[#18181b]">
      {/* Barra de Navegación Principal */}
      <TopNav
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* Vista Activa */}
      <main className="flex-1 w-full h-[calc(100vh-64px)] relative overflow-hidden">
        {currentView === 'canvas' && (
          <CanvasBoard
            nodes={nodes}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectNode={(node) => setSelectedNode(node)}
            onUpdateNodePosition={handleUpdateNodePosition}
            onAddCustomNode={handleAddCustomNode}
            onResetPositions={handleResetPositions}
          />
        )}

        {currentView === 'docs' && <MarkdownDocsView />}

        {currentView === 'simulator' && <BlogSimulator />}

        {currentView === 'quiz-global' && (
          <GlobalQuizModal
            nodes={nodes}
            onClose={() => setCurrentView('canvas')}
          />
        )}
      </main>

      {/* Drawer Lateral del Inspector Pedagógico */}
      <NodeDrawer
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onNavigateNode={handleNavigateNode}
      />

      {/* Modal de Exportación a HTML para GitHub Pages */}
      {isExportModalOpen && (
        <ExportModal
          nodes={nodes}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  );
}
