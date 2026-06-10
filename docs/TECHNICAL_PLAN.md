# TECHNICAL PLAN — Ingeniería Web Miranda

Estado técnico del proyecto, decisiones de arquitectura, trabajo completado y roadmap.

---

## 1. Stack

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| SSG | Eleventy (11ty) | ^3.0 | Templates Nunjucks |
| CSS framework | Tailwind CSS | CDN (v3) | Sin build process de CSS |
| CSS custom | `assets/css/theme.css` | — | Botones, links, efectos |
| JS | Vanilla JS | — | `assets/js/ui.js`, 34 líneas |
| Formateo | Prettier | ^3.8 | `.njk`, `.css`, `.js` |
| Node | 22.x | — | Solo para build, no corre en producción |

**Producción:** HTML estático puro. Hostinger recibe el output de `_site/` — no corre Node.

---

## 2. Arquitectura

```
Fuente (.njk + assets)
        ↓
   npm run build
        ↓
    _site/ (HTML + assets copiados)
        ↓
  Subir a Hostinger /public_html/
```

### Flujo de plantillas

```
base.njk (layout)
  ├── head.njk           → <head> con SEO variables del front matter
  ├── nav.njk            → navegación estándar (fixed, max-w-7xl)
  │   └── nav-legal.njk  → navegación legal (flow, max-w-4xl) si navStyle=legal
  ├── {{ content }}      → contenido específico de la página (.njk)
  └── footer.njk         → footer global
```

### Variables de front matter por página

```yaml
layout: layouts/base.njk
title: ""
description: ""
ogTitle: ""
ogDescription: ""
ogImage: "og-cover.png"         # solo filename
twitterTitle: ""
twitterDescription: ""
navStyle: "legal"               # solo en /legal/*
jsonld: |                       # solo en home y contacto
  { ... }
```

---

## 3. Trabajo completado

### Bloque A — Consolidación de fuentes (sin SSG)
- Eliminado `styles/tailwind.css` (huérfano con conflictos)
- Removidos todos los bloques `<style>` inline de los 18 HTML
- Config Tailwind centralizada en `assets/js/tailwind-config.js`
- JS centralizado en `assets/js/ui.js`
- **~1,850 líneas eliminadas**

### Bloque B — Migración a Eleventy + Nunjucks
- `package.json` + `@11ty/eleventy@3` instalado
- `.eleventy.js` configurado (passthrough assets, templateFormats njk)
- 5 partials y 1 layout creados en `_includes/`
- 18 páginas `.html` convertidas a `.njk` con front matter
- `.html` originales eliminados
- **~1,890 líneas de header/footer deduplicadas**

### Tooling
- Prettier instalado y configurado (`.prettierrc`, `.prettierignore`)
- Scripts `format` y `format:check` en `package.json`
- `.gitignore` con `node_modules/`, `_site/`, OS y editores

### Calidad de código
- IDs estandarizados: todos en español (sección) o inglés descriptivo (JS hooks)
- `#y` renombrado a `#copyright-year` (opaco → descriptivo)
- `id="cases"`, `"services"`, `"method"`, `"cta"` renombrados a español
- 2 H2 con punto final corregidos (viola spec SectionHeader)
- `</form>` faltante en `contacto/index.njk` restaurado

### SEO
- 16 páginas actualizadas con `ogTitle`, `ogDescription`, `twitterTitle`, `twitterDescription` únicos y específicos
- Solo home y contacto tenían meta específico — ahora las 18 páginas lo tienen

### SDD — Especificaciones de componentes
- `_specs/tokens.md` — design tokens
- `_specs/button.md` — 4 variantes
- `_specs/card.md` — 4 variantes
- `_specs/section-header.md` — 3 variantes
- `_specs/header.md` — nav estándar + legal
- `_specs/footer.md` — footer global
- `_specs/nav-link.md` — NavLink y HeroLink
- `_specs/visual-effects.md` — efectos decorativos

### Deploy
- `.github/workflows/deploy.yml` creado (GitHub Actions → FTP → Hostinger)
- Pendiente: configurar 3 secrets en GitHub (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)

---

## 4. Deuda técnica conocida

| Item | Severidad | Descripción |
|------|-----------|-------------|
| `title` con typo | Baja | `metodo/index.njk` tiene `"Metodo"` sin acento en el front matter |
| Skip link | Baja | `.skip-link` está definido en `theme.css` pero no implementado en `base.njk` |
| Home: secciones de casos duplicadas | Media | `#casos` y `#casos-accion` presentan contenido solapado — candidato a consolidar |
| `tailwind.config.js` en raíz | Baja | Formato Node.js inactivo (sin build process); puede confundir. Eliminar o migrar |
| Formspree endpoint visible | Info | `xpqjevwp` visible en el HTML del formulario. Aceptable para Formspree (es público por diseño) |
| OG images genéricas | Media | 16 páginas usan `og-cover.png`. Ideal: imágenes específicas por sección |

---

## 5. Roadmap

### Próximo (alta prioridad)

- [ ] Corregir typo `"Metodo"` → `"Método"` en front matter de `metodo/index.njk`
- [ ] Implementar `.skip-link` en `_includes/layouts/base.njk`
- [ ] Configurar secrets de FTP en GitHub y hacer primer deploy automatizado
- [ ] Revisar y consolidar las dos secciones de casos en el home

### Corto plazo

- [ ] OG images específicas por sección (performance, seguridad, casos, etc.)
- [ ] Eliminar `tailwind.config.js` de la raíz o documentarlo claramente
- [ ] Agregar `sitemap.xml` (puede generarse con plugin 11ty: `@11ty/eleventy-plugin-sitemap`)
- [ ] Agregar `robots.txt`

### Medio plazo

- [ ] Migrar Tailwind de CDN a build process (`tailwindcss` CLI + purge) para producción
  - Motivación: el CDN incluye todas las clases (~3MB sin purge); el build genera solo las usadas (~10–20KB)
  - Prerequisito: mover `tailwind.config.js` a formato Node.js estándar
- [ ] Contenido de `/proyectos/` — actualmente en construcción
- [ ] Contenido de `/recursos/` — completar checklists y guías

### Largo plazo (SDD maduro)

- [ ] Specs de patrones de página (ServicePage, CasePage, LegalPage)
- [ ] Migrar colores de `theme.css` a CSS custom properties para temas
- [ ] Internacionalización (si se decide versión en inglés)

---

## 6. Decisiones de arquitectura registradas

| Decisión | Alternativas consideradas | Razón |
|----------|--------------------------|-------|
| Eleventy sobre Hugo/Astro | Hugo (más rápido), Astro (más moderno) | Nunjucks compatible con el HTML existente; curva mínima |
| Tailwind CDN sobre build | Build con purge | Simplicidad; sin toolchain adicional hasta que el tamaño lo justifique |
| Un layout único | Layout por tipo de página | DRY; la variación se resuelve con front matter y condicionales |
| `templateFormats: ["njk"]` | Incluir `"html"` también | Evita conflictos entre `.html` existentes y `.njk` nuevos durante migración |
| FTP deploy sobre Netlify/Vercel | Netlify (auto-deploy), Vercel | El hosting ya está en Hostinger; cambiar no aporta suficiente valor |
