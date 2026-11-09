import React, { useState } from 'react';
import { ProjectNode } from '../types';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileCode, 
  Globe, 
  FolderArchive, 
  Terminal, 
  Github, 
  ExternalLink 
} from 'lucide-react';

interface ExportModalProps {
  nodes: ProjectNode[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ nodes, onClose }) => {
  const [activeTab, setActiveTab] = useState<'zip' | 'html'>('zip');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const standaloneHtml = generateStandaloneHtml(nodes);

  const gitPushScript = `# 1. En la carpeta donde descomprimiste el zip:
git init
git add .
git commit -m "feat: mi proyecto astro explorer"
git branch -M main

# 2. Conecta con tu repositorio de GitHub (reemplaza TU_USUARIO y TU_REPO):
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main`;

  const handleDownloadHtml = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tablero-blog.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(standaloneHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyGitCommands = () => {
    navigator.clipboard.writeText(gitPushScript);
    setCopiedGitCmd(true);
    setTimeout(() => setCopiedGitCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-3 border-[#27272a] rounded-2xl shadow-[8px_8px_0_#27272a] max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#27272a] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#4ade80] border-2 border-[#27272a] flex items-center justify-center shadow-[2px_2px_0_#27272a]">
              <FolderArchive className="w-5 h-5 text-[#18181b]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wide bg-[#fde047] px-2 py-0.5 rounded border border-[#27272a]">
                Descargas y Git Push
              </span>
              <h3 className="text-xl font-extrabold font-mono text-[#18181b]">
                Descargar Código y Hacer Push
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-[#27272a] rounded-lg font-bold hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pestañas de Selección */}
        <div className="flex items-center gap-2 mb-5 p-1 bg-neutral-100 rounded-xl border-2 border-[#27272a]">
          <button
            onClick={() => setActiveTab('zip')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'zip'
                ? 'bg-white text-[#18181b] border-2 border-[#27272a] shadow-[2px_2px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b]'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-[#16a34a]" />
            <span>Proyecto Completo (.ZIP)</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'html'
                ? 'bg-white text-[#18181b] border-2 border-[#27272a] shadow-[2px_2px_0_#27272a]'
                : 'text-[#64646e] hover:text-[#18181b]'
            }`}
          >
            <Globe className="w-4 h-4 text-[#2563eb]" />
            <span>Página Única (tablero-blog.html)</span>
          </button>
        </div>

        {activeTab === 'zip' ? (
          /* PESTAÑA: DESCARGA ZIP & COMANDOS GIT PUSH */
          <div className="space-y-4">
            {/* Tarjeta de Descarga Directa del ZIP */}
            <div className="bg-[#f0fdf4] border-2 border-[#16a34a] rounded-xl p-5 shadow-[3px_3px_0_#16a34a]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-base text-[#14532d] flex items-center gap-2">
                    <span>📦</span>
                    <span>astro-explorer-proyecto.zip</span>
                  </h4>
                  <p className="text-xs text-[#166534] mt-1">
                    Incluye todo el código fuente: Vite, React, TypeScript, componentes, estilos, tests, documentación y scripts de terminal.
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded border border-[#86efac]">
                    Tamaño: ~82 KB · Listo para descomprimir y usar
                  </span>
                </div>

                <a
                  href="/astro-explorer-proyecto.zip"
                  download="astro-explorer-proyecto.zip"
                  className="flex items-center justify-center gap-2 px-5 py-3 text-xs md:text-sm font-extrabold bg-[#22c55e] hover:bg-[#16a34a] text-white border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] shrink-0 text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar ZIP Ahora</span>
                </a>
              </div>
            </div>

            {/* Guía de terminal para Git Push */}
            <div className="bg-white border-2 border-[#27272a] rounded-xl p-4 shadow-[3px_3px_0_#27272a] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#27272a]" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wide font-mono">
                    Comandos para hacer push en tu PC
                  </h4>
                </div>
                <button
                  onClick={handleCopyGitCommands}
                  className="flex items-center gap-1 text-xs font-bold text-[#18181b] hover:text-black bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-lg border border-[#27272a] cursor-pointer"
                >
                  {copiedGitCmd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar comandos</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 bg-[#18181b] text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-[#27272a]">
                <code>{gitPushScript}</code>
              </pre>

              <div className="text-[11px] text-[#64646e] flex items-center gap-1.5 font-medium">
                <Github className="w-3.5 h-3.5 text-[#27272a]" />
                <span>
                  Recuerda crear antes el repositorio en <b>github.com/new</b> para obtener tu URL remota.
                </span>
              </div>
            </div>

            {/* Paso a paso de cómo abrirlo en tu PC */}
            <div className="bg-neutral-50 border-2 border-[#27272a] rounded-xl p-4 text-xs space-y-1.5 text-[#3f3f46]">
              <span className="font-bold text-[#18181b] block">💡 Para probarlo en local en tu computadora:</span>
              <p>1. Descomprime el archivo <code>.zip</code> en cualquier carpeta de tu disco.</p>
              <p>2. Abre la terminal en esa carpeta y ejecuta: <code>npm install</code> (o <code>pnpm install</code>).</p>
              <p>3. Inicia el servidor local: <code>npm run dev</code> y abre <b>http://localhost:3000</b>.</p>
            </div>
          </div>
        ) : (
          /* PESTAÑA: ARCHIVO AUTÓNOMO tablero-blog.html */
          <div className="space-y-4">
            <div className="bg-[#fefce8] border-2 border-[#ca8a04] rounded-xl p-4 text-xs text-[#713f12]">
              <h4 className="font-['Caveat',cursive] text-xl font-bold text-[#854d0e] mb-1">
                ¿Qué es tablero-blog.html?
              </h4>
              <p className="leading-relaxed font-medium">
                Es una versión de <b>un solo archivo HTML</b> sin necesidad de Node.js ni servidor. Puedes abrirlo con doble clic en cualquier explorador o renombrarlo a <code>index.html</code> para publicarlo en GitHub Pages directamente.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadHtml}
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-extrabold bg-[#fb923c] hover:bg-[#f97316] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                <Download className="w-4 h-4" />
                <span>Descargar tablero-blog.html</span>
              </button>

              <button
                onClick={handleCopyHtml}
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-extrabold bg-white hover:bg-neutral-50 text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] cursor-pointer"
              >
                {copiedHtml ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">¡HTML Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Código HTML</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 border-t border-[#27272a]/20 flex items-center justify-between">
              <button
                onClick={() => setShowCodePreview(!showCodePreview)}
                className="text-xs font-bold text-[#64646e] hover:text-[#18181b] flex items-center gap-1 cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{showCodePreview ? 'Ocultar vista previa HTML' : 'Ver código HTML embebido'}</span>
              </button>
            </div>

            {showCodePreview && (
              <pre className="p-3 bg-[#18181b] text-neutral-200 rounded-lg text-[10px] font-mono max-h-44 overflow-y-auto border border-[#27272a]">
                <code>{standaloneHtml.slice(0, 1500)}...</code>
              </pre>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 mt-5 border-t border-[#27272a]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold border-2 border-[#27272a] rounded-xl hover:bg-neutral-100 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
