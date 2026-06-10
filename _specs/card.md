# Card

**Archivo fuente:** Tailwind utilitarios (sin clase CSS custom)

Contenedor de contenido estructurado. Siempre `<article>` semántico cuando representa una unidad de contenido independiente (caso, servicio, área). Puede ser `<a>` cuando la card completa es navegable.

---

## Variantes

### Card Default
Sobre fondos blancos. Hover con lift sutil.

```html
<article class="border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-px hover:border-primary/40">
  <!-- contenido -->
</article>
```

**Uso:** Listas de servicios (`/servicios/`), casos en `/casos/`.

---

### Card Feature
Sobre fondos ligeramente coloreados (`bg-slate-50`). Fondo semitransparente. Hover con sombra.

```html
<article class="border border-slate-200 bg-white/70 p-8 hover:shadow-xl transition-all">
  <!-- contenido -->
</article>
```

**Uso:** Áreas de transformación (home), grids de características.

---

### Card Link
Card completa navegable. Usa `<a>` en lugar de `<article>`.

```html
<a class="border border-slate-200 bg-white/70 p-8 hover:shadow-xl transition-all block" href="/servicios/diagnostico-tecnico/">
  <!-- contenido -->
</a>
```

**Uso:** Directorio de servicios en home (`/`).

---

### Card Blog Post
Inspirada en diseño `card-blog-post-lorem.html`. Reutiliza el patrón `zoomimg` / `zoom-wrap` / `fixico` / `fadef` para replicar el mismo hover visual de la imagen, con la diferencia funcional de que la lupa abre un modal con el detalle de entregables en lugar de agrandar la imagen.

```html
<article class="blog-card-post bg-white shadow-[0_1px_3px_rgba(34,25,25,0.4)] flex flex-col">
  <div class="h-px w-full bg-[#0099ff]"></div>
  <div class="zoomimg">
    <div class="zoom-wrap">
      <a href="" class="fixico" data-dialog-target="entregables-performance" aria-label="Ver detalle de entregables">
        <span class="material-icons" aria-hidden="true">search</span>
      </a>
      <img src="/assets/img/example.png" alt="Descripción" class="blog-card-post-image h-64 w-full object-cover" />
      <span class="fadef"></span>
    </div>
  </div>
  <div class="p-8 flex flex-col flex-1">
    <div class="grid grid-cols-2 gap-4 text-[12px] text-slate-700">
      <p class="italic">Servicio</p>
      <p class="text-right">Entregables: ...</p>
    </div>
    <h3 class="blog-card-post-title">Título</h3>
    <p class="blog-card-post-excerpt">Descripción del contenido.</p>
    <div class="mt-auto pt-10 relative min-h-[88px]">
      <a href="/ruta/" class="blog-card-post-cta">Saber más</a>
      <span class="blog-card-post-cta-overlay"></span>
      <span class="blog-card-post-cta-line-left"><span class="blog-card-post-cta-line-inner"></span></span>
      <span class="blog-card-post-cta-line-right"><span class="blog-card-post-cta-line-inner"></span></span>
    </div>
  </div>
</article>

<dialog id="entregables-performance" class="blog-card-dialog">
  <!-- detalle de entregables -->
</dialog>
```

**Uso:** Secciones de problema/solución en home (`#que-resolvemos`).

---

### Card Static
Sin hover. Para contenido informativo sin acción directa.

```html
<article class="border border-slate-200 bg-white/70 p-8">
  <!-- contenido -->
</article>
```

**Uso:** Resumen de casos en home (sin link directo a la card).

---

## Estructura interna habitual

```html
<article class="border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-px hover:border-primary/40">
  <!-- Badge / eyebrow (opcional) -->
  <span class="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-[11px] tracking-[0.12em] uppercase text-slate-600">
    Categoría
  </span>

  <!-- Título -->
  <h3 class="mt-4 text-xl font-display text-primary">Título de la card</h3>

  <!-- Descripción -->
  <p class="mt-3 text-sm leading-relaxed text-slate-600">Descripción del contenido.</p>

  <!-- Lista de detalles (opcional) -->
  <div class="mt-4">
    <p class="text-xs font-semibold tracking-[0.12em] uppercase text-slate-500">Decisiones clave</p>
    <ul class="mt-2 space-y-1 text-sm text-slate-700">
      <li>• Elemento uno</li>
      <li>• Elemento dos</li>
    </ul>
  </div>

  <!-- CTA interno (opcional) -->
  <a href="/ruta/" class="mt-5 inline-flex text-sm font-medium hero-link-tech text-primary">Ver caso</a>
</article>
```

---

## Tokens de diseño usados

| Token | Aplicación |
|-------|-----------|
| `primary` | `text-primary` en títulos, `hover:border-primary/40` |
| `background-light` / `white` | `bg-white`, `bg-white/70` |
| `border-slate-200` | borde base (accent) |

---

## Reglas de uso

- Siempre `<article>` para cards de contenido independiente; `<a>` solo cuando toda la card es un enlace.
- El padding es `p-6` (compacto) o `p-8` (feature) — no mezclar dentro del mismo grid.
- No añadir `border-radius` a las cards: el sistema usa esquinas rectas deliberadamente (identidad de marca técnica/blueprint).
- El hover de borde (`hover:border-primary/40`) aplica sobre `bg-white`; en `bg-white/70` usar `hover:shadow-xl`.
