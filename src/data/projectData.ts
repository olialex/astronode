import { ProjectNode } from '../types';

export const INITIAL_NODES: ProjectNode[] = [
  {
    id: "package_json",
    x: 100,
    y: 140,
    color: "#fb923c", // orange
    category: "config",
    tag: "Configuración Base",
    name: "package.json",
    desc: "La lista de compras y herramientas del proyecto.",
    badge: "📦 Caja de herramientas",
    kidTitle: "El inventario de tu mochila escolar",
    kidSummary: "Aquí no hay código de diseño ni textos del blog. Es un archivo que le dice a tu computadora qué librerías descargar de internet (Astro, Sharp para comprimir fotos, Markdown para escribir) y qué palabras clave ejecutar en la terminal (como 'pnpm dev').",
    realLife: "Es como la receta de un pastel antes de cocinar: dice 'necesitamos 3 huevos y harina'. Sin este archivo, la computadora no sabría qué programas instalar.",
    connections: ["sitio_js", "config_ts"],
    breakdown: [
      {
        code: `"scripts": { "dev": "astro dev" }`,
        meaning: "Atajo de terminal. Cuando escribes 'pnpm dev', la computadora arranca el servidor local en tu navegador.",
        example: "Permite ver tu blog en vivo en http://localhost:4321 mientras escribes."
      },
      {
        code: `"dependencies": { "astro": "^4.16.18" }`,
        meaning: "El motor principal. Astro es el framework que junta HTML, CSS y Markdown en páginas web ultra rápidas.",
        example: "Sin esto, el navegador solo vería archivos de texto sueltos."
      },
      {
        code: `"sharp": "^0.35.5"`,
        meaning: "Un transformador supersónico de imágenes. Convierte fotos pesadas (.png/.jpg) a formato .webp ligero al vuelo.",
        example: "Hace que una foto de 8MB de tu cámara pese 100KB sin perder nitidez."
      }
    ],
    quiz: {
      q: "Si quieres probar cómo se ve tu blog en tu computadora antes de publicarlo, ¿qué comando de package.json ejecutas?",
      options: [
        { text: "pnpm build", correct: false, note: "Build genera los archivos finales para publicar en internet, no para editar en vivo." },
        { text: "pnpm dev", correct: true, note: "¡Correcto! 'dev' enciende el motor de desarrollo en localhost:4321." },
        { text: "pnpm clean", correct: false, note: "Ese script no está en el proyecto." }
      ]
    },
    fullCodePreview: `{
  "name": "mi-blog-astro",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.16.18",
    "sharp": "^0.35.5"
  },
  "devDependencies": {
    "@types/node": "^20.11.0"
  }
}`
  },
  {
    id: "sitio_js",
    x: 430,
    y: 110,
    color: "#fde047", // yellow
    category: "config",
    tag: "El Cerebro",
    name: "sitio.js",
    desc: "El centro de mando: colores, títulos, autor y redes.",
    badge: "🧠 Centro de control",
    kidTitle: "La hoja de ajustes de tu personaje",
    kidSummary: "En lugar de tener que abrir 30 archivos diferentes para cambiar tu nombre, tu foto o los colores del blog, TODO se escribe aquí en un solo lugar. Si cambias el color aquí, cambia en todo el sitio web como por arte de magia.",
    realLife: "Como el menú de personalización de un videojuego: cambias el color de tu armadura y todos los trajes se actualizan solos.",
    connections: ["base_astro", "index_astro", "panel_index"],
    breakdown: [
      {
        code: `nombre: 'Mi Cuaderno Digital'`,
        meaning: "El título general que aparecerá en la pestaña del navegador y en el logo de arriba.",
        example: "Cámbialo a 'El Rincón Gamer' y todo el encabezado se actualizará."
      },
      {
        code: `tema: { acentos: { amarillo: '#facc15' } }`,
        meaning: "Define la paleta de colores. Le da nombres amigables a códigos hexadecimales.",
        example: "Un tag con color 'amarillo' tomará automáticamente el tono exacto puesto aquí."
      },
      {
        code: `home: { cantidadDestacados: 3 }`,
        meaning: "Número máximo de tarjetas de artículos gigantes que se muestran al inicio.",
        example: "Si pones 1, solo se verá un artículo estelar en la portada."
      }
    ],
    quiz: {
      q: "¿Qué ventaja tiene guardar todo en 'sitio.js' en lugar de escribir los textos directo en el HTML?",
      options: [
        { text: "Hace que la computadora funcione a más gigahertz.", correct: false, note: "No cambia la velocidad del procesador." },
        { text: "Centraliza la configuración: cambias un dato en 1 segundo sin tocar código delicado.", correct: true, note: "¡Exacto! Evita errores y hace que cualquiera pueda personalizar el blog." },
        { text: "Obliga a que solo funcione en Google Chrome.", correct: false, note: "Astro funciona en todos los navegadores modernos." }
      ]
    },
    fullCodePreview: `export default {
  nombre: 'Mi Cuaderno Digital',
  descripcion: 'Historias, cómics y notas de desarrollo.',
  autor: 'Niko Developer',
  url: 'https://mi-blog.github.io',
  idioma: 'es',
  tema: {
    colorPrimario: '#facc15',
    fuenteTitulos: 'Caveat',
    acentos: {
      amarillo: '#facc15',
      rosa: '#f472b6',
      azul: '#60a5fa',
      verde: '#4ade80'
    }
  },
  home: {
    cantidadDestacados: 3,
    mostrarStickers: true
  }
};`
  },
  {
    id: "config_ts",
    x: 100,
    y: 450,
    color: "#c084fc", // purple
    category: "estructura",
    tag: "Seguridad y Reglas",
    name: "src/content/config.ts",
    desc: "Define qué datos son obligatorios en cada artículo.",
    badge: "🛡️ Guardia de seguridad",
    kidTitle: "El inspector que revisa tus tareas",
    kidSummary: "Usa una librería llamada Zod. Revisa tus artículos de Markdown (.md). Si se te olvidó ponerle fecha o título a un post, este archivo detiene la construcción y te avisa: '¡Oye, te falta la fecha!', evitando que tu blog se rompa con errores feos.",
    realLife: "Como un guardia en la entrada de una montaña rusa: si no mides 1.40m (si falta un campo obligatorio), no te deja pasar.",
    connections: ["articulo_slug", "comic_reader"],
    breakdown: [
      {
        code: `titulo: z.string()`,
        meaning: "Exige que cada artículo tenga un título y que sea obligatoriamente texto (letras).",
        example: "Si dejas 'titulo:' vacío o pones un número raro, te dará error antes de publicar."
      },
      {
        code: `fecha: z.coerce.date()`,
        meaning: "Convierte cualquier fecha escrita como '2026-11-01' en un objeto Date real de JavaScript.",
        example: "Permite ordenar los artículos del más nuevo al más viejo automáticamente."
      },
      {
        code: `tipo: z.enum(['articulo', 'webcomic', 'novela'])`,
        meaning: "Solo permite una de esas tres opciones exactas. Nada inventado.",
        example: "Si pones 'tipo: podcast', te avisará de que esa opción no existe en el sistema."
      }
    ],
    quiz: {
      q: "Si en un artículo escribes 'borrador: no' en lugar de 'borrador: false', ¿qué hará este archivo de configuración?",
      options: [
        { text: "Borrará tu disco duro.", correct: false, note: "¡Para nada! Solo protege tu código." },
        { text: "Aceptará la palabra 'no' porque suena en español.", correct: false, note: "Zod exige tipo booleano (true o false)." },
        { text: "Dará un error claro explicándote que 'borrador' debe ser true o false.", correct: true, note: "¡Eso es! Zod es estricto para evitar fallos invisibles." }
      ]
    },
    fullCodePreview: `import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    portada: image().optional(),
    destacado: z.boolean().default(false),
    borrador: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    tipo: z.enum(['articulo', 'webcomic', 'novela']).default('articulo')
  })
});

export const collections = {
  blog: blogCollection
};`
  },
  {
    id: "base_astro",
    x: 430,
    y: 430,
    color: "#60a5fa", // blue
    category: "estructura",
    tag: "Estructura Global",
    name: "src/layouts/Base.astro",
    desc: "El cascarón HTML que rodea todas y cada una de las páginas.",
    badge: "🏛️ El chasis del auto",
    kidTitle: "El molde de galletas de todas las páginas",
    kidSummary: "Para no repetir la barra de navegación (header), el pie de página (footer), los estilos CSS y las etiquetas <head> en 50 archivos distintos, se crea este Layout base. Dentro de él hay una etiqueta especial llamada <slot /> donde se inserta el contenido único de cada página.",
    realLife: "Como un marco de fotos: el marco, el vidrio y el soporte son siempre iguales, lo único que cambia es la foto que pones dentro.",
    connections: ["index_astro", "articulo_slug", "global_css"],
    breakdown: [
      {
        code: `<html lang={sitio.idioma} data-theme="light">`,
        meaning: "Etiqueta raíz de la web. Lee el idioma directo desde sitio.js y prepara el tema de color.",
        example: "Ayuda a que los lectores de pantalla sepan pronunciar bien el texto."
      },
      {
        code: `<slot />`,
        meaning: "La puerta mágica de Astro. Es el hueco donde se dibuja el contenido específico de la página actual.",
        example: "En la portada inyecta las novedades; en un post inyecta el texto del artículo."
      },
      {
        code: `localStorage.getItem('tema')`,
        meaning: "Pequeño código en JavaScript que recuerda si dejaste el blog en Modo Oscuro o Claro la última vez.",
        example: "Evita que la pantalla te deslumbre en blanco al recargar si te gusta el modo oscuro."
      }
    ],
    quiz: {
      q: "¿Qué pasaría si borras la etiqueta <slot /> dentro de Base.astro?",
      options: [
        { text: "El blog se vería normal sin cambios.", correct: false, note: "Sin slot no hay espacio para el contenido." },
        { text: "Solo verías el Header y el Footer, pero el contenido de tus artículos desaparecería.", correct: true, note: "¡Exacto! El <slot /> es el portal por donde entra el cuerpo de cada página." },
        { text: "La página cambiaría automáticamente a color rojo.", correct: false, note: "El slot maneja estructura, no colores." }
      ]
    },
    fullCodePreview: `---
import sitio from '../../sitio.js';
import '../styles/global.css';

interface Props {
  titulo?: string;
  descripcion?: string;
}

const { titulo = sitio.nombre, descripcion = sitio.descripcion } = Astro.props;
---

<!DOCTYPE html>
<html lang={sitio.idioma}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{titulo} | {sitio.nombre}</title>
    <meta name="description" content={descripcion} />
  </head>
  <body>
    <header class="navbar">
      <a href="/" class="brand">{sitio.nombre}</a>
    </header>

    <main>
      <!-- Aquí se inyecta el contenido de cada página -->
      <slot />
    </main>

    <footer>
      <p>© {new Date().getFullYear()} {sitio.autor}</p>
    </footer>
  </body>
</html>`
  },
  {
    id: "index_astro",
    x: 770,
    y: 130,
    color: "#4ade80", // green
    category: "rutas",
    tag: "Página Principal",
    name: "src/pages/index.astro",
    desc: "La portada: hero con stickers, destacados y secciones.",
    badge: "🎪 La vitrina de la tienda",
    kidTitle: "La portada de una revista",
    kidSummary: "Es lo primero que ve alguien al entrar a tu web. Carga los posts más recientes, separa los cómics de los artículos normales, calcula cuántos años lleva abierto el blog y te muestra el saludo inicial con insignias flotantes.",
    realLife: "Como el lobby de un hotel o la portada de Netflix: te muestra lo más popular para que elijas qué leer.",
    connections: ["foto_astro", "cards_css"],
    breakdown: [
      {
        code: `const posts = await getPosts();`,
        meaning: "Le pide al sistema de archivos que lea todos los archivos Markdown de la carpeta posts.",
        example: "Obtiene una lista ordenada con fechas, imágenes y títulos listos para usar."
      },
      {
        code: `destacados = posts.filter(p => p.data.destacado)`,
        meaning: "Filtra la lista de posts y se queda únicamente con aquellos que tengan 'destacado: true'.",
        example: "Así se eligen los 3 artículos con portada grande del inicio."
      },
      {
        code: `<PostCard post={p} />`,
        meaning: "Reutiliza el componente tarjeta. En lugar de escribir 50 líneas de HTML para cada post, solo llama a esta etiqueta.",
        example: "Si tienes 10 posts, se repite automáticamente 10 veces de forma impecable."
      }
    ],
    quiz: {
      q: "Si en index.astro tienes 50 artículos pero pones .slice(0, 3), ¿cuántos se muestran en pantalla?",
      options: [
        { text: "Los 50 artículos.", correct: false, note: "slice corta la lista." },
        { text: "Solo los primeros 3.", correct: true, note: "¡Muy bien! slice(0, 3) toma desde el elemento 0 hasta el 3 (sin incluirlo), dando exactamente 3 artículos." },
        { text: "Ninguno, da error.", correct: false, note: "slice es una función estándar y segura de JavaScript." }
      ]
    },
    fullCodePreview: `---
import Base from '../layouts/Base.astro';
import { getCollection } from 'astro:content';
import PostCard from '../components/PostCard.astro';
import sitio from '../../sitio.js';

const todos = await getCollection('blog', ({ data }) => !data.borrador);
const ordenados = todos.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
const destacados = ordenados.filter(p => p.data.destacado).slice(0, sitio.home.cantidadDestacados);
---

<Base titulo="Portada">
  <section class="hero-boceto">
    <h1>{sitio.nombre} ✏️</h1>
    <p>{sitio.descripcion}</p>
  </section>

  <section class="seccion-destacados">
    <h2>✨ Artículos Destacados</h2>
    <div class="grid-cards">
      {destacados.map(post => <PostCard post={post} />)}
    </div>
  </section>
</Base>`
  },
  {
    id: "articulo_slug",
    x: 770,
    y: 450,
    color: "#f472b6", // pink
    category: "rutas",
    tag: "Ruta Dinámica",
    name: "src/pages/articulo/[slug].astro",
    desc: "Una sola plantilla que crea automáticamente miles de páginas.",
    badge: "⚡ La fábrica mágica",
    kidTitle: "El clonador de páginas con superpoderes",
    kidSummary: "Los corchetes en [slug] significan 'variable'. No necesitas crear un archivo .astro por cada artículo que escribas. Este archivo único toma el contenido de cualquier archivo Markdown y genera su propia página con 3 columnas (índice, lectura e información).",
    realLife: "Como una credencial escolar con foto y nombre: la plantilla plástica es idéntica para todos los alumnos, solo se reemplazan los datos de cada quien.",
    connections: ["comic_reader", "foto_astro"],
    breakdown: [
      {
        code: `export async function getStaticPaths() { ... }`,
        meaning: "La función más importante de Astro para páginas dinámicas. Le avisa a Astro todas las URLs que deben existir.",
        example: "Si tienes 'viaje.md' y 'dibujo.md', crea '/articulo/viaje/' y '/articulo/dibujo/'."
      },
      {
        code: `const { Content, headings } = await post.render();`,
        meaning: "Convierte el Markdown crudo (# Título, negritas, links) en HTML real y extrae los encabezados para el índice.",
        example: "Transforma '**hola**' en '<strong>hola</strong>' sin que tengas que hacerlo a mano."
      },
      {
        code: `<Content />`,
        meaning: "El componente que finalmente imprime el texto de tu artículo en pantalla.",
        example: "Aquí aparece tu historia redactada con sus párrafos y fotos."
      }
    ],
    quiz: {
      q: "¿Por qué el nombre del archivo lleva corchetes como [slug].astro?",
      options: [
        { text: "Porque es una regla obligatoria de Windows.", correct: false, note: "Windows no exige corchetes para nada." },
        { text: "Le indica a Astro que es una ruta dinámica: el texto entre corchetes cambiará según el post.", correct: true, note: "¡Excelente! [slug] captura el nombre del archivo Markdown." },
        { text: "Sirve para que el archivo sea invisible a los usuarios.", correct: false, note: "Al revés, genera páginas públicas." }
      ]
    },
    fullCodePreview: `---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import ComicReader from '../../components/ComicReader.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content, headings } = await post.render();
---

<Base titulo={post.data.titulo}>
  <article class="layout-articulo">
    <h1>{post.data.titulo}</h1>
    <Content />
  </article>
</Base>`
  },
  {
    id: "comic_reader",
    x: 1090,
    y: 450,
    color: "#fde047", // yellow
    category: "componentes",
    tag: "Lector Interactivo",
    name: "src/components/ComicReader.astro",
    desc: "Lector de cómics: vertical (webtoon) o paginado con clics y flechas.",
    badge: "📖 El lector manga",
    kidTitle: "El lector inteligente que obedece tu teclado",
    kidSummary: "Este archivo mezcla lo mejor de dos mundos: maquetación rápida en el servidor y un <script> que corre en el navegador del usuario para escuchar las flechas izquierda/derecha del teclado o hacer clic en los bordes de la imagen para cambiar de página.",
    realLife: "Como pasar las hojas de un libro físico o deslizar historias en Instagram.",
    connections: [],
    breakdown: [
      {
        code: `modo === 'paginado' ? ... : ...`,
        meaning: "Operador ternario (un condicional rápido). Si en el post pusiste 'modo: paginado', muestra botones; si es vertical, no.",
        example: "Permite publicar cómics estilo manga japonés o tiras largas tipo Webtoon."
      },
      {
        code: `document.addEventListener('keydown', (e) => { ... })`,
        meaning: "Escucha el teclado del lector cuando presiona las flechas ← y → para avanzar la viñeta.",
        example: "Hace que la lectura sea comodísima sin tocar el ratón."
      },
      {
        code: `new Image().src = siguiente.src;`,
        meaning: "Técnica de precarga (preload). Descarga la siguiente página en secreto antes de que el usuario haga clic.",
        example: "La lectura se siente instantánea, sin esperas de carga de imagen."
      }
    ],
    quiz: {
      q: "¿Para qué sirve precargar la imagen siguiente con new Image().src?",
      options: [
        { text: "Para ahorrar batería del celular.", correct: false, note: "No tiene impacto en la batería." },
        { text: "Para que al cambiar de página la imagen ya esté lista al instante sin parpadeos ni demoras.", correct: true, note: "¡Correcto! Es un truco profesional de experiencia de usuario (UX)." },
        { text: "Para enviar la foto a la policía.", correct: false, note: "¡Jaja, claro que no!" }
      ]
    },
    fullCodePreview: `---
interface Props {
  paginas: string[];
  modo?: 'paginado' | 'vertical';
}

const { paginas, modo = 'paginado' } = Astro.props;
---

<div class="comic-container" data-modo={modo}>
  <div class="comic-stage">
    <img id="comic-current-page" src={paginas[0]} alt="Página cómic" />
  </div>
  <div class="comic-nav">
    <button id="btn-prev">← Anterior</button>
    <span id="page-counter">1 / {paginas.length}</span>
    <button id="btn-next">Siguiente →</button>
  </div>
</div>

<script>
  // Código interactivo en el cliente para teclado y gestos táctiles
  let idx = 0;
  const img = document.getElementById('comic-current-page') as HTMLImageElement;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') avanzar();
    if (e.key === 'ArrowLeft') retroceder();
  });
</script>`
  },
  {
    id: "foto_astro",
    x: 1090,
    y: 130,
    color: "#60a5fa", // blue
    category: "componentes",
    tag: "Optimización",
    name: "src/components/Foto.astro",
    desc: "Convierte imágenes pesadas en WebP con srcsets adaptables.",
    badge: "⚡ Compresor turbo",
    kidTitle: "El sastre que confecciona ropa a tu medida",
    kidSummary: "Si alguien visita tu blog desde un celular pequeño con datos lentos, no tiene sentido descargar una foto gigante en 4K. Este componente le entrega una versión pequeña a los teléfonos y una grande a las pantallas de escritorio automáticamente.",
    realLife: "Como comprar zapatos de tu talla: no compras una talla 45 si calzas 38.",
    connections: [],
    breakdown: [
      {
        code: `widths = [320, 640, 960, 1400]`,
        meaning: "Crea automáticamente 4 tamaños diferentes de cada imagen para que el navegador elija la más conveniente.",
        example: "Un teléfono descarga la de 320px y una PC con monitor ancho descarga la de 1400px."
      },
      {
        code: `srcset={v.srcset}`,
        meaning: "Atributo HTML estándar que contiene la lista de todas las versiones de imagen y sus anchos.",
        example: "El navegador lee esta lista y elige la foto óptima según el ancho de pantalla actual."
      },
      {
        code: `loading="lazy"`,
        meaning: "Carga diferida. La foto no se descarga hasta que el usuario hace scroll y casi llega a verla.",
        example: "Ahorra megabytes de conexión y hace que la página abra en menos de medio segundo."
      }
    ],
    quiz: {
      q: "¿Qué ventaja tiene loading='lazy' en una página con 40 imágenes?",
      options: [
        { text: "Descarga las 40 fotos al mismo segundo saturando la red.", correct: false, note: "Eso sería loading eager." },
        { text: "Solo descarga las fotos que estás viendo en ese momento en pantalla.", correct: true, note: "¡Exacto! Ahorra datos y la web abre a velocidad de cohete." },
        { text: "Hace que las imágenes se vean en blanco y negro.", correct: false, note: "No altera los colores." }
      ]
    },
    fullCodePreview: `---
import { getImage } from 'astro:assets';

interface Props {
  src: ImageMetadata;
  alt: string;
  className?: string;
}

const { src, alt, className = '' } = Astro.props;

// Optimización con Sharp en Astro
const optimizada = await getImage({
  src,
  format: 'webp',
  widths: [320, 640, 960, 1400]
});
---

<img
  src={optimizada.src}
  srcset={optimizada.srcSet.attribute}
  alt={alt}
  loading="lazy"
  decoding="async"
  class={className}
/>`
  },
  {
    id: "global_css",
    x: 430,
    y: 730,
    color: "#4ade80", // green
    category: "estilos",
    tag: "Estilos y Variables",
    name: "src/styles/global.css",
    desc: "Las reglas visuales, bordes, sombras y variables nativas.",
    badge: "🎨 La paleta de pintura",
    kidTitle: "Las leyes de la física visual de tu web",
    kidSummary: "Aquí se define cómo deben comportarse los botones, qué tan redondeadas son las esquinas y los efectos de sombreado. Usa variables CSS (--borde, --acento) para que con cambiar un número se transforme la personalidad del blog.",
    realLife: "Como las reglas de construcción de un set de LEGO: define cómo encajan las piezas entre sí.",
    connections: ["cards_css"],
    breakdown: [
      {
        code: `color-mix(in srgb, var(--line) 8%, transparent)`,
        meaning: "Función moderna de CSS que mezcla dos colores. Toma la línea base y la hace semitransparente al 8%.",
        example: "Crea bordes elegantes y sutiles que se adaptan tanto a modo claro como oscuro."
      },
      {
        code: `overflow-x: clip;`,
        meaning: "Corta cualquier elemento que se desborde horizontalmente sin romper los menús fijos (sticky).",
        example: "Evita el molesto error en celulares donde la web se mueve de lado a lado sin querer."
      },
      {
        code: `scroll-behavior: smooth;`,
        meaning: "Hace que al pulsar un link interno del índice, la pantalla viaje con una animación suave en vez de un salto brusco.",
        example: "Le da un toque profesional y suave a la navegación."
      }
    ],
    quiz: {
      q: "¿Por qué en CSS usamos variables como var(--borde) en lugar de escribir #000000 en 100 lugares?",
      options: [
        { text: "Porque la computadora gasta menos electricidad con variables.", correct: false, note: "No tiene nada que ver con consumo eléctrico." },
        { text: "Si quieres cambiar el estilo de todos los bordes, solo editas 1 línea de código en vez de 100.", correct: true, note: "¡Brillante! El principio DRY (Don't Repeat Yourself - No te repitas)." },
        { text: "Porque el navegador bloquea las webs sin variables.", correct: false, note: "El código funcionaría, pero sería un dolor de cabeza mantenerlo." }
      ]
    },
    fullCodePreview: `:root {
  --bg: #fafafa;
  --text: #18181b;
  --line: #27272a;
  --borde-radio: 12px;
  --sombra: 4px 4px 0px var(--line);
}

[data-theme="dark"] {
  --bg: #18181b;
  --text: #f4f4f5;
  --line: #71717a;
}

html {
  scroll-behavior: smooth;
  overflow-x: clip;
  background-color: var(--bg);
  color: var(--text);
}`
  },
  {
    id: "cards_css",
    x: 770,
    y: 730,
    color: "#f472b6", // pink
    category: "estilos",
    tag: "Maquetación",
    name: "src/styles/cards.css",
    desc: "Cuadrículas adaptables y el efecto estilo Pinterest.",
    badge: "📐 Mosaico inteligente",
    kidTitle: "El organizador de cartas coleccionables",
    kidSummary: "Controla las tarjetas de los artículos. En computadoras las acomoda en 3 columnas anchas, y en celulares las coloca en 2 columnas compactas. Además tiene una variante inspirada en Pinterest donde cada tarjeta tiene una altura ligeramente distinta.",
    realLife: "Como acomodar cartas de Pokémon o fotos en un corcho de pared con chinches.",
    connections: [],
    breakdown: [
      {
        code: `repeat(auto-fill, minmax(270px, 1fr))`,
        meaning: "Fórmula maestra de CSS Grid. Crea tantas columnas como quepan de al menos 270 píxeles cada una.",
        example: "En pantalla gigante pone 4 columnas, en laptop 3, en tablet 2, sin usar mil líneas de código."
      },
      {
        code: `.card-portada:hover { transform: translateY(-4px); }`,
        meaning: "Efecto táctil visual. Cuando pasas el ratón por encima, la tarjeta levita 4 píxeles hacia arriba.",
        example: "Le comunica al usuario de forma divertida que la tarjeta es un botón cliqueable."
      },
      {
        code: `aspect-ratio: 2 / 3;`,
        meaning: "Fuerza a que las tarjetas mantengan siempre proporción de póster vertical (ancho: 2, alto: 3).",
        example: "Evita que las imágenes se deformen o salten de tamaño mientras terminan de cargar."
      }
    ],
    quiz: {
      q: "¿Qué hace la instrucción minmax(270px, 1fr) en un grid?",
      options: [
        { text: "La columna nunca medirá menos de 270px, pero si sobra espacio crecerá equitativamente.", correct: true, note: "¡Exacto! Es la base del diseño responsivo moderno." },
        { text: "Borra todas las columnas que tengan fotos menores a 270 kilobytes.", correct: false, note: "px mide píxeles en pantalla, no peso de archivo." },
        { text: "Congela la pantalla en 270 cuadros por segundo.", correct: false, note: "No tiene relación con frames de video." }
      ]
    },
    fullCodePreview: `.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
}

.card-portada {
  border: 2px solid var(--border);
  border-radius: 12px;
  background: white;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.9);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card-portada:hover {
  transform: translateY(-4px);
  box-shadow: 6px 6px 0px rgba(0,0,0,0.9);
}`
  },
  {
    id: "panel_index",
    x: 100,
    y: 730,
    color: "#fb923c", // orange
    category: "admin",
    tag: "Panel Administrativo",
    name: "panel/index.html",
    desc: "Panel visual tipo WordPress para editar el blog sin tocar código.",
    badge: "🎛️ Tablero de mandos",
    kidTitle: "La aplicación de control secreta",
    kidSummary: "Este archivo es una mini-aplicación web completa construida con JavaScript puro sin librerías pesadas. Se conecta con un pequeño servidor local (panel/servidor.mjs) que te permite escribir textos, subir fotos y pulsar 'Guardar y Publicar' para hacer commits en Git automáticamente.",
    realLife: "Como el panel de control de un juego: puedes cambiar las opciones con botones e interruptores en lugar de editar archivos de texto complejos.",
    connections: [],
    breakdown: [
      {
        code: `async function api(ruta, metodo, cuerpo)`,
        meaning: "Función de mensajería (fetch). Envía y recibe datos en formato JSON con el servidor local.",
        example: "Le dice al servidor 'guarda este borrador en sitio.js' al pulsar un botón."
      },
      {
        code: `localStorage.setItem('panel-borrador', ...)`,
        meaning: "Guarda tus cambios en la memoria del navegador cada 600 milisegundos.",
        example: "Si se corta la luz o cierras la pestaña por error, no pierdes nada de lo que estabas escribiendo."
      },
      {
        code: `window.addEventListener('beforeunload', ...)`,
        meaning: "Detector de seguridad. Si intentas cerrar la pestaña con cambios sin guardar, te muestra un aviso.",
        example: "Te pregunta: '¿Seguro que quieres salir? Tienes cambios pendientes'."
      }
    ],
    quiz: {
      q: "¿Por qué el panel guarda un borrador con debounce cada 600 milisegundos?",
      options: [
        { text: "Para evitar que pierdas lo que escribiste si se cierra la ventana o falla el internet.", correct: true, note: "¡Correcto! Es una red de seguridad indispensable en editores de contenido." },
        { text: "Para gastar toda la memoria RAM de la máquina.", correct: false, note: "El JSON de configuración pesa solo unos kilobytes." },
        { text: "Para enviar tu contraseña a Google.", correct: false, note: "No se recopila información personal." }
      ]
    },
    fullCodePreview: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Admin Panel - Astro Blog</title>
</head>
<body>
  <h1>Panel de Edición Rápida</h1>
  <form id="editor">
    <label>Título del Blog: <input id="inp-nombre" /></label>
    <button type="submit">Guardar y Publicar</button>
  </form>
  <script>
    // Vanilla JS sin dependencias
    const form = document.getElementById('editor');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await fetch('/api/guardar', { method: 'POST', body: JSON.stringify({ nombre: form.inp-nombre.value }) });
    });
  </script>
</body>
</html>`
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Nodos', count: 11 },
  { id: 'config', label: 'Configuración & Setup', count: 2 },
  { id: 'estructura', label: 'Estructura & Reglas', count: 2 },
  { id: 'rutas', label: 'Páginas & Rutas', count: 2 },
  { id: 'componentes', label: 'Componentes', count: 2 },
  { id: 'estilos', label: 'Estilos CSS', count: 2 },
  { id: 'admin', label: 'Panel Admin', count: 1 }
];

export const PILLARS_DOCS = [
  {
    number: "01",
    title: "La Caja Negra (`package.json`)",
    sub: "Inventario de dependencias, comandos y optimización con Sharp",
    content: `
### ¿Qué es y por qué importa?
\`package.json\` es la piedra angular de cualquier proyecto con Node.js y Astro. No contiene diseño visual ni textos del blog, sino que define el **manifiesto de dependencias** y los **scripts ejecutables**.

### Motores principales:
- **Astro 4.x**: Motor generador de sitios estáticos (SSG) de arquitectura de "Islas" (Islands Architecture). Produce HTML puro con cero JavaScript por defecto.
- **Sharp**: Módulo nativo ultraveloz en C/C++ que realiza reescalado de imágenes, conversión a WebP y compresión al compilar el proyecto.
- **Scripts de Terminal**:
  \`\`\`bash
  pnpm dev     # Levanta servidor local en http://localhost:4321 con recarga rápida
  pnpm build   # Compila el sitio estático en la carpeta /dist listo para GitHub Pages
  pnpm preview # Sirve la carpeta /dist localmente para validar antes de publicar
  \`\`\`
`
  },
  {
    number: "02",
    title: "El Cerebro Único (`sitio.js`)",
    sub: "Configuración desacoplada del código para que cualquier persona edite el blog",
    content: `
### ¿Por qué desacoplar la configuración?
En proyectos tradicionales, si quieres cambiar el nombre de tu sitio o el color primario, tendrías que buscar y reemplazar texto en 20 archivos HTML y CSS distintos.

En este proyecto, **todo se centraliza en \`sitio.js\`**:
- Nombre del blog, biografía del autor, redes sociales y avatar.
- Paleta cromática: nombres semánticos asociados a colores HEX.
- Variables de la portada: cantidad de artículos destacados, etiquetas visibles.

\`\`\`javascript
export default {
  nombre: 'Mi Cuaderno Digital',
  autor: 'Niko Dev',
  tema: {
    colorPrimario: '#facc15',
    acentos: { amarillo: '#facc15', rosa: '#f472b6', azul: '#60a5fa' }
  },
  home: { cantidadDestacados: 3 }
};
\`\`\`
`
  },
  {
    number: "03",
    title: "El Escudo Protector (`src/content/config.ts`)",
    sub: "Content Collections de Astro con validación de esquemas Zod",
    content: `
### Protección contra errores en tiempo de compilación
Astro incluye una característica revolucionaria llamada **Content Collections**. En lugar de leer carpetas de Markdown a ciegas, \`src/content/config.ts\` define un contrato estricto mediante **Zod**:

- \`titulo: z.string()\`: El artículo DEBE tener título y ser texto.
- \`fecha: z.coerce.date()\`: Convierte strings como \`"2026-11-01"\` a un objeto \`Date\` de JS utilizable para ordenar.
- \`tipo: z.enum(['articulo', 'webcomic', 'novela'])\`: Restringe los valores permitidos para evitar erratas.
- \`borrador: z.boolean().default(false)\`: Los borradores nunca se filtrarán al sitio público si está activo.

> 💡 **Beneficio**: Si olvidas un campo en tu artículo \`.md\`, la terminal te avisa con la línea exacta antes de publicar en GitHub Pages.
`
  },
  {
    number: "04",
    title: "Plantillas Dinámicas (`[slug].astro`)",
    sub: "La magia de los corchetes en Astro para generar miles de URLs con un solo archivo",
    content: `
### ¿Cómo funcionan las Rutas Dinámicas?
El nombre de archivo con corchetes \`[slug].astro\` le indica a Astro que esa parte de la URL es variable.

\`\`\`typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
\`\`\`

Astro ejecuta \`getStaticPaths()\` durante la compilación:
1. Lee todos los posts de \`/src/content/blog/*.md\`.
2. Extrae el slug (nombre de archivo).
3. Genera automáticamente una página estática HTML optimizada para cada post: \`/articulo/mi-primer-post/index.html\`.
4. El componente \`<Content />\` renderiza el cuerpo Markdown con tipografía impecable y enlaces seguros.
`
  },
  {
    number: "05",
    title: "Cero Frameworks Pesados en el Panel (`panel/index.html`)",
    sub: "Arquitectura Vanilla JS ligera con sincronización local y Git",
    content: `
### ¿Por qué sin React/Vue para el panel?
El panel de administración se diseñó con **Vanilla JavaScript nativo**:
- Pesa menos de 40 KB en total (frente a 1.5 MB de dashboards típicos).
- Abre al instante sin necesidad de un paso de compilación para la interfaz del panel.
- Guarda borradores automáticamente en \`localStorage\` con un debounce de 600 ms para que nunca pierdas una idea ante fallos de conexión.
- Se comunica mediante \`fetch()\` con un mini-servidor local de NodeJS (\`servidor.mjs\`) para actualizar \`sitio.js\` y crear archivos \`.md\` con un solo clic.
`
  }
];

export const SAMPLE_POSTS = [
  {
    slug: 'mi-primer-comic',
    titulo: 'Las Aventuras del Código Perdido',
    descripcion: 'Episodio 1: Cuando el punto y coma desapareció del universo.',
    tipo: 'webcomic',
    destacado: true,
    fecha: '2026-11-01',
    tags: ['comic', 'humor', 'astro'],
    paginas: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
    ],
    contenido: `# Las Aventuras del Código Perdido

Una tira cómica interactiva creada con \`ComicReader.astro\`. Puedes avanzar con las flechas ← y → del teclado o pulsando los bordes de la viñeta.`
  },
  {
    slug: 'por-que-elegir-astro',
    titulo: '¿Por qué Astro es el Framework Favorito de 2026?',
    descripcion: 'Descubre la arquitectura de islas y cómo entrega 100/100 en Google Lighthouse.',
    tipo: 'articulo',
    destacado: true,
    fecha: '2026-10-28',
    tags: ['webdev', 'astro', 'performance'],
    contenido: `Astro envía CERO JavaScript al cliente a menos que uses una directiva especial como \`client:visible\`. Esto significa que tus lectores en teléfonos lentos ven la página de forma inmediata.`
  },
  {
    slug: 'guia-markdown-estilizado',
    titulo: 'Escribiendo Artículos Hermosos con Markdown',
    descripcion: 'Cómo sacar provecho a listas, tablas y bloques de código con resaltado sintáctico.',
    tipo: 'articulo',
    destacado: true,
    fecha: '2026-10-15',
    tags: ['markdown', 'escritura'],
    contenido: `Con las colecciones de contenido de Astro, tu Markdown tiene validación de tipos gracias a Zod. ¡Nunca más una fecha rota o un autor inexistente!`
  }
];
