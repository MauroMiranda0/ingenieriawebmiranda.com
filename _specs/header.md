# Header / Nav

**Archivo fuente:** `_includes/partials/nav.njk` (estándar), `_includes/partials/nav-legal.njk` (legal)

Barra de navegación global. Presente en las 18 páginas a través del layout `_includes/layouts/base.njk`.

---

## Variantes

### Nav estándar (16 páginas)
```html
<header class="fixed w-full z-50 bg-background-light/80 backdrop-blur-md border-b border-slate-200">
```
- Posición: `fixed` — permanece visible al hacer scroll.
- Ancho máximo interno: `max-w-7xl`.
- Altura: `h-20`.

### Nav legal (2 páginas: `/legal/privacidad/`, `/legal/terminos/`)
```html
<header class="border-b border-slate-200 bg-background-light/90 backdrop-blur">
```
- Posición: en flujo normal (no fixed).
- Ancho máximo interno: `max-w-4xl` (alineado con el contenido legal).
- Tipografía: `text-xs tracking-[0.3em]` (más pequeña y espaciada).
- CTA: "Diagnóstico" (texto corto).

El selector de variante está en `base.njk`:
```nunjucks
{% if navStyle == 'legal' %}{% include "partials/nav-legal.njk" %}
{% else %}{% include "partials/nav.njk" %}{% endif %}
```
Front matter de páginas legales: `navStyle: "legal"`.

---

## Estructura HTML (nav estándar)

```html
<header class="fixed w-full z-50 bg-background-light/80 backdrop-blur-md border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

    <!-- Logo -->
    <a class="flex items-center gap-4" href="/">
      <img alt="Ingeniería Web Miranda Logo" class="h-12 w-auto" src="/assets/img/logo.png" />
    </a>

    <!-- Hamburger (mobile) -->
    <button
      class="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-primary hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      type="button" aria-label="Abrir menú" id="menu-toggle">
      <span class="material-icons" aria-hidden="true">menu</span>
    </button>

    <!-- Nav desktop -->
    <nav class="hidden md:flex items-center gap-10 font-medium text-sm tracking-widest uppercase">
      <a class="hover:text-primary transition-colors nav-link-tech" href="/servicios/"
         {% if '/servicios/' in page.url %}aria-current="page"{% endif %}>Servicios</a>
      <!-- ... otros links ... -->
      <a class="btn btn-primary nav-link-tech" href="/contacto/">Solicitar diagnóstico</a>
    </nav>
  </div>

  <!-- Nav mobile (oculta por defecto) -->
  <div class="md:hidden border-t border-slate-200 bg-background-light/95 backdrop-blur"
       id="mobile-menu" hidden>
    <nav class="flex flex-col gap-4 px-6 py-6 text-sm font-medium tracking-widest uppercase">
      <!-- mismos links con aria-current idéntico al desktop -->
    </nav>
  </div>
</header>
```

---

## Items de navegación

| Label | Ruta | `aria-current` activo en |
|-------|------|--------------------------|
| Servicios | `/servicios/` | `/servicios/*` |
| Casos | `/casos/` | `/casos/*` |
| Método | `/metodo/` | `/metodo/` |
| Recursos | `/recursos/` | `/recursos/` |
| Proyectos | `/proyectos/` | `/proyectos/` |
| Solicitar diagnóstico | `/contacto/` | nunca (es `.btn-primary`) |

El `aria-current="page"` se genera dinámicamente en Nunjucks: `{% if '/ruta/' in page.url %}`.

---

## Comportamiento JS

Controlado por `assets/js/ui.js`:
- `#menu-toggle` toggle del atributo `hidden` en `#mobile-menu`.
- Año de copyright `#y` (en footer, no en nav).

---

## Clases CSS propias usadas

- `.nav-link-tech` — underline animado en hover/focus. Excluye `.btn-primary` via `:not()`.
- `.nav-link-tech[aria-current="page"]` — estado activo: `color: primary` + underline permanente (`scaleX(1)`). Definido en `theme.css`.
- `.btn.btn-primary` — CTA de contacto.

---

## Tokens de diseño usados

| Token | Aplicación |
|-------|-----------|
| `background-light` | `bg-background-light/80` (fondo nav con transparencia) |
| `primary` | `hover:text-primary`, `hover:border-primary`, `.btn-primary` |
| `font-sans` | tipografía nav (default) |

---

## Reglas de uso

- No modificar `id="menu-toggle"` ni `id="mobile-menu"` — son selectores del JS.
- No usar `aria-current` en el CTA (`.btn-primary`) — solo en los links de texto.
- Si se agrega un nuevo item de nav, añadirlo en ambos bloques (desktop y mobile) y actualizar esta tabla.
- `nav.njk` está excluido de Prettier (`.prettierignore`) por tener Nunjucks inline en atributos. Editar manualmente con cuidado de indentación.
