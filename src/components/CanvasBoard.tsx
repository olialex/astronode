import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProjectNode } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Plus, 
  Search, 
  Layers, 
  Move,
  FileCode2,
  HelpCircle,
  Sparkles,
  MapPin
} from 'lucide-react';

interface CanvasBoardProps {
  nodes: ProjectNode[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectNode: (node: ProjectNode) => void;
  onUpdateNodePosition: (id: string, x: number, y: number) => void;
  onAddCustomNode: (node: Partial<ProjectNode>) => void;
  onResetPositions: () => void;
}

export const CanvasBoard: React.FC<CanvasBoardProps> = ({
  nodes,
  selectedCategory,
  onSelectCategory,
  onSelectNode,
  onUpdateNodePosition,
  onAddCustomNode,
  onResetPositions
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan & Zoom state
  const [pan, setPan] = useState({ x: 80, y: 70 });
  const [zoom, setZoom] = useState(0.9);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [nodeDragOffset, setNodeDragOffset] = useState({ x: 0, y: 0 });
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New node form state
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeTag, setNewNodeTag] = useState('');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [newNodeCategory, setNewNodeCategory] = useState<'config' | 'estructura' | 'rutas' | 'componentes' | 'estilos' | 'admin'>('componentes');
  const [newNodeBadge, setNewNodeBadge] = useState('✨ Mi Componente');

  // Filter nodes based on category and search query
  const filteredNodes = nodes.filter((node) => {
    const matchesCat = selectedCategory === 'all' || node.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Handle Wheel Zoom (centered towards mouse cursor)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = 1.1;
    const oldZoom = zoom;
    let newZoom = e.deltaY < 0 ? oldZoom * zoomFactor : oldZoom / zoomFactor;
    newZoom = Math.min(Math.max(newZoom, 0.35), 2.2);

    const newPanX = mouseX - (mouseX - pan.x) * (newZoom / oldZoom);
    const newPanY = mouseY - (mouseY - pan.y) * (newZoom / oldZoom);

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Background pointer down -> pan
  const handleBackgroundPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.canvas-node-card')) return;
    setIsPanning(true);
    setHasMovedDuringDrag(false);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      const newX = e.clientX - panStart.x;
      const newY = e.clientY - panStart.y;
      if (Math.abs(newX - pan.x) > 3 || Math.abs(newY - pan.y) > 3) {
        setHasMovedDuringDrag(true);
      }
      setPan({ x: newX, y: newY });
    } else if (draggedNodeId) {
      setHasMovedDuringDrag(true);
      const targetX = (e.clientX - nodeDragOffset.x) / zoom;
      const targetY = (e.clientY - nodeDragOffset.y) / zoom;
      onUpdateNodePosition(draggedNodeId, Math.round(targetX), Math.round(targetY));
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  // Start dragging a node
  const handleNodePointerDown = (e: React.PointerEvent, node: ProjectNode) => {
    e.stopPropagation();
    setDraggedNodeId(node.id);
    setHasMovedDuringDrag(false);
    setNodeDragOffset({
      x: e.clientX - node.x * zoom,
      y: e.clientY - node.y * zoom
    });
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.2, 2.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.2, 0.35));
  const handleResetView = () => {
    setPan({ x: 80, y: 70 });
    setZoom(0.9);
  };

  const handleFitToScreen = () => {
    if (nodes.length === 0) return;
    const minX = Math.min(...nodes.map((n) => n.x));
    const maxX = Math.max(...nodes.map((n) => n.x + 250));
    const minY = Math.min(...nodes.map((n) => n.y));
    const maxY = Math.max(...nodes.map((n) => n.y + 160));

    const contentW = maxX - minX + 160;
    const contentH = maxY - minY + 160;
    const containerW = window.innerWidth;
    const containerH = window.innerHeight - 80;

    const scale = Math.min(Math.min(containerW / contentW, containerH / contentH), 1.2);
    setZoom(scale);
    setPan({
      x: (containerW - contentW * scale) / 2 - minX * scale + 80 * scale,
      y: (containerH - contentH * scale) / 2 - minY * scale + 80 * scale
    });
  };

  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const colors: Record<string, string> = {
      config: '#fb923c',
      estructura: '#c084fc',
      rutas: '#f472b6',
      componentes: '#60a5fa',
      estilos: '#4ade80',
      admin: '#fde047'
    };

    onAddCustomNode({
      name: newNodeName.trim(),
      tag: newNodeTag.trim() || 'Componente Personalizado',
      desc: newNodeDesc.trim() || 'Nuevo archivo agregado a la pizarra.',
      category: newNodeCategory,
      badge: newNodeBadge.trim() || '✨ Custom',
      color: colors[newNodeCategory] || '#fde047',
      x: Math.round(-pan.x / zoom + window.innerWidth / (2 * zoom) - 120),
      y: Math.round(-pan.y / zoom + window.innerHeight / (2 * zoom) - 80),
      kidTitle: `El archivo ${newNodeName.trim()}`,
      kidSummary: newNodeDesc.trim() || 'Componente personalizado del blog Astro.',
      realLife: 'Una pieza extra de tu inventario.',
      connections: [],
      breakdown: [
        {
          code: `// ${newNodeName.trim()}`,
          meaning: 'Archivo personalizado creado por el estudiante.',
          example: 'Listo para documentar e inspeccionar.'
        }
      ],
      quiz: {
        q: `¿Cuál es la función principal de ${newNodeName.trim()}?`,
        options: [
          { text: 'Añadir nueva lógica al proyecto', correct: true, note: '¡Exacto!' },
          { text: 'Borrar archivos del sistema', correct: false, note: 'No borra nada.' }
        ]
      }
    });

    setNewNodeName('');
    setNewNodeTag('');
    setNewNodeDesc('');
    setShowAddModal(false);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handleBackgroundPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-[calc(100vh-64px)] overflow-hidden canvas-grid ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* HUD de Controles Flotantes Superior Izquierdo: Categorías & Búsqueda */}
      <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2 max-w-[85vw]">
        {/* Barra de Filtro de Categorías */}
        <div className="flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a]">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#fde047] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Todos ({nodes.length})
          </button>
          <button
            onClick={() => onSelectCategory('config')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'config'
                ? 'bg-[#fb923c] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Config
          </button>
          <button
            onClick={() => onSelectCategory('estructura')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'estructura'
                ? 'bg-[#c084fc] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Estructura
          </button>
          <button
            onClick={() => onSelectCategory('rutas')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'rutas'
                ? 'bg-[#f472b6] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Rutas
          </button>
          <button
            onClick={() => onSelectCategory('componentes')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'componentes'
                ? 'bg-[#60a5fa] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Componentes
          </button>
          <button
            onClick={() => onSelectCategory('estilos')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'estilos'
                ? 'bg-[#4ade80] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Estilos
          </button>
          <button
            onClick={() => onSelectCategory('admin')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedCategory === 'admin'
                ? 'bg-[#fde047] text-[#18181b] border border-[#27272a] shadow-[1px_1px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b] hover:bg-neutral-100'
            }`}
          >
            Panel
          </button>
        </div>

        {/* Input de Búsqueda Rápida */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar archivo (ej: [slug], sharp)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-52 md:w-64 pl-8 pr-3 py-1.5 text-xs font-semibold bg-white border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] focus:outline-none focus:ring-2 focus:ring-[#fde047]"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#64646e]" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2 text-xs font-bold text-[#64646e] hover:text-black cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Botón para Añadir Nodo */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold bg-[#4ade80] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-[#22c55e] cursor-pointer"
          title="Añadir nuevo nodo o archivo a la pizarra"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Nodo</span>
        </button>
      </div>

      {/* Controles de Zoom y Vista (Esquina Inferior Izquierda) */}
      <div className="absolute bottom-5 left-5 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1 p-1 bg-white/95 backdrop-blur-sm border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a]">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 border border-transparent hover:border-[#27272a] transition-all cursor-pointer font-bold text-[#18181b]"
            title="Acercar (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-1.5 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 border border-transparent hover:border-[#27272a] transition-all cursor-pointer font-bold text-[#18181b]"
            title="Alejar (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-neutral-300 mx-0.5" />
          <button
            onClick={handleFitToScreen}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 border border-transparent hover:border-[#27272a] transition-all cursor-pointer text-[#18181b]"
            title="Ajustar todo a pantalla"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 border border-transparent hover:border-[#27272a] transition-all cursor-pointer text-[#18181b]"
            title="Restablecer posición inicial"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Botón para restablecer posiciones de nodos si se desordenaron */}
        <button
          onClick={onResetPositions}
          className="px-2.5 py-1.5 text-xs font-bold bg-white text-[#64646e] hover:text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-neutral-50 cursor-pointer hidden md:flex items-center gap-1.5"
          title="Volver a acomodar los nodos como en el mapa original"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restablecer Nodos</span>
        </button>
      </div>

      {/* Indicador de Ayuda / Tips Pedagógicos (Inferior Centro) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-sm border-2 border-[#27272a] rounded-full shadow-[2px_2px_0_#27272a] text-xs font-semibold text-[#64646e]">
        <span>💡 Arrastra el fondo para moverte</span>
        <span aria-hidden="true">·</span>
        <span>Rueda para Zoom</span>
        <span aria-hidden="true">·</span>
        <span className="text-[#18181b] font-bold">Haz clic en cualquier nodo para abrir la guía pedagógica</span>
      </div>

      {/* Mini-mapa Radar (Esquina Inferior Derecha) */}
      <div className="absolute bottom-5 right-5 z-30 hidden sm:block bg-white/95 border-2 border-[#27272a] rounded-xl p-2 shadow-[3px_3px_0_#27272a] w-36 h-28 pointer-events-none">
        <div className="w-full h-full relative bg-[#f8f8f6] border border-dashed border-[#27272a]/30 rounded overflow-hidden">
          {nodes.map((n) => {
            // Map node coords (0..1400, 0..900) to mini-map (0..128, 0..88)
            const mx = (n.x / 1400) * 115 + 4;
            const my = (n.y / 950) * 75 + 4;
            return (
              <div
                key={`mini-${n.id}`}
                className="absolute w-2 h-2 rounded-full border border-black/80"
                style={{
                  left: `${Math.min(Math.max(mx, 2), 116)}px`,
                  top: `${Math.min(Math.max(my, 2), 76)}px`,
                  backgroundColor: n.color
                }}
              />
            );
          })}
        </div>
      </div>

      {/* EL MUNDO TRANSFORMABLE (Pan & Zoom) */}
      <div
        id="world"
        className="absolute top-0 left-0 origin-top-left transition-none will-change-transform"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
        }}
      >
        {/* CAPA SVG CONECTORAS (Líneas curvas orgánicas animadas tipo Excalidraw) */}
        <svg
          id="connections-layer"
          className="absolute top-0 left-0 pointer-events-none overflow-visible z-[1]"
          style={{ width: '4000px', height: '4000px' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#27272a" />
            </marker>
          </defs>

          {nodes.map((source) => {
            if (!source.connections) return null;
            return source.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;

              // Center of cards (assuming width ~250px, height ~130px)
              const x1 = source.x + 125;
              const y1 = source.y + 65;
              const x2 = target.x + 125;
              const y2 = target.y + 65;

              // Cubic bezier curve calculation
              const dx = (x2 - x1) * 0.5;
              const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

              return (
                <g key={`conn-${source.id}-${targetId}`}>
                  {/* Sombra de la línea */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.15)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    transform="translate(2, 2)"
                  />
                  {/* Línea principal animada discontinua */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#27272a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="wire-animated"
                  />
                </g>
              );
            });
          })}
        </svg>

        {/* CONTENEDOR DE NODOS */}
        <div id="nodes-container" className="relative z-10">
          {nodes.map((node) => {
            const isMatch = filteredNodes.some((fn) => fn.id === node.id);
            const isDragged = draggedNodeId === node.id;

            return (
              <div
                key={node.id}
                id={`node-${node.id}`}
                onPointerDown={(e) => handleNodePointerDown(e, node)}
                onClick={() => {
                  if (!hasMovedDuringDrag) {
                    onSelectNode(node);
                  }
                }}
                className={`canvas-node-card absolute w-[255px] bg-white border-[2.5px] border-[#27272a] rounded-xl p-3.5 shadow-[4px_4px_0px_rgba(0,0,0,0.9)] hover:shadow-[7px_7px_0px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 transition-all select-none cursor-pointer ${
                  isDragged ? 'z-40 scale-[1.03] shadow-[8px_8px_0px_rgba(0,0,0,0.95)]' : 'z-10'
                } ${!isMatch ? 'opacity-30 grayscale' : 'opacity-100'}`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  touchAction: 'none'
                }}
              >
                {/* Header de la Tarjeta */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border-[1.5px] border-[#27272a] shadow-[1px_1px_0_#27272a]"
                    style={{ backgroundColor: node.color }}
                  >
                    {node.tag}
                  </span>
                  <span className="text-xs text-[#64646e] flex items-center gap-1 font-mono">
                    <FileCode2 className="w-3.5 h-3.5 text-[#27272a]" />
                  </span>
                </div>

                {/* Nombre de archivo */}
                <div className="font-extrabold text-[15px] text-[#18181b] font-mono tracking-tight break-all mb-1">
                  {node.name}
                </div>

                {/* Breve descripción */}
                <p className="text-xs text-[#64646e] leading-snug line-clamp-2 mb-2 font-medium">
                  {node.desc}
                </p>

                {/* Badge con tipografía estilo boceto / handwritten */}
                <div className="pt-1.5 border-t border-dashed border-[#27272a]/25 flex items-center justify-between">
                  <span className="font-['Caveat',cursive] text-lg font-bold text-[#18181b]">
                    {node.badge}
                  </span>
                  <span className="text-[10px] font-bold text-[#64646e] hover:text-[#18181b] bg-neutral-100 px-1.5 py-0.5 rounded border border-[#27272a]/40">
                    Inspeccionar 🔍
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal para Añadir Nodo Personalizado */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-3 border-[#27272a] rounded-2xl shadow-[8px_8px_0_#27272a] max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#27272a] pb-3">
              <h3 className="text-lg font-extrabold font-mono flex items-center gap-2">
                <span>➕</span> Añadir Nodo al Mapa
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 flex items-center justify-center border-2 border-[#27272a] rounded-lg font-bold hover:bg-neutral-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Nombre de Archivo / Módulo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej: astro.config.mjs o MiBoton.astro"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-[#27272a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fde047] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={newNodeCategory}
                    onChange={(e) => setNewNodeCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 text-xs border-2 border-[#27272a] rounded-lg bg-white font-semibold"
                  >
                    <option value="componentes">Componentes</option>
                    <option value="config">Configuración</option>
                    <option value="estructura">Estructura</option>
                    <option value="rutas">Rutas / Páginas</option>
                    <option value="estilos">Estilos CSS</option>
                    <option value="admin">Panel Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Etiqueta (Tag)
                  </label>
                  <input
                    type="text"
                    placeholder="ej: Integración"
                    value={newNodeTag}
                    onChange={(e) => setNewNodeTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs border-2 border-[#27272a] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Insignia Dibujada (Badge)
                </label>
                <input
                  type="text"
                  placeholder="ej: 🚀 El Propulsor"
                  value={newNodeBadge}
                  onChange={(e) => setNewNodeBadge(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-2 border-[#27272a] rounded-lg font-['Caveat',cursive] text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  ¿Para qué sirve? (Resumen corto)
                </label>
                <textarea
                  rows={2}
                  placeholder="Explica qué hace este archivo en el proyecto..."
                  value={newNodeDesc}
                  onChange={(e) => setNewNodeDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-2 border-[#27272a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fde047]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#27272a]/20">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#27272a] rounded-xl hover:bg-neutral-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-extrabold bg-[#4ade80] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-[#22c55e] cursor-pointer"
                >
                  Insertar en la Pizarra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
