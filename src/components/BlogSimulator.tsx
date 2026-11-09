import React, { useState } from 'react';
import { SAMPLE_POSTS } from '../data/projectData';
import { 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  ArrowLeft,
  Settings,
  Save,
  Check
} from 'lucide-react';

export const BlogSimulator: React.FC = () => {
  // Simulator state simulating sitio.js variables
  const [blogName, setBlogName] = useState('Mi Cuaderno Digital');
  const [authorName, setAuthorName] = useState('Niko Developer');
  const [themeAccent, setThemeAccent] = useState('#facc15'); // Yellow default
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

  // Comic reader state
  const [comicPageIndex, setComicPageIndex] = useState(0);
  const [comicMode, setComicMode] = useState<'paginado' | 'vertical'>('paginado');

  // Admin panel drawer state
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const currentPost = SAMPLE_POSTS.find((p) => p.slug === selectedPostSlug);

  const comicPages = [
    {
      num: 1,
      title: 'Viñeta 1: El misterio de la terminal',
      art: '🖥️ En un oscuro servidor, el comando "pnpm dev" fue invocado sin previo aviso...',
      bg: '#fef08a'
    },
    {
      num: 2,
      title: 'Viñeta 2: El punto y coma fugitivo',
      art: '🔍 ¡El linter gritó! "¡Falta un punto y coma en la línea 42!" El caos reinaba...',
      bg: '#fed7aa'
    },
    {
      num: 3,
      title: 'Viñeta 3: Zod al rescate',
      art: '🛡️ "¡Tranquilos!", dijo Zod. "El esquema valida los tipos y salva el día".',
      bg: '#bbf7d0'
    }
  ];

  const handleNextComicPage = () => {
    if (comicPageIndex < comicPages.length - 1) {
      setComicPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevComicPage = () => {
    if (comicPageIndex > 0) {
      setComicPageIndex((prev) => prev - 1);
    }
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  return (
    <div className={`w-full h-[calc(100vh-64px)] overflow-hidden flex flex-col ${
      isDarkMode ? 'bg-[#18181b] text-[#f4f4f5]' : 'bg-[#fafafa] text-[#18181b]'
    }`}>
      {/* Barra de Controles del Simulador (Muestra cómo sitio.js y Base.astro controlan la app) */}
      <div className="px-6 py-2.5 bg-white border-b-2 border-[#27272a] flex flex-wrap items-center justify-between gap-4 z-20 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <span className="font-extrabold uppercase tracking-wide bg-[#4ade80] px-2 py-0.5 rounded border border-[#27272a] text-[#18181b]">
            Simulador en Vivo de Astro
          </span>
          <span className="text-[#64646e] hidden sm:inline">
            Probando componentes: <code>sitio.js</code> + <code>Base.astro</code> + <code>[slug].astro</code> + <code>cards.css</code>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Acentos (sitio.js) */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="text-[#64646e] font-bold">Acento:</span>
            {[
              { color: '#facc15', label: 'Amarillo' },
              { color: '#f472b6', label: 'Rosa' },
              { color: '#60a5fa', label: 'Azul' },
              { color: '#4ade80', label: 'Verde' }
            ].map((c) => (
              <button
                key={c.color}
                onClick={() => setThemeAccent(c.color)}
                className={`w-5 h-5 rounded-full border border-[#27272a] transition-transform cursor-pointer ${
                  themeAccent === c.color ? 'scale-125 ring-2 ring-black' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.color }}
                title={`Acento ${c.label}`}
              />
            ))}
          </div>

          {/* Toggle Modo Oscuro (Base.astro localStorage) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-[#27272a] bg-neutral-100 hover:bg-neutral-200 font-bold cursor-pointer text-[#18181b]"
            title="Alternar Modo Claro / Oscuro"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            <span className="text-[11px]">{isDarkMode ? 'Claro' : 'Oscuro'}</span>
          </button>

          {/* Botón para abrir el panel simulado en Vanilla JS */}
          <button
            onClick={() => setShowAdminPanel(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#27272a] bg-[#fde047] hover:bg-[#facc15] font-extrabold cursor-pointer text-[#18181b] shadow-[2px_2px_0_#27272a]"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Abrir panel/index.html</span>
          </button>
        </div>
      </div>

      {/* ÁREA DE VISUALIZACIÓN DEL BLOG ASTRO */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* HEADER DEL BLOG GENERADO POR Base.astro Y sitio.js */}
          <header className={`p-6 rounded-2xl border-2 border-[#27272a] mb-8 shadow-[4px_4px_0_#27272a] transition-all ${
            isDarkMode ? 'bg-[#27272a]' : 'bg-white'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span
                  className="font-['Caveat',cursive] text-3xl font-extrabold block text-[#18181b] transition-colors"
                  style={{ color: isDarkMode ? '#f4f4f5' : '#18181b' }}
                >
                  {blogName} ✏️
                </span>
                <p className="text-xs text-[#64646e] mt-1 font-mono">
                  Por {authorName} · Desarrollado con Astro 4.16 + SSG
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedPostSlug && (
                  <button
                    onClick={() => setSelectedPostSlug(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-[#27272a] text-xs font-bold bg-white text-[#18181b] shadow-[2px_2px_0_#27272a] hover:bg-neutral-100 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Volver a Portada</span>
                  </button>
                )}
                <span
                  className="px-3 py-1 text-xs font-extrabold rounded-lg border-2 border-[#27272a] text-[#18181b]"
                  style={{ backgroundColor: themeAccent }}
                >
                  Modo Jamstack
                </span>
              </div>
            </div>
          </header>

          {/* VISTA 1: PORTADA PRINCIPAL (index.astro + cards.css) */}
          {!selectedPostSlug ? (
            <div className="space-y-8">
              {/* Hero Banner Boceto */}
              <div
                className="p-6 rounded-2xl border-2 border-[#27272a] shadow-[4px_4px_0_#27272a] relative overflow-hidden"
                style={{ backgroundColor: isDarkMode ? '#27272a' : '#fefce8' }}
              >
                <div className="max-w-xl">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#fb923c] text-white px-2 py-0.5 rounded border border-[#27272a]">
                    Hero Portada
                  </span>
                  <h2 className="text-2xl font-extrabold font-mono mt-2 mb-2">
                    ¡Bienvenidos a mi cuaderno digital!
                  </h2>
                  <p className="text-sm text-[#64646e] leading-relaxed">
                    Un espacio independiente donde comparto tiras de cómic, tutoriales de programación web y experimentos visuales.
                  </p>
                </div>
              </div>

              {/* Grid de Artículos (cards.css) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold font-mono flex items-center gap-2">
                    <span>✨</span> Artículos y Cómics Destacados
                  </h3>
                  <span className="text-xs text-[#64646e] font-mono">
                    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {SAMPLE_POSTS.map((post) => (
                    <div
                      key={post.slug}
                      onClick={() => setSelectedPostSlug(post.slug)}
                      className={`p-5 rounded-2xl border-2 border-[#27272a] shadow-[4px_4px_0_#27272a] hover:shadow-[7px_7px_0_#27272a] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between ${
                        isDarkMode ? 'bg-[#27272a]' : 'bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-[#27272a] text-[#18181b]"
                            style={{ backgroundColor: post.tipo === 'webcomic' ? '#fde047' : '#60a5fa' }}
                          >
                            {post.tipo}
                          </span>
                          <span className="text-[11px] font-mono text-[#64646e]">
                            {post.fecha}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-base font-mono mb-2 line-clamp-2">
                          {post.titulo}
                        </h4>

                        <p className="text-xs text-[#64646e] line-clamp-3 leading-relaxed mb-4">
                          {post.descripcion}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-dashed border-[#27272a]/20 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#64646e]">
                          {post.tags.map((t) => `#${t}`).join(' ')}
                        </span>
                        <span className="text-xs font-extrabold text-[#18181b] underline decoration-2">
                          Leer →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* VISTA 2: DETALLE DEL ARTÍCULO / CÓMIC ([slug].astro) */
            <div className={`p-8 rounded-2xl border-2 border-[#27272a] shadow-[4px_4px_0_#27272a] ${
              isDarkMode ? 'bg-[#27272a]' : 'bg-white'
            }`}>
              {currentPost?.tipo === 'webcomic' ? (
                /* Lector de Cómic Interactivo (ComicReader.astro) */
                <div className="space-y-6">
                  <div className="border-b-2 border-[#27272a] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#fde047] border border-[#27272a] text-[#18181b]">
                        Lector Manga / Webtoon (ComicReader.astro)
                      </span>
                      <h2 className="text-2xl font-extrabold font-mono mt-1">{currentPost.titulo}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setComicMode(comicMode === 'paginado' ? 'vertical' : 'paginado')}
                        className="px-3 py-1.5 text-xs font-bold border-2 border-[#27272a] rounded-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer text-[#18181b]"
                      >
                        Modo: {comicMode === 'paginado' ? '📖 Paginado (Flechas)' : '📜 Scroll Vertical'}
                      </button>
                    </div>
                  </div>

                  {comicMode === 'paginado' ? (
                    <div className="flex flex-col items-center gap-4">
                      {/* Viñeta actual con diseño Excalidraw */}
                      <div
                        className="w-full max-w-lg min-h-[260px] p-8 border-3 border-[#27272a] rounded-2xl shadow-[6px_6px_0_#27272a] flex flex-col items-center justify-center text-center transition-all select-none"
                        style={{ backgroundColor: comicPages[comicPageIndex].bg }}
                      >
                        <span className="font-['Caveat',cursive] text-2xl font-bold text-[#18181b] mb-4">
                          {comicPages[comicPageIndex].title}
                        </span>
                        <p className="text-base font-bold text-[#27272a] leading-relaxed max-w-sm">
                          {comicPages[comicPageIndex].art}
                        </p>
                      </div>

                      {/* Controles de Navegación del Cómic */}
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={handlePrevComicPage}
                          disabled={comicPageIndex === 0}
                          className="flex items-center gap-1 px-4 py-2 text-xs font-extrabold border-2 border-[#27272a] rounded-xl bg-white text-[#18181b] shadow-[2px_2px_0_#27272a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Anterior (←)</span>
                        </button>

                        <span className="font-mono text-xs font-extrabold px-3 py-1 bg-neutral-100 rounded-lg border border-[#27272a]">
                          Página {comicPageIndex + 1} de {comicPages.length}
                        </span>

                        <button
                          onClick={handleNextComicPage}
                          disabled={comicPageIndex === comicPages.length - 1}
                          className="flex items-center gap-1 px-4 py-2 text-xs font-extrabold border-2 border-[#27272a] rounded-xl bg-[#fde047] text-[#18181b] shadow-[2px_2px_0_#27272a] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#facc15] cursor-pointer"
                        >
                          <span>Siguiente (→)</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Modo vertical webtoon */
                    <div className="space-y-4 max-w-lg mx-auto">
                      {comicPages.map((page) => (
                        <div
                          key={page.num}
                          className="p-8 border-3 border-[#27272a] rounded-2xl shadow-[4px_4px_0_#27272a] text-center"
                          style={{ backgroundColor: page.bg }}
                        >
                          <span className="font-['Caveat',cursive] text-2xl font-bold text-[#18181b] block mb-2">
                            {page.title}
                          </span>
                          <p className="text-sm font-bold text-[#27272a] leading-relaxed">
                            {page.art}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Detalle de Artículo Tradicional ([slug].astro + Content) */
                <article className="space-y-6">
                  <div className="border-b-2 border-[#27272a] pb-4">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#60a5fa] text-white border border-[#27272a]">
                      Renderizado con [slug].astro
                    </span>
                    <h2 className="text-3xl font-extrabold font-mono mt-2 mb-2">
                      {currentPost?.titulo}
                    </h2>
                    <p className="text-xs text-[#64646e] font-mono">
                      Publicado el {currentPost?.fecha} · Lectura de 3 min
                    </p>
                  </div>

                  <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                    <p className="text-base font-medium">
                      {currentPost?.descripcion}
                    </p>
                    <p className="text-[#64646e]">
                      {currentPost?.contenido}
                    </p>
                    <div className="p-4 bg-neutral-100 rounded-xl border border-[#27272a] text-xs font-mono">
                      💡 <b>Detalle Técnico:</b> Este texto proviene directamente del frontmatter y cuerpo Markdown (<code>.md</code>) validado en <code>src/content/config.ts</code> con Zod.
                    </div>
                  </div>
                </article>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PANEL DE ADMINISTRACIÓN MODAL (Simula panel/index.html) */}
      {showAdminPanel && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#18181b] border-3 border-[#27272a] rounded-2xl shadow-[8px_8px_0_#27272a] max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 border-b-2 border-[#27272a] pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#fb923c] text-white border border-[#27272a]">
                  Vanilla JS + Node Server
                </span>
                <h3 className="text-lg font-extrabold font-mono mt-1">
                  panel/index.html (Panel de Control)
                </h3>
              </div>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="w-7 h-7 flex items-center justify-center border-2 border-[#27272a] rounded-lg font-bold hover:bg-neutral-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#64646e] mb-4">
              Este panel demuestra cómo editar <code>sitio.js</code> y publicar cambios sin depender de librerías complejas. Edita los campos abajo para ver cómo el blog en vivo se actualiza instantáneamente.
            </p>

            <form onSubmit={handleSaveAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1">
                  Nombre del Blog (sitio.nombre):
                </label>
                <input
                  type="text"
                  value={blogName}
                  onChange={(e) => setBlogName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-[#27272a] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#fde047]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1">
                  Nombre del Autor (sitio.autor):
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border-2 border-[#27272a] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#fde047]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#27272a]/20">
                <span className="text-[11px] text-[#64646e] font-mono">
                  Auto-guardado con localStorage
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminPanel(false)}
                    className="px-4 py-2 text-xs font-bold border-2 border-[#27272a] rounded-xl hover:bg-neutral-100 cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-[#4ade80] text-[#18181b] border-2 border-[#27272a] rounded-xl shadow-[2px_2px_0_#27272a] hover:bg-[#22c55e] cursor-pointer"
                  >
                    {draftSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Guardado!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Guardar en sitio.js</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
