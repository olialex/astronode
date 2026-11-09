import { ProjectNode } from '../types';

export function generateStandaloneHtml(nodes: ProjectNode[]): string {
  const jsonNodes = JSON.stringify(nodes, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Astro Explorer — Pizarra Interactiva del Blog</title>
  <!-- Google Fonts: Estilo Excalidraw / Cuaderno & UI limpia -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg: #f8f8f6;
      --grid-dot: #d2d2cc;
      --card-bg: #ffffff;
      --text-main: #18181b;
      --text-muted: #64646e;
      --border: #27272a;
      --shadow: 4px 4px 0px rgba(0, 0, 0, 0.9);
      --shadow-hover: 7px 7px 0px rgba(0, 0, 0, 0.9);
      --font-hand: 'Caveat', cursive;
      --font-ui: 'Plus Jakarta Sans', sans-serif;
      --font-code: 'JetBrains Mono', monospace;
      
      --c-yellow: #fde047;
      --c-pink: #f472b6;
      --c-blue: #60a5fa;
      --c-green: #4ade80;
      --c-orange: #fb923c;
      --c-purple: #c084fc;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
    }

    body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: var(--bg);
      background-image: radial-gradient(var(--grid-dot) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
      font-family: var(--font-ui);
      color: var(--text-main);
    }

    /* BARRA SUPERIOR */
    .top-bar {
      position: absolute;
      top: 14px;
      left: 14px;
      z-index: 50;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--card-bg);
      border: 2px solid var(--border);
      border-radius: 12px;
      padding: 8px 16px;
      box-shadow: var(--shadow);
    }

    .top-bar h1 {
      font-family: var(--font-hand);
      font-size: 1.8rem;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .top-bar span.pill {
      font-family: var(--font-ui);
      font-size: 0.75rem;
      font-weight: 800;
      background: var(--c-yellow);
      padding: 3px 8px;
      border-radius: 999px;
      border: 1.5px solid var(--border);
    }

    .controls-hint {
      position: absolute;
      bottom: 16px;
      left: 16px;
      z-index: 50;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
      border: 1.5px solid var(--border);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      pointer-events: none;
    }

    /* LIENZO DE TRABAJO */
    #viewport {
      width: 100%;
      height: 100%;
      cursor: grab;
      position: relative;
      touch-action: none;
    }
    #viewport.grabbing {
      cursor: grabbing;
    }

    #world {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0;
      will-change: transform;
    }

    /* LÍNEAS SVG CONECTORAS */
    #connections-layer {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: visible;
      z-index: 1;
    }

    .wire {
      stroke: var(--border);
      stroke-width: 2.5;
      stroke-linecap: round;
      fill: none;
      stroke-dasharray: 6 6;
      animation: dash 30s linear infinite;
    }

    @keyframes dash {
      to { stroke-dashoffset: -1000; }
    }

    /* NODOS EXCALIDRAW STYLE */
    .node {
      position: absolute;
      width: 250px;
      background: var(--card-bg);
      border: 2.5px solid var(--border);
      border-radius: 12px;
      padding: 14px 16px;
      box-shadow: var(--shadow);
      cursor: pointer;
      z-index: 10;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      touch-action: none;
    }

    .node:hover {
      box-shadow: var(--shadow-hover);
      transform: scale(1.02);
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .node-tag {
      font-size: 0.68rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 6px;
      border: 1.5px solid var(--border);
    }

    .node-title {
      font-size: 0.95rem;
      font-weight: 800;
      word-break: break-all;
    }

    .node-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.35;
      margin-top: 4px;
    }

    .node-badge {
      font-family: var(--font-hand);
      font-size: 1.15rem;
      color: #000;
      margin-top: 8px;
      display: block;
      font-weight: 700;
    }

    /* MODAL DE APRENDIZAJE */
    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(3px);
      z-index: 100;
      display: none;
      align-items: center;
      justify-content: flex-end;
    }

    .drawer-overlay.open {
      display: flex;
    }

    .drawer {
      width: min(780px, 94vw);
      height: 96vh;
      background: var(--card-bg);
      border: 3px solid var(--border);
      border-radius: 16px 0 0 16px;
      box-shadow: -10px 0 0 rgba(0, 0, 0, 0.8);
      margin-right: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: text;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      padding: 16px 24px;
      border-bottom: 2px solid var(--border);
      background: var(--c-yellow);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .drawer-header h2 {
      font-size: 1.3rem;
      font-weight: 800;
      font-family: var(--font-code);
    }

    .btn-close {
      background: #fff;
      border: 2px solid var(--border);
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 800;
      width: 34px;
      height: 34px;
      cursor: pointer;
      box-shadow: 2px 2px 0 var(--border);
    }
    .btn-close:active {
      transform: translate(2px, 2px);
      box-shadow: none;
    }

    .drawer-content {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .kid-explainer {
      background: #fefce8;
      border: 2px solid #ca8a04;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .kid-explainer strong.hand {
      font-family: var(--font-hand);
      font-size: 1.6rem;
      display: block;
      color: #854d0e;
      margin-bottom: 4px;
    }

    .table-container {
      overflow-x: auto;
      border: 2px solid var(--border);
      border-radius: 10px;
      box-shadow: 3px 3px 0 var(--border);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
      background: #fff;
      text-align: left;
    }

    th {
      background: #f4f4f5;
      padding: 10px 14px;
      font-weight: 800;
      border-bottom: 2px solid var(--border);
      color: #27272a;
    }

    td {
      padding: 12px 14px;
      border-bottom: 1px solid #e4e4e7;
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    td code {
      font-family: var(--font-code);
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #0f172a;
      display: inline-block;
    }

    .real-life-box {
      border-left: 4px solid var(--c-purple);
      background: #faf5ff;
      padding: 10px 14px;
      border-radius: 0 8px 8px 0;
      font-size: 0.88rem;
    }
    .real-life-box b {
      color: #6b21a8;
    }

    .quiz-card {
      background: #f0fdf4;
      border: 2px solid #16a34a;
      border-radius: 12px;
      padding: 16px 20px;
      box-shadow: 3px 3px 0 #16a34a;
    }

    .quiz-card h3 {
      font-family: var(--font-hand);
      font-size: 1.7rem;
      color: #15803d;
      margin-bottom: 8px;
    }

    .quiz-question {
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 12px;
    }

    .quiz-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .quiz-option {
      background: #ffffff;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 0.88rem;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s;
    }

    .quiz-option:hover {
      background: #dcfce7;
      transform: translateX(4px);
    }

    .quiz-feedback {
      margin-top: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      display: none;
      padding: 8px 12px;
      border-radius: 6px;
    }
    .quiz-feedback.success {
      display: block;
      background: #bbf7d0;
      color: #14532d;
    }
    .quiz-feedback.error {
      display: block;
      background: #fecaca;
      color: #7f1d1d;
    }
  </style>
</head>
<body>

  <div class="top-bar">
    <h1>🎨 Mapa Mental: Blog en Astro</h1>
    <span class="pill">Desplegable en GitHub Pages</span>
  </div>

  <div class="controls-hint">
    💡 Arrastra el fondo para moverte • Rueda para Zoom • Haz clic en un nodo para inspeccionarlo
  </div>

  <div id="viewport">
    <div id="world">
      <svg id="connections-layer"></svg>
      <div id="nodes-container"></div>
    </div>
  </div>

  <div class="drawer-overlay" id="drawerOverlay">
    <div class="drawer">
      <div class="drawer-header" id="drawerHeader">
        <h2 id="modalFileTitle">archivo.ext</h2>
        <button class="btn-close" id="btnClose">✕</button>
      </div>
      <div class="drawer-content">
        <div class="kid-explainer">
          <strong class="hand" id="modalKidTitle">¿Qué hace este archivo?</strong>
          <p id="modalKidSummary">Resumen fácil sin tecnicismos raros.</p>
        </div>

        <div class="real-life-box">
          <b>🎯 Imagínalo en el mundo real:</b> <span id="modalRealLife">Analogía de Lego/Minecraft.</span>
        </div>

        <h3 style="font-weight: 800; font-size: 1.05rem;">🔍 Desglose línea por línea / bloque:</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 32%;">Código clave</th>
                <th style="width: 38%;">¿Qué significa?</th>
                <th style="width: 30%;">Ejemplo / Impacto</th>
              </tr>
            </thead>
            <tbody id="modalTableBody"></tbody>
          </table>
        </div>

        <div class="quiz-card">
          <h3>🎮 Reto Ninja de Programación</h3>
          <p class="quiz-question" id="quizQuestion">Pregunta...</p>
          <div class="quiz-options" id="quizOptions"></div>
          <div class="quiz-feedback" id="quizFeedback"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const PROJECT_NODES = ${jsonNodes};

    const nodesContainer = document.getElementById('nodes-container');
    const svgLayer = document.getElementById('connections-layer');

    function renderNodes() {
      nodesContainer.innerHTML = '';
      PROJECT_NODES.forEach(node => {
        const el = document.createElement('div');
        el.className = 'node';
        el.id = 'node-' + node.id;
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';

        const colorBg = node.color.startsWith('#') ? node.color : 'var(' + node.color + ')';

        el.innerHTML = \`
          <div class="node-header">
            <span class="node-tag" style="background: \${colorBg}">\${node.tag}</span>
            <span>📄</span>
          </div>
          <div class="node-title">\${node.name}</div>
          <div class="node-desc">\${node.desc}</div>
          <span class="node-badge">\${node.badge}</span>
        \`;

        el.addEventListener('click', () => {
          if (!hasDragged) {
            openInspector(node);
          }
        });

        makeNodeDraggable(el, node);
        nodesContainer.appendChild(el);
      });

      renderConnections();
    }

    function renderConnections() {
      svgLayer.innerHTML = '';
      PROJECT_NODES.forEach(source => {
        if (!source.connections) return;
        source.connections.forEach(targetId => {
          const target = PROJECT_NODES.find(n => n.id === targetId);
          if (!target) return;

          const x1 = source.x + 125;
          const y1 = source.y + 65;
          const x2 = target.x + 125;
          const y2 = target.y + 65;

          const dx = (x2 - x1) * 0.5;
          const pathD = \`M \${x1} \${y1} C \${x1 + dx} \${y1}, \${x2 - dx} \${y2}, \${x2} \${y2}\`;

          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', pathD);
          path.setAttribute('class', 'wire');
          svgLayer.appendChild(path);
        });
      });
    }

    const viewport = document.getElementById('viewport');
    const world = document.getElementById('world');

    let panX = 60;
    let panY = 60;
    let zoom = 0.95;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let hasDragged = false;

    function updateTransform() {
      world.style.transform = \`translate(\${panX}px, \${panY}px) scale(\${zoom})\`;
    }
    updateTransform();

    viewport.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.node')) return;
      isPanning = true;
      hasDragged = false;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      viewport.classList.add('grabbing');
    });

    window.addEventListener('pointermove', (e) => {
      if (!isPanning) return;
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      if (Math.abs(newX - panX) > 4 || Math.abs(newY - panY) > 4) {
        hasDragged = true;
      }
      panX = newX;
      panY = newY;
      updateTransform();
    });

    window.addEventListener('pointerup', () => {
      isPanning = false;
      viewport.classList.remove('grabbing');
    });

    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = 1.1;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const oldZoom = zoom;
      if (e.deltaY < 0) {
        zoom = Math.min(zoom * zoomFactor, 2.2);
      } else {
        zoom = Math.max(zoom / zoomFactor, 0.4);
      }

      panX = mouseX - (mouseX - panX) * (zoom / oldZoom);
      panY = mouseY - (mouseY - panY) * (zoom / oldZoom);
      updateTransform();
    }, { passive: false });

    function makeNodeDraggable(element, nodeData) {
      let isNodeDragging = false;
      let nodeStartX = 0;
      let nodeStartY = 0;

      element.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        isNodeDragging = true;
        hasDragged = false;
        nodeStartX = e.clientX - (nodeData.x * zoom);
        nodeStartY = e.clientY - (nodeData.y * zoom);
        element.style.zIndex = '30';
      });

      window.addEventListener('pointermove', (e) => {
        if (!isNodeDragging) return;
        hasDragged = true;
        nodeData.x = (e.clientX - nodeStartX) / zoom;
        nodeData.y = (e.clientY - nodeStartY) / zoom;
        element.style.left = nodeData.x + 'px';
        element.style.top = nodeData.y + 'px';
        renderConnections();
      });

      window.addEventListener('pointerup', () => {
        if (!isNodeDragging) return;
        isNodeDragging = false;
        element.style.zIndex = '10';
      });
    }

    const drawerOverlay = document.getElementById('drawerOverlay');
    const btnClose = document.getElementById('btnClose');
    const modalFileTitle = document.getElementById('modalFileTitle');
    const modalKidTitle = document.getElementById('modalKidTitle');
    const modalKidSummary = document.getElementById('modalKidSummary');
    const modalRealLife = document.getElementById('modalRealLife');
    const modalTableBody = document.getElementById('modalTableBody');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const drawerHeader = document.getElementById('drawerHeader');

    function openInspector(node) {
      modalFileTitle.textContent = node.name;
      const colorBg = node.color.startsWith('#') ? node.color : 'var(' + node.color + ')';
      drawerHeader.style.background = colorBg;
      modalKidTitle.textContent = '¿Qué hace ' + node.name + '? (' + node.kidTitle + ')';
      modalKidSummary.textContent = node.kidSummary;
      modalRealLife.textContent = node.realLife;

      modalTableBody.innerHTML = '';
      node.breakdown.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><code>\${escapeHtml(row.code)}</code></td>
          <td>\${row.meaning}</td>
          <td><small style="color:#0369a1; font-weight:600;">\${row.example}</small></td>
        \`;
        modalTableBody.appendChild(tr);
      });

      quizQuestion.textContent = node.quiz.q;
      quizFeedback.className = 'quiz-feedback';
      quizFeedback.style.display = 'none';
      quizOptions.innerHTML = '';

      node.quiz.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => {
          if (opt.correct) {
            quizFeedback.className = 'quiz-feedback success';
            quizFeedback.innerHTML = '🎉 <b>¡CORRECTO!</b> ' + opt.note;
          } else {
            quizFeedback.className = 'quiz-feedback error';
            quizFeedback.innerHTML = '❌ <b>PIÉNSALO DE NUEVO:</b> ' + opt.note;
          }
        });
        quizOptions.appendChild(btn);
      });

      drawerOverlay.classList.add('open');
    }

    function closeInspector() {
      drawerOverlay.classList.remove('open');
    }

    btnClose.addEventListener('click', closeInspector);
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeInspector();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeInspector();
    });

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    renderNodes();
  </script>
</body>
</html>`;
}
