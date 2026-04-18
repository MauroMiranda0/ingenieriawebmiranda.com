# NavLink y HeroLink

**Archivo fuente:** `assets/css/theme.css`

Dos clases de enlace con subrayado animado. Distintos contextos de uso — no son intercambiables.

---

## NavLink (`.nav-link-tech`)

Enlace de navegación con subrayado que crece desde la izquierda al hacer hover/focus.

### Comportamiento

```css
/* Base */
position: relative;
transition: color 240ms ease;

/* Subrayado (excluye .btn-primary) */
.nav-link-tech:not(.btn-primary)::after {
  content: "";
  position: absolute;
  left: 0; bottom: -2px;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 240ms ease;
}

/* Hover / focus-visible: color primary + subrayado visible */
/* Focus-visible: además outline 1px solid currentColor, offset 3px */
```

### Estructura HTML

```html
<a class="hover:text-primary transition-colors nav-link-tech" href="/servicios/">Servicios</a>
```

### Interacción con `.btn-primary`

Cuando el CTA de la nav usa ambas clases, el selector `:not(.btn-primary)` excluye el subrayado del botón:

```html
<a class="btn btn-primary nav-link-tech" href="/contacto/">Solicitar diagnóstico</a>
```

### Contextos de uso

- Links de texto en la barra de navegación (desktop y mobile)
- Solo dentro de `<nav>` — no usar en contenido de página

---

## HeroLink (`.hero-link-tech`)

Enlace inline con subrayado más sutil que crece al hacer hover. Para CTAs secundarios dentro del contenido.

### Comportamiento

```css
position: relative;
display: inline-block;
padding-bottom: 2px;
transition: color 180ms ease;

::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1px;
  background: rgba(13, 43, 69, 0.55); /* primary con 55% opacity */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

:hover { color: #0d2b45 (primary) }
:hover::after { transform: scaleX(1) }
```

### Diferencia con NavLink

| | `.nav-link-tech` | `.hero-link-tech` |
|--|--|--|
| Velocidad | 240ms | 180–220ms |
| Color del subrayado | `currentColor` (100%) | `primary/55` |
| Display | inline (dentro de flex) | `inline-block` |
| Focus accesible | `outline` explícito | no implementado |
| Uso | nav global | CTAs secundarios en secciones |

### Estructura HTML

```html
<a class="hero-link-tech text-primary hover:text-primary" href="/casos/">Ver casos</a>

<!-- Con contexto de sección -->
<a href="/contacto/" class="hero-link-tech text-primary">Solicitar diagnóstico</a>
```

### Contextos de uso

- CTAs de texto secundarios en secciones (hero, cards, secciones internas)
- Links "Ver más" dentro de cards como alternativa a un botón completo
- No usar en la barra de navegación (usar `.nav-link-tech`)

---

## Reglas comunes

- Ambas clases no tienen `border-radius` — mantener consistencia con el sistema de esquinas rectas.
- No combinar `.nav-link-tech` y `.hero-link-tech` en el mismo elemento.
- Para accesibilidad completa en links de contenido crítico, preferir `.nav-link-tech` que tiene `focus-visible` explícito.
