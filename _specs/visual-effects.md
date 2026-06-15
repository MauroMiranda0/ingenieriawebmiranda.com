# Efectos visuales

**Archivo fuente:** `assets/css/theme.css`

Clases de efecto decorativo. No transmiten información — son puramente estéticas.
Aplicar con moderación; siempre con `aria-hidden="true"` o en elementos no interactivos.

---

## `.network-pattern`

Patrón de puntos tipo blueprint sobre el fondo. Se aplica a secciones de fondo completo.

```css
background-image: radial-gradient(circle at 2px 2px, rgba(13, 43, 69, 0.05) 1px, transparent 0);
background-size: 40px 40px;
```

**Uso:**
```html
<section class="relative min-h-screen flex items-center network-pattern">
```

**Contexto:** Sección hero del home. Crea textura sutil sin distraer del contenido.

---

## `.gradient-blur`

Blob de color difuminado para crear profundidad de campo. Siempre con `pointer-events-none` y posición absoluta.

```css
filter: blur(100px);
opacity: 0.4;
```

**Uso:**
```html
<div class="absolute top-1/4 -right-20 w-96 h-96 bg-primary rounded-full gradient-blur pointer-events-none" aria-hidden="true"></div>
```

**Contexto:** Complementa al `.network-pattern` en el hero. El `rounded-full` es intencional para el blob circular.

---

## `.node-glow`

Sombra suave tipo "glow" para círculos de iconos en diagramas de proceso.

```css
box-shadow: 0 0 20px rgba(13, 43, 69, 0.2);
```

**Uso:**
```html
<div class="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 node-glow">
  <span class="material-icons text-primary">travel_explore</span>
</div>
```

**Contexto:** Nodos del diagrama de fases en `/metodo/`.

---

## `.connector-line`

Gradiente horizontal que simula una línea de conexión entre nodos.

```css
background: linear-gradient(90deg, transparent, rgba(13, 43, 69, 0.2), transparent);
```

**Uso:**
```html
<div class="connector-line h-px w-full" aria-hidden="true"></div>
```

**Contexto:** Reservado para diagramas tipo blueprint/arquitectura. No implementado actualmente en páginas — disponible para secciones de método o arquitectura.

---

## `.hero-blueprint`

*(Clase reservada — anteriormente usada para animación de flotación en imagen PNG. Reemplazada por video de fondo.)*

**Contexto:** Solo en el hero del home. Actualmente es un selector semántico (sin animación CSS) aplicado al contenedor del video.

---

## Hero video (`<video>`)

Video de fondo animado para la sección hero del home. Reemplaza la imagen PNG estática + animación CSS.

**Uso:**
```html
<video
  class="w-full h-full object-cover"
  src="/assets/animacionIWM.mp4"
  autoplay
  muted
  loop
  playsinline
  aria-hidden="true">
</video>
```

**Contexto:** Solo en el hero del home. El video se reproduce en bucle, sin sonido, y no requiere interacción del usuario. Se usa `aria-hidden="true"` por ser puramente decorativo. Compatible con los overlays `.hero-grid-overlay` y `gradient-blur` existentes.

---

## Reglas de uso

- Los efectos decorativos nunca deben contener contenido informativo.
- `.gradient-blur` y `.connector-line` requieren `pointer-events-none` para no bloquear interacción.
- No duplicar `.hero-blueprint` en otras páginas — la animación pierde impacto si se repite.
- No usar `.network-pattern` en secciones con texto pequeño o fondos oscuros: reduce legibilidad.
