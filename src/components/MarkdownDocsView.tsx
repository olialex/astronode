import React, { useState } from 'react';
import { PILLARS_DOCS } from '../data/projectData';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  FolderTree, 
  Github, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const MarkdownDocsView: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('intro');
  const [copiedDoc, setCopiedDoc] = useState(false);

  const fullMarkdownDocument = `# 📘 Astro Explorer — Guía de Estudio y Arquitectura del Blog

Este documento contiene la explicación pedagógica completa de la arquitectura del blog en Astro para desplegar en GitHub Pages.

---

## 📂 Estructura General de Carpetas
\`\`\`
/
├── package.json              # Manifiesto de dependencias y scripts de terminal
├── sitio.js                  # El centro de mando: títulos, autor, colores y ajustes
├── astro.config.mjs          # Configuración del motor Astro
├── src/
│   ├── content/
│   │   ├── config.ts         # Esquemas estrictos de validación con Zod
│   │   └── blog/             # Artículos en formato Markdown (.md)
│   ├── layouts/
│   │   └── Base.astro        # Cascarón global HTML con <slot />
│   ├── pages/
│   │   ├── index.astro       # Portada principal con destacados y hero
│   │   └── articulo/
│   │       └── [slug].astro  # Plantilla de ruta dinámica para cada artículo
│   ├── components/
│   │   ├── ComicReader.astro # Lector manga / webtoon con eventos de teclado
│   │   └── Foto.astro        # Reescalado WebP y srcset automático
│   └── styles/
│       ├── global.css        # Variables CSS, reset y temas
│       └── cards.css         # CSS Grid y efecto hover de tarjetas
└── panel/
    ├── index.html            # Panel de administración ligero en Vanilla JS
    └── servidor.mjs          # Mini-servidor local Node para guardar cambios
\`\`\`

---

${PILLARS_DOCS.map(
  (p) => `## ${p.number}. ${p.title}
*${p.sub}*

${p.content}
`
).join('\n---\n\n')}

---

## 🚀 Despliegue en GitHub Pages (Paso a Paso)

1. **Crear repositorio en GitHub**:
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: mi blog interactivo en Astro"
   git remote add origin https://github.com/TU_USUARIO/mi-blog-astro.git
   git push -u origin main
   \`\`\`

2. **Configurar Astro para GitHub Pages**:
   En \`astro.config.mjs\`:
   \`\`\`javascript
   import { defineConfig } from 'astro/config';
   export default defineConfig({
     site: 'https://TU_USUARIO.github.io',
     base: '/mi-blog-astro' // Nombre del repositorio
   });
   \`\`\`

3. **Activar GitHub Actions**:
   Ve a **Settings > Pages > Build and deployment > Source** y selecciona **GitHub Actions**. Astro se compilará y desplegará automáticamente.
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownDocument);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([fullMarkdownDocument], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DOCUMENTACION-ASTRO-BLOG.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden flex flex-col md:flex-row bg-[#f8f8f6]">
      {/* Sidebar de Navegación de Secciones */}
      <aside className="w-full md:w-80 border-r-2 border-[#27272a] bg-white p-4 flex flex-col gap-4 shrink-0 overflow-y-auto">
        <div className="border-b-2 border-[#27272a] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#27272a]" />
            <h2 className="text-base font-extrabold font-mono">Índice de la Guía</h2>
          </div>
          <p className="text-xs text-[#64646e]">
            Aprende los 5 pilares arquitectónicos del blog paso a paso.
          </p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setSelectedSection('intro')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              selectedSection === 'intro'
                ? 'bg-[#fde047] text-[#18181b] border-2 border-[#27272a] shadow-[2px_2px_0_#27272a]'
                : 'text-[#64646e] hover:bg-neutral-100 hover:text-[#18181b]'
            }`}
          >
            <span>00. Introducción & Arquitectura</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {PILLARS_DOCS.map((pillar) => (
            <button
              key={pillar.number}
              onClick={() => setSelectedSection(pillar.number)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                selectedSection === pillar.number
                  ? 'bg-[#60a5fa] text-white border-2 border-[#27272a] shadow-[2px_2px_0_#27272a]'
                  : 'text-[#64646e] hover:bg-neutral-100 hover:text-[#18181b]'
              }`}
            >
              <span className="truncate">{pillar.number}. {pillar.title}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ))}

          <button
            onClick={() => setSelectedSection('deploy')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              selectedSection === 'deploy'
                ? 'bg-[#4ade80] text-[#18181b] border-2 border-[#27272a] shadow-[2px_2px_0_#27272a]'
                : 'text-[#64646e] hover:bg-neutral-100 hover:text-[#18181b]'
            }`}
          >
            <span>06. Despliegue en GitHub Pages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Botones de Exportar Documento */}
        <div className="mt-auto pt-4 border-t-2 border-[#27272a] space-y-2">
          <button
            onClick={handleCopyMarkdown}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-extrabold bg-white border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-neutral-50 cursor-pointer"
          >
            {copiedDoc ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">¡Markdown Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Todo en Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-extrabold bg-[#fde047] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-[#facc15] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar DOCUMENTACION.md</span>
          </button>
        </div>
      </aside>

      {/* Contenido Principal de Lectura */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto space-y-8 select-text">
        {selectedSection === 'intro' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#27272a] pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wide bg-[#fde047] px-2 py-0.5 rounded border border-[#27272a]">
                Manual Oficial de Estudio
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-[#18181b] mt-2">
                Astro Explorer: Arquitectura del Blog Estático
              </h1>
              <p className="text-sm text-[#64646e] mt-1">
                Aprende cómo construir una web moderna, rápida y sin sobrecarga de frameworks para desplegar gratis en GitHub Pages.
              </p>
            </div>

            {/* Banner pedagógico */}
            <div className="bg-[#fefce8] border-2 border-[#ca8a04] rounded-xl p-5 shadow-[3px_3px_0_#ca8a04]/30">
              <h3 className="font-['Caveat',cursive] text-2xl font-bold text-[#854d0e] mb-1">
                ¿Por qué Astro para un blog?
              </h3>
              <p className="text-sm text-[#713f12] leading-relaxed">
                A diferencia de React puro o Next.js tradicional, Astro genera <b>HTML estático puro</b>. No envía JavaScript innecesario a los lectores, logrando una velocidad de carga perfecta de 100/100 en Google PageSpeed. Puedes escribir tus historias en simples archivos <code>.md</code> (Markdown) y el compilador se encarga de crear páginas ultrarrápidas con SEO optimizado.
              </p>
            </div>

            {/* Árbol de Directorios */}
            <div className="bg-white border-2 border-[#27272a] rounded-xl p-5 shadow-[4px_4px_0_#27272a]">
              <div className="flex items-center gap-2 mb-3">
                <FolderTree className="w-4 h-4 text-[#27272a]" />
                <h3 className="text-sm font-extrabold font-mono">Mapa de Carpetas del Proyecto</h3>
              </div>
              <pre className="p-4 bg-[#18181b] text-neutral-200 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-[#27272a]">
{`/
├── package.json              # La receta: librerías, scripts pnpm dev y build
├── sitio.js                  # Centro de control: nombre, autor, colores y tags
├── src/
│   ├── content/
│   │   ├── config.ts         # Guardián de seguridad con esquemas Zod
│   │   └── blog/             # Tus posts en Markdown (.md)
│   ├── layouts/
│   │   └── Base.astro        # El molde con el <slot /> de contenido
│   ├── pages/
│   │   ├── index.astro       # Portada de la tienda/revista
│   │   └── articulo/[slug].astro  # El clonador dinámico de páginas
│   ├── components/
│   │   ├── ComicReader.astro # Lector manga con atajos de teclado
│   │   └── Foto.astro        # Compresor turbo que genera WebP
│   └── styles/
│       ├── global.css        # Variables de diseño y física visual
│       └── cards.css         # Grid estilo Pinterest de tarjetas
└── panel/
    └── index.html            # Editor visual ligero sin React`}
              </pre>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSection('01')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold bg-[#60a5fa] text-white border-2 border-[#27272a] rounded-xl shadow-[3px_3px_0_#27272a] hover:bg-[#3b82f6] cursor-pointer"
              >
                <span>Siguiente: 01. La Caja Negra (package.json)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Secciones de los 5 Pilares */}
        {PILLARS_DOCS.map((pillar) => {
          if (selectedSection !== pillar.number) return null;
          return (
            <div key={pillar.number} className="space-y-6">
              <div className="border-b-2 border-[#27272a] pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wide bg-[#60a5fa] text-white px-2 py-0.5 rounded border border-[#27272a]">
                  Pilar Arquitectónico {pillar.number}
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-[#18181b] mt-2">
                  {pillar.title}
                </h1>
                <p className="text-sm text-[#64646e] mt-1 font-medium">
                  {pillar.sub}
                </p>
              </div>

              <div className="bg-white border-2 border-[#27272a] rounded-xl p-6 shadow-[4px_4px_0_#27272a] prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                {pillar.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={pIdx} className="text-base font-extrabold font-mono text-[#18181b] pt-2 border-t border-neutral-100">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const code = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                    return (
                      <pre key={pIdx} className="p-3.5 bg-[#18181b] text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto border border-[#27272a]">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-[#3f3f46]">
                      {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  );
                })}
              </div>

              {/* Botón de Siguiente Sección */}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() => {
                    const currIdx = PILLARS_DOCS.findIndex(p => p.number === pillar.number);
                    if (currIdx === 0) setSelectedSection('intro');
                    else setSelectedSection(PILLARS_DOCS[currIdx - 1].number);
                  }}
                  className="px-4 py-2 text-xs font-bold border-2 border-[#27272a] rounded-xl bg-white hover:bg-neutral-100 cursor-pointer"
                >
                  ← Sección Anterior
                </button>
                <button
                  onClick={() => {
                    const currIdx = PILLARS_DOCS.findIndex(p => p.number === pillar.number);
                    if (currIdx < PILLARS_DOCS.length - 1) {
                      setSelectedSection(PILLARS_DOCS[currIdx + 1].number);
                    } else {
                      setSelectedSection('deploy');
                    }
                  }}
                  className="px-4 py-2 text-xs font-extrabold bg-[#60a5fa] text-white border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-[#3b82f6] cursor-pointer"
                >
                  Siguiente Sección →
                </button>
              </div>
            </div>
          );
        })}

        {/* Sección 06: Despliegue en GitHub Pages */}
        {selectedSection === 'deploy' && (
          <div className="space-y-6">
            <div className="border-b-2 border-[#27272a] pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wide bg-[#4ade80] text-[#18181b] px-2 py-0.5 rounded border border-[#27272a]">
                Paso Final
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold font-mono text-[#18181b] mt-2">
                06. Despliegue en GitHub Pages
              </h1>
              <p className="text-sm text-[#64646e] mt-1">
                Publica tu blog gratuitamente para todo el mundo con certificado SSL automático.
              </p>
            </div>

            <div className="bg-white border-2 border-[#27272a] rounded-xl p-6 shadow-[4px_4px_0_#27272a] space-y-6 text-sm">
              <div>
                <h3 className="font-extrabold font-mono text-base mb-2 flex items-center gap-2">
                  <Github className="w-5 h-5 text-[#27272a]" />
                  <span>Paso 1: Sube el código a GitHub</span>
                </h3>
                <p className="text-[#64646e] mb-3">
                  Crea un repositorio público o privado en github.com y empuja tus archivos:
                </p>
                <pre className="p-3 bg-[#18181b] text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto border border-[#27272a]">
{`git init
git add .
git commit -m "feat: blog astro listo para publicar"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mi-blog.git
git push -u origin main`}
                </pre>
              </div>

              <div>
                <h3 className="font-extrabold font-mono text-base mb-2">
                  Paso 2: Configurar astro.config.mjs
                </h3>
                <p className="text-[#64646e] mb-3">
                  Asegúrate de que Astro conozca el dominio y la subruta de GitHub Pages:
                </p>
                <pre className="p-3 bg-[#18181b] text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto border border-[#27272a]">
{`// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://TU_USUARIO.github.io',
  base: '/mi-blog' // Reemplaza con el nombre de tu repo
});`}
                </pre>
              </div>

              <div>
                <h3 className="font-extrabold font-mono text-base mb-2">
                  Paso 3: Activar GitHub Actions
                </h3>
                <p className="text-[#64646e] leading-relaxed">
                  En la pestaña <b>Settings</b> de tu repositorio de GitHub, haz clic en <b>Pages</b> en la barra lateral. En <b>Build and deployment &gt; Source</b>, elige <b>GitHub Actions</b>. GitHub detectará Astro y desplegará en 30 segundos.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
