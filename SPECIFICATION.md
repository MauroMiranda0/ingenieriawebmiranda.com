# SPECIFICATION — Ingeniería Web Miranda

Especificación funcional del sitio. Describe qué existe, qué hace cada página y qué componentes usa.
Es la referencia para evaluar si el sitio está completo y correcto.

---

## 1. Mapa del sitio

```
/                               Home
├── /servicios/                 Catálogo de servicios
│   ├── /diagnostico-tecnico/   Servicio: Diagnóstico técnico
│   ├── /modernizacion-web/     Servicio: Modernización web
│   ├── /performance/           Servicio: Performance (Core Web Vitals)
│   ├── /seguridad/             Servicio: Seguridad & DevSecOps
│   ├── /sistemas-web/          Servicio: Desarrollo de sistemas web
│   └── /arquitectura/          Servicio: Arquitectura & Modernización
├── /casos/                     Catálogo de casos
│   ├── /migracion-pwa/         Caso: Migración a PWA
│   ├── /landing-captacion/     Caso: Landing de captación
│   └── /landing-servicios/     Caso: Landing de servicios
├── /metodo/                    Método de trabajo
├── /recursos/                  Recursos técnicos
├── /proyectos/                 Proyectos técnicos (en construcción)
├── /contacto/                  Formulario de diagnóstico
└── /legal/
    ├── /privacidad/            Política de privacidad
    └── /terminos/              Términos y condiciones
```

**Total: 18 páginas**

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
| `#que-resolvemos` | Qué resolvemos | SectionHeader, 3× Card Default |
| `#casos` | Casos (featured) | SectionHeader, 3× Card Default con `.hero-link-tech` |
| `#areas` | Áreas clave | SectionHeader, 4× Card Feature con Material Icons |
| `#casos-accion` | Transformación digital en acción | SectionHeader split, 3× Card Static |
| `#servicios` | Servicios | SectionHeader, 4× Card Link |
| `#metodo` | Método de ingeniería | SectionHeader centrado, diagrama de fases con `.node-glow`, `.btn-outline` |
| — | Proyectos teaser | Card estático ancho, `.btn-primary` |
| `#cta-final` | CTA final | H2 grande, `.btn-white`, `.btn-ghost` sobre `bg-primary` |

**JSON-LD:** Organization schema.

---

### 3.2 Servicios (`/servicios/`)

**Propósito:** Catálogo de los 6 servicios con descripción y link a página profunda.

**Secciones:** Hero de sección, grid de 6 cards con link a cada servicio.

---

### 3.3 Servicio: Diagnóstico técnico (`/servicios/diagnostico-tecnico/`)

**Propósito:** Explicar en detalle el servicio de diagnóstico. Justificar el valor de hacerlo antes de construir.

**Audiencia principal:** Empresas que no saben por dónde empezar o que tienen problemas técnicos sin diagnóstico.

---

### 3.4 Servicio: Modernización web (`/servicios/modernizacion-web/`)

**Propósito:** Explicar modernización progresiva como alternativa al rewrite total.

---

### 3.5 Servicio: Performance (`/servicios/performance/`)

**Propósito:** Posicionarse en Core Web Vitals y optimización de experiencia. Hablar el idioma de LCP, INP, CLS.

---

### 3.6 Servicio: Seguridad (`/servicios/seguridad/`)

**Propósito:** Hardening, OWASP, DevSecOps como práctica integrada (no auditoría puntual).

---

### 3.7 Servicio: Sistemas web (`/servicios/sistemas-web/`)

**Propósito:** Desarrollo de portales, dashboards e integraciones. Énfasis en operación real y escalabilidad.

---

### 3.8 Servicio: Arquitectura (`/servicios/arquitectura/`)

**Propósito:** Reducción de deuda técnica con roadmap documentado y ejecutable.

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

### 3.12 Caso: Landing de servicios (`/casos/landing-servicios/`)

**Propósito:** Documentar microcopy, señales de confianza y rutas de intención.

**Entregables documentados:** Microcopy, formulario con rutas de intención.

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
| Skip link (`.skip-link`) | Definido en `theme.css`, pendiente de implementar en layout |
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
| Toggle menú móvil | `#nav-toggle` / `#mobile-menu` | Alterna `hidden`, `aria-expanded` y el ícono |
