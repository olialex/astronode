# 🚀 Astro Explorer — Pizarra Interactiva del Blog

Herramienta interactiva y pedagógica con estilo Excalidraw, visualizador de arquitectura de un blog en Astro para GitHub Pages, documentación en Markdown y simulador en vivo.

---

## 🛠️ Cómo ejecutar este proyecto en tu PC

### 1. Requisitos previos
- **Node.js**: Versión 18 o superior instalada en tu equipo ([nodejs.org](https://nodejs.org)).
- **npm** o **pnpm** como gestor de paquetes.

### 2. Instalación de dependencias
Abre una terminal en esta carpeta y ejecuta:
```bash
npm install
# o si usas pnpm:
pnpm install
```

### 3. Iniciar servidor de desarrollo
```bash
npm run dev
# o con pnpm:
pnpm dev
```
Abre en tu navegador la URL que muestra la terminal: **http://localhost:3000** (o http://localhost:5173).

### 4. Compilar para producción
```bash
npm run build
```

---

## 📦 Cómo hacer Push a tu repositorio en GitHub

1. Crea un nuevo repositorio vacío en [GitHub.com](https://github.com/new) (por ejemplo: `mi-blog-astro-explorer`).
2. En la terminal de tu PC, dentro de esta carpeta, ejecuta:

```bash
# Inicializar repositorio git local
git init

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "feat: proyecto completo astro explorer"

# Renombrar rama a main
git branch -M main

# Conectar con tu repositorio remoto en GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Empujar el código a GitHub
git push -u origin main
```

---

## 📄 Archivo Autónomo `tablero-blog.html`
En la carpeta `public/tablero-blog.html` tienes la versión de un solo archivo HTML independiente que funciona 100% offline o para publicar directamente en GitHub Pages con solo subirlo.
