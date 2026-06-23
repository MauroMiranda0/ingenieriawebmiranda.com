# SPECIFICATION — Ingeniería Web Miranda

Especificación funcional del sitio. Describe qué existe, qué hace cada página y qué componentes usa.
Es la referencia para evaluar si el sitio está completo y correcto.

---

## 1. Mapa del sitio

```
/                               Home (vitrina con 6 cards → anclas a /servicios/)
├── /servicios/                 Página única con 6 bloques completos + índice
│                               (Diagnóstico, Modernización, Performance,
│                                Sistemas, Arquitectura, Seguridad)
├── /casos/                     Catálogo de casos
│   ├── /migracion-pwa/         Caso: Migración a PWA
│   ├── /landing-captacion/     Caso: Landing de captación
│   └── /sitio-de-servicios/    Caso: Sitio de servicios
├── /metodo/                    Método de trabajo
├── /recursos/                  Recursos técnicos
├── /proyectos/                 Proyectos técnicos (en construcción)
├── /contacto/                  Formulario de diagnóstico
└── /legal/
    ├── /privacidad/            Política de privacidad
    └── /terminos/              Términos y condiciones
```

**Total: 12 páginas** (6 páginas de servicio individual consolidadas en `/servicios/`)

---

## 2. Componentes globales

Presentes en las 18 páginas vía `_includes/layouts/base.njk`.

| Componente | Archivo | Variantes |
|-----------|---------|-----------|
| `<head>` con SEO | `_includes/partials/head.njk` | única |
| Navegación | `_includes/partials/nav.njk` | estándar (16p) |
| Navegación legal | `_includes/partials/nav-legal.njk` | `/legal/*` (2p) |
| Footer | `_includes/partials/footer.njk` | única |

### Navegación — items

| Label | Ruta |
|-------|------|
| Servicios | `/servicios/` |
| Casos | `/casos/` |
| Método | `/metodo/` |
| Recursos | `/recursos/` |
| Proyectos | `/proyectos/` |
| Solicitar diagnóstico (CTA) | `/contacto/` |

---

## 3. Especificación de páginas

### 3.1 Home (`/`)

**Propósito:** Página de entrada. Comunica propuesta de valor, áreas de servicio y credibilidad técnica. Dirige al diagnóstico.

**Secciones en orden:**

| ID | Título | Componentes usados |
|----|--------|--------------------|
| — | Hero | `.hero-blueprint`, `.network-pattern`, `.gradient-blur`, `.btn-primary`, `.hero-link-tech` |
| `#que-resolvemos` | Qué resolvemos | SectionHeader, 6× Card Blog Post con imagen, CTA "Saber más" con enlace a `/servicios/#servicio-{slug}`. Sin modal de entregables |
| `#areas` | Áreas clave | SectionHeader, carrusel nativo de 4× Card Feature con Material Icons y navegación previa/siguiente |
| `#casos-accion` | Transformación digital en acción | SectionHeader split, 3× Card interactiva con ícono Material, intro mínima, ilustración técnica, decisiones clave, enlace "Ver caso" y CTAs al pie |
| `#metodo` | Método de ingeniería | SectionHeader centrado, diagrama de fases con `.node-glow`, `.btn-outline` |
| — | Proyectos teaser | Card estático ancho, `.btn-primary` |
| `#cta-final` | CTA final | H2 grande, `.btn-white`, `.btn-ghost` sobre `bg-primary` |

**JSON-LD:** Organization schema.

---

### 3.2 Servicios (`/servicios/`)

**Propósito:** Página única que contiene el desarrollo completo de los 6 servicios. Sin cards de preview. Cada servicio es un módulo narrativo completo con índice de navegación rápida via anchors.

**Secciones:**
| Bloque | Anchor ID | Componentes |
|--------|-----------|-------------|
| Hero de sección | — | PageHero con título, descripción y CTAs |
| Índice de navegación | `#servicios-indice` | Lista horizontal/vertical de 6 anchors con scroll suave |
| Diagnóstico técnico | `#servicio-diagnostico-tecnico` | ServiceBlock (eyebrow + H2 + desc + entregables + beneficios + señales + áreas + CTA) |
| Modernización web | `#servicio-modernizacion-web` | ServiceBlock |
| Performance | `#servicio-performance` | ServiceBlock |
| Sistemas web | `#servicio-sistemas-web` | ServiceBlock |
| Arquitectura | `#servicio-arquitectura` | ServiceBlock |
| Seguridad | `#servicio-seguridad` | ServiceBlock |

**Fuente de contenido:** Cada bloque se construye con el contenido de las antiguas páginas individuales (`servicios/*/index.njk`), ahora inline en `servicios/index.njk`.

**Nota de migración:** Las 6 páginas de servicio individual (`/servicios/diagnostico-tecnico/`, `/modernizacion-web/`, `/performance/`, `/seguridad/`, `/sistemas-web/`, `/arquitectura/`) se consolidan en esta única página. Los contenidos de cada una (hero, problemas, entregables, grid-6, proceso, FAQ, CTA) se integran como secciones del bloque correspondiente.

---

### 3.9 Casos (`/casos/`)

**Propósito:** Listado de los 3 casos documentados. Credibilidad a través de trabajo real.

---

### 3.10 Caso: Migración a PWA (`/casos/migracion-pwa/`)

**Propósito:** Documentar la implementación técnica con decisiones clave y entregables.

**Entregables documentados:** Estructura PWA, Service Worker, Web App Manifest, estrategia de caché.

---

### 3.11 Caso: Landing de captación (`/casos/landing-captacion/`)

**Propósito:** Documentar arquitectura de secciones, CTA y base SEO técnico on-page.

**Entregables documentados:** Estructura de secciones, jerarquía de CTAs, base SEO.

---

### 3.12 Caso: Sitio de servicios (`/casos/sitio-de-servicios/`)

**Propósito:** Documentar estructura de sitio de servicios con microcopy, señales de confianza y rutas de intención.

**Entregables documentados:** Estructura completa de sitio, microcopy, checklist de confianza, formulario con rutas de intención.

---

### 3.13 Método (`/metodo/`)

**Propósito:** Explicar el proceso de trabajo. Genera confianza en la metodología antes del diagnóstico.

**Fases:** Discovery → Architecture → Implementation → Evolution.

---

### 3.14 Recursos (`/recursos/`)

**Propósito:** Checklists y guías técnicas descargables o consultables. Posicionamiento como autoridad técnica.

---

### 3.15 Proyectos (`/proyectos/`)

**Propósito:** Vitrina de proyectos técnicos propios. Estado actual: en construcción.

---

### 3.16 Contacto (`/contacto/`)

**Propósito:** Formulario de solicitud de diagnóstico. Página de conversión principal.

**Campos del formulario:** Nombre, Email, Teléfono, Organización (opcional), Tipo de necesidad, Descripción del reto, Método preferido de contacto, Link (opcional).

**Backend:** Formspree (endpoint `xpqjevwp`).

**JSON-LD:** ContactPage schema.

---

### 3.17 Privacidad (`/legal/privacidad/`)

**Propósito:** Política de privacidad. Página de referencia, no de conversión.

**Layout:** `nav-legal` (nav simplificado, `max-w-4xl`).

---

### 3.18 Términos (`/legal/terminos/`)

**Propósito:** Términos y condiciones. Página de referencia, no de conversión.

**Layout:** `nav-legal` (nav simplificado, `max-w-4xl`).

---

## 4. Requisitos SEO por página

| Página | `title` único | `description` única | `ogTitle` específico | JSON-LD |
|--------|:---:|:---:|:---:|:---:|
| Todas las 18 | ✅ | ✅ | ✅ | Solo home y contacto |

### Patrón de `title`
- Home: `[Marca] | [Tagline]`
- Páginas internas: `[Nombre página] | [Marca]`
- Casos: `Caso | [Nombre] | [Marca]`
- Servicios: `[Nombre servicio] | [Marca]`

---

## 5. Requisitos de accesibilidad

| Requisito | Estado |
|-----------|--------|
| Skip link (`.skip-link`) | ✅ implementado en layout (`base.njk:8`) y CSS (`theme.css:307`) |
| `aria-current="page"` en nav activo | ✅ implementado dinámicamente |
| `aria-label` en botón hamburguesa | ✅ |
| `aria-expanded` en menú móvil | ✅ gestionado por `ui.js` |
| `alt` en todas las imágenes | ✅ |
| Contraste — texto sobre `bg-primary` | ✅ blanco sobre `#0D2B45` |

---

## 6. Comportamiento global de JS (`assets/js/ui.js`)

| Función | Selector | Descripción |
|---------|----------|-------------|
| Año de copyright | `#copyright-year` | Rellena con `new Date().getFullYear()` |
| Toggle menú móvil | `#menu-toggle` / `#mobile-menu` | Alterna `hidden`, `aria-expanded` y el ícono |
