# Page Hero

**Archivo fuente:** `servicios/index.njk`, `assets/css/theme.css`

Hero de pagina interna con fondo oscuro, contenido centrado y textura blueprint.
Inspirado en el patron de hero de pagina de servicios: titulo, descripcion y CTAs centrados sobre fondo primary.

---

## Estructura

```html
<section class="relative py-24 flex items-center min-h-[380px] md:min-h-[440px] overflow-hidden bg-primary network-pattern">
  <div class="absolute top-1/4 -left-20 w-96 h-96 bg-white/5 gradient-blur"></div>
  <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
    <p class="text-xs font-semibold tracking-[0.18em] uppercase text-white/60">eyebrow</p>
    <h1 class="mt-3 font-display text-4xl md:text-6xl text-white">Titulo</h1>
    <p class="mt-4 text-lg text-white/80 max-w-3xl mx-auto">Descripcion principal</p>
    <p class="mt-2 text-sm text-white/60 max-w-3xl mx-auto">Descripcion secundaria (opcional)</p>
    <div class="mt-8 flex flex-col sm:flex-row justify-center gap-6">
      <a class="btn btn-white" href="/contacto/">CTA primario</a>
      <a class="btn btn-ghost" href="/casos/">CTA secundario</a>
    </div>
  </div>
</section>
```

## Reglas visuales

- Fondo `bg-primary` (#0D2B45) con `network-pattern` para textura blueprint.
- Elemento decorativo `gradient-blur` para profundidad (replicado del home hero).
- Contenido centrado horizontal y verticalmente vía flexbox.
- Tipografia: eyebrow sans-serif tracking ancho, H1 Playfair Display, cuerpo Inter.
- CTAs: `btn-white` (primario) y `btn-ghost` (secundario) sobre fondo oscuro.
- Sin border-radius en contenedores (consistente con la constitucion).

## Responsive

- En movil, `min-h-[380px]`; a partir de `md`, `min-h-[440px]`.
- CTAs se apilan en columna en pantallas angostas (`flex-col sm:flex-row`).
- H1 reduce a `text-4xl` en movil, `text-6xl` en desktop.

## Accesibilidad

- Texto blanco sobre fondo oscuro mantiene contraste alto.
- Estados `:focus-visible` heredados de `.btn`.
- Elemento decorativo con opacidad baja no interfiere con contenido.
