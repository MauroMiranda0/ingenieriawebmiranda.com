# SectionHeader

**Archivo fuente:** Tailwind utilitarios (sin clase CSS custom)

Patrón de encabezado de sección. Combina un eyebrow label, un título H2 y una descripción opcional.
Es el componente de mayor frecuencia en el sitio — aparece en la apertura de casi todas las secciones.

---

## Estructura canónica

```html
<div class="max-w-3xl">
  <p class="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">Eyebrow label</p>
  <h2 class="mt-3 font-display text-3xl md:text-4xl text-primary">Título de la sección</h2>
  <p class="mt-4 text-base text-slate-600">Descripción de apoyo que contextualiza el contenido que sigue.</p>
</div>
```

---

## Variantes

### Alineado a la izquierda (default)
```html
<div class="max-w-3xl">
  <p class="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">Label</p>
  <h2 class="mt-3 font-display text-3xl md:text-4xl text-primary">Título</h2>
  <p class="mt-4 text-base text-slate-600">Descripción.</p>
</div>
```
**Uso:** Mayoría de secciones interiores.

---

### Centrado
```html
<div class="text-center mb-20">
  <h2 class="font-display text-5xl text-primary mb-6">Título grande</h2>
  <p class="text-slate-500 max-w-2xl mx-auto uppercase tracking-widest text-sm">Subtítulo</p>
</div>
```
**Uso:** Secciones héroe de páginas internas, sección Método en home. El eyebrow se omite; el subtítulo usa `uppercase tracking-widest`.

---

### Con CTA inline (split)
Header a la izquierda + link a la derecha en desktop.

```html
<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
  <div>
    <h2 class="font-display text-4xl text-primary mb-4">Título</h2>
    <p class="text-slate-600 max-w-2xl leading-relaxed">Descripción.</p>
  </div>
  <a class="inline-flex items-center gap-2 text-primary font-medium hover:opacity-80 transition" href="/ruta/">
    Ver todos <span class="material-icons text-base">arrow_forward</span>
  </a>
</div>
```
**Uso:** Sección de casos en home.

---

## Tokens de diseño usados

| Token | Aplicación |
|-------|-----------|
| `primary` | `text-primary` en el H2 |
| `font-display` | Fuente del H2 |
| `font-sans` | Fuente del eyebrow y descripción (default body) |
| `text-slate-500` | Color del eyebrow |
| `text-slate-600` | Color de la descripción |

---

## Reglas de uso

- El eyebrow siempre en singular, sin puntuación final.
- El H2 nunca termina en punto — es un título, no una oración.
- `max-w-3xl` en el wrapper garantiza que la descripción no se extienda demasiado en viewports anchos.
- En variante centrada, la descripción lleva `max-w-2xl mx-auto`.
- `mb-10` o `mb-14` separa el SectionHeader del contenido que sigue (cards, listas, etc.).
