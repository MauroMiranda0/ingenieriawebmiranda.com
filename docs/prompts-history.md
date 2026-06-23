# Historial de prompts — Ingeniería Web Miranda

10 commits refactorizados como prompts SDD (Spec-Driven Development).

---

## 1. Rediseño showcase visual en servicios

**Commit:** `d0c332b`

**Prompt SDD:**

```
## Goal
Reemplazar el showcase (timeline + grid de 6 cards) por la estructura anterior (sticky nav + 6 secciones individuales), pero cada sección debe usar el nuevo lenguaje visual del showcase: imagen por servicio, cards rectas sin border-radius, botón arrow cuadrado, títulos Playfair Display.

## Context
- `servicios/index.njk` tiene hero → timeline → grid de 6 cards → closing CTA
- `_includes/partials/service-block.njk` existe pero con diseño viejo (sin imágenes)
- `_data/serviceBlocks.json` tiene los 6 servicios con campo `image` agregado
- `assets/css/theme.css` tiene clases `.showcase-*` (timeline, grid, card, btn)

## Design spec
Cada bloque de servicio debe tener:
1. Fila superior 2-columnas: texto (eyebrow + título + descripción + arrow button) + imagen
2. 3 cards rectas (Entregables, Beneficios, Señales) con `border border-slate-200 bg-white p-6`
3. Sección "Áreas que cubrimos" en grilla 3-col con mismas cards
4. CTA "Solicitar {servicio}" al pie

## Constraints
- Sin border-radius en cards
- Títulos con `font-display` (Playfair Display)
- Imagen con `border border-slate-200 w-full`, sin border-radius
- Arrow button: cuadrado 32×32, `bg-primary text-white`
- Usar `s.image` de `serviceBlocks.json` para src de imagen
- Mantener `id="{{ s.id }}"` y `scroll-mt-20` para anchor nav

## Files to modify
- `servicios/index.njk` — timeline + grid → sticky nav + loop
- `_includes/partials/service-block.njk` — rediseño completo
- `assets/css/theme.css` — mantener clases `.showcase-*` (card-btn, card-img, etc.)
```

---

## 2. Breadcrumbs

**Commit:** `a08d4a2`

**Prompt SDD:**

```
## Goal
Implementar breadcrumbs en todas las páginas excepto home, renderizados en el layout antes de `{{ content | safe }}`.

## Context
- Layout único: `_includes/layouts/base.njk`
- `page.url` en Eleventy incluye trailing slash (ej. `/servicios/`)
- 11 páginas no-home en el sitemap

## Data spec
Crear `_data/breadcrumbs.json` como lookup estático URL → trail:
```json
{
  "/": null,
  "/servicios/": [
    { "label": "Inicio", "url": "/" },
    { "label": "Servicios", "url": null }
  ],
  ...
}
```
- Último elemento: `url: null`, `aria-current="page"`
- Separador: `/` con `aria-hidden="true"`
- Solo visible si `page.url != "/"`

## Files to create/modify
- Create `_data/breadcrumbs.json` — todas las rutas
- Create `_includes/partials/breadcrumb.njk` — template del nav
- Modify `_includes/layouts/base.njk` — incluir antes de `{{ content | safe }}`
```

---

## 3. Consolidar 6 servicios en página única

**Commit:** `71c9fe2`

**Prompt SDD:**

```
## Goal
Consolidar 6 páginas de servicio individuales en una sola página `/servicios/` con datos externalizados. Remover 6 directorios de servicio, mantener redirección via anchor IDs. Actualizar home y footer para que apunten a `/servicios/#servicio-{slug}`. Eliminar dialogs JS huérfanos.

## Context
- 6 servicios: `/servicios/diagnostico-tecnico/`, `/modernizacion-web/`, `/performance/`, `/sistemas-web/`, `/arquitectura/`, `/seguridad/`
- Cada uno tiene su propio `index.njk` con hero y contenido
- `_data/services.json` existente pero no se usa
- Home (`index.njk`) tiene 6 cards con botones "Saber más" que abren dialog JS
- JS dialog code en `assets/js/ui.js`
- 21 archivos involucrados

## Data architecture
- Crear `_data/serviceBlocks.json` — array con 6 objetos, cada uno con: id, eyebrow, title, description, deliverables[], benefits[], signals[], areas[{heading, content}]
- Eliminar `_data/services.json` (obsoleto)

## Page structure (`servicios/index.njk`)
1. Hero (existente, mantener)
2. Sticky nav index con 6 anchor links
3. Loop: 6 service blocks via `{% include "partials/service-block.njk" %}`
4. Closing CTA section

## Home page changes
- Cards: CTAs apuntan a `/servicios/#servicio-{slug}`
- Remover dialogs y su JS
- Usar datos de `serviceBlocks.json` para títulos/descripciones

## Files to delete
- 6 directorios de servicio: `servicios/{cada-uno}/index.njk`
- `_data/services.json`

## Files to create
- `_data/serviceBlocks.json`
- `_includes/partials/service-block.njk` — partial del bloque
- `_specs/content-architecture.md` — spec de la arquitectura

## Files to modify
- `servicios/index.njk` — rewrite con loop
- `index.njk` — CTAs a anchors, sin dialogs
- `_includes/partials/footer.njk` — 3 links a servicios
- `assets/js/ui.js` — remover código dialog
- `docs/SPECIFICATION.md` — sitemap 18→12 páginas
```

---

## 4. Cards con imagen de fondo

**Commit:** `9bbe399`

**Prompt SDD:**

```
## Goal
Rediseñar las service cards de la home page usando imagen de fondo con overlay gradient en lugar de iconos hexagonales. El botón debe ser estilo "Saber más" como en la home.

## Context
- `servicios/index.njk` tiene cards hexagonales con borde
- `assets/css/theme.css` tiene estilos hexagonales complejos
- Las cards están en la sección "Qué resolvemos"
- Referencia visual: cards tipo home con bg-image y overlay

## Design
Cada card debe mostrar:
- Imagen de fondo que cubra toda la card
- Overlay gradient vertical (transparent → primary)
- Título en Playfair Display sobre el overlay
- Descripción breve
- Botón blanco "Saber más" alineado abajo
- Badge en esquina superior derecha

## Constraints
- Sin border-radius
- Sin forma hexagonal
- Sin JS de interacción
```

---

## 5. Cards hexagonales con borde

**Commit:** `90f3ee0`

**Prompt SDD:**

```
## Goal
Rediseñar las service cards con forma hexagonal (clip-path) y borde decorativo, en grid uniforme de 3 columnas. Simplificar el CSS eliminando el grid posicionado 3×3 anterior.

## Context
- Actualmente grid posicionado 3×3 con líneas decorativas CSS complejas
- `_specs/card.md` tiene spec del grid posicionado
- `servicios/index.njk` tiene estructura del grid anterior

## Design
- Cards con `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)`
- Borde decorativo alrededor del hexágono
- Grid uniforme: `grid-template-columns: repeat(3, 1fr)`
- Sin líneas decorativas entre cards
- Hover: escala suave + sombra

## Constraints
- No border-radius (inherente al clip-path)
- Sin JS
- Sin líneas decorativas de fondo
```

---

## 6. Grid posicionado 3×3 con líneas decorativas

**Commit:** `9fa098d`

**Prompt SDD:**

```
## Goal
Implementar un grid de servicios posicionado 3×3 con líneas decorativas CSS que conecten las cards visualmente, simulando un diagrama de arquitectura o blueprint.

## Context
- `servicios/index.njk` tiene cards simples sin grid definido
- `assets/css/theme.css` tiene estilos de cards básicos
- Se busca un diseño más visual y técnico

## Design
- Grid 3×3 con posicionamiento absoluto relativo
- Líneas decorativas horizontales y verticales entre cards usando pseudo-elementos
- Cards con borde sutil y sombra
- Fondo de sección con patrón de cuadrícula (blueprint aesthetic)
- Cada card con ícono + título + descripción corta

## Files
- `_specs/card.md` — spec del componente
- `servicios/index.njk` — estructura grid
- `assets/css/theme.css` — estilos del grid posicionado + líneas
- `seccionServicios.html` — mockup HTML de referencia
```

---

## 7. Actualizar paleta de colores

**Commit:** `63cca61`

**Prompt SDD:**

```
## Goal
Refactorizar la paleta de colores del proyecto: cambiar el color primario de #1e3a5f (o similar) a #0b2a4a (azul profundo). Actualizar todas las referencias en CSS, Tailwind config y templates Nunjucks.

## Context
- El color primario está hardcodeado en múltiples archivos
- `assets/css/theme.css` tiene clases `.bg-primary`, `.btn-primary`, etc. con valor antiguo
- `assets/js/tailwind-config.js` define la paleta Tailwind (solo design tokens, no usados en build)
- Templates usan clases Tailwind como `text-primary`, `bg-primary`
- Tailwind CDN + config de design tokens

## Changes needed
- `.bg-primary` → `background-color: #0b2a4a`
- `.btn-primary` → `background: #0b2a4a`
- `.btn-outline` → `border-color: #0b2a4a; color: #0b2a4a`
- Tailwind config: `primary` → `#0b2a4a`
- Templates: cualquier color hardcodeado (#1e3a5f, #1e40af, etc.) a #0b2a4a
- `hover:` estados ajustados para consistencia
```

---

## 8. Rediseño cards estilo "Qué resolvemos"

**Commit:** `dd0d7e6`

**Prompt SDD:**

```
## Goal
Rediseñar las service cards en la página de servicios para que coincidan visualmente con la sección "Qué resolvemos" de la home. Agregar robots.txt y sitemap.xml para SEO. Actualizar TECHNICAL_PLAN.md.

## Context
- `servicios/index.njk` tiene cards con diseño anterior
- Sección "Qué resolvemos" en home tiene un estilo específico de cards
- No hay robots.txt ni sitemap.xml
- `.eleventy.js` necesita configuración para archivos estáticos

## Changes
- Cards de servicios: mismo estilo visual que "Qué resolvemos" (borde, sombra, tipografía, layout de contenido)
- `_data/services.json` — agregar campo de descripción breve para cards
- `robots.txt` — permitir todo, apuntar a sitemap
- `sitemap.xml` — listar todas las URLs del sitio
- `.eleventy.js` — passthrough para archivos estáticos si es necesario
- `docs/TECHNICAL_PLAN.md` — actualizar estado de deuda técnica conocida
```

---

## 9. Hero de servicios

**Commit:** `a665b51`

**Prompt SDD:**

```
## Goal
Rediseñar los heroes de la página de servicios (índice y páginas individuales de diagnóstico, modernización, sistemas web) con un estilo de héroe técnico/ingenieril. Crear spec `_specs/page-hero.md`.

## Context
- `servicios/index.njk` — hero principal de servicios
- `servicios/diagnostico-tecnico/index.njk` — hero de diagnóstico
- `servicios/modernizacion-web/index.njk` — hero de modernización
- `servicios/sistemas-web/index.njk` — hero de sistemas web
- 4 servicios más tienen heroes similares

## Design spec (`_specs/page-hero.md`)
Cada hero debe tener:
- Fondo primary (#0b2a4a) con patrón de cuadrícula (blueprint)
- Blur gradient decorativo
- Eyebrow en singular, uppercase, tracking wide
- Título H1 en Playfair Display, blanco
- Subtítulo descriptivo
- CTA buttons (máximo 2)

## Pattern
```njk
<section class="relative py-24 bg-primary network-pattern overflow-hidden">
  <div class="absolute top-1/4 -left-20 w-96 h-96 bg-white/5 gradient-blur"></div>
  <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
    <p class="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">Servicios</p>
    <h1 class="mt-3 font-display text-4xl md:text-6xl text-white">...</h1>
    ...
  </div>
</section>
```

## Constraints
- Sin border-radius
- Sin JS
- Mismo patrón en todos los heroes de servicio
```

---

## 10. Rediseño página de servicios

**Commit:** `5dc86dc`

**Prompt SDD:**

```
## Goal
Rediseñar la página de servicios con nuevo layout: introducir la sección de CTA evolution (card con esfera decorativa). Actualizar `_specs/cta-evolution.md` con el diseño. Crear `servicesSection.html` como mockup de referencia HTML.

## Context
- `servicios/index.njk` tiene diseño actual de servicios
- `assets/css/theme.css` tiene estilos existentes
- No hay spec para el CTA evolution

## Changes
- `servicios/index.njk` — nuevo layout de página con hero actualizado + service blocks + CTA evolution
- `assets/css/theme.css` — clases `.cta-evolution-*` (card, sphere, title, copy, actions, note)
- `_specs/cta-evolution.md` — spec del componente CTA evolution
- `servicesSection.html` — mockup HTML standalone del diseño completo (507 líneas)

## CTA Evolution design
- Card con gradiente primario y cuadrícula overlay
- Esfera decorativa (círculo blanco) sobresaliendo del borde superior
- Título "¿No sabes por cuál empezar?" en Playfair Display
- Descripción + 2 CTAs (Solicitar diagnóstico, Ver método)
- Sin border-radius
- Sombra pronunciada
```
