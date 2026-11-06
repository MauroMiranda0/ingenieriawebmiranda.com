# ProjectsTeaser

**Archivo fuente:** `_includes/partials/projects-teaser.njk`
**Datos:** `_data/projectsTeaser.json`

Teaser de proyectos técnicos en la Home. Se ubica entre `#metodo` y `#cta-final`.
Presenta el estado "En construcción", tres módulos en preparación y un CTA a `/proyectos/`.

---

## Estructura canónica

```html
<section class="py-24" id="proyectos">
  <div class="max-w-7xl mx-auto px-6">
    <article class="border border-slate-200 bg-white p-8 md:p-12">
      <!-- Encabezado: eyebrow + H2 + descripción + estado -->
      <div class="max-w-3xl">
        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">Proyectos</p>
        <h2 class="mt-3 font-display text-3xl md:text-4xl text-primary">Laboratorio técnico en construcción</h2>
        <p class="mt-4 text-base text-slate-600 leading-relaxed">Descripción del teaser.</p>
        <p class="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-500">
          <span class="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          En construcción
        </p>
      </div>

      <!-- Grid responsivo de módulos -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <a href="/proyectos/" class="group flex h-full flex-col border border-slate-200 bg-slate-50 p-6 ...">
          <span class="material-icons text-primary" aria-hidden="true">schema</span>
          <h3 class="mt-4 font-display text-lg text-primary">Patrones de arquitectura</h3>
          <p class="mt-2 text-sm text-slate-600 leading-relaxed">Descripción del módulo.</p>
          <span class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Ver proyecto
            <span class="material-icons text-base ..." aria-hidden="true">arrow_forward</span>
          </span>
        </a>
      </div>

      <!-- CTA de sección -->
      <div class="mt-10">
        <a class="btn btn-primary" href="/proyectos/">Ver proyectos</a>
      </div>
    </article>
  </div>
</section>
```

---

## Props (`_data/projectsTeaser.json`)

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `id` | string | Sí | ID de la sección (`proyectos`). |
| `eyebrow` | string | Sí | Etiqueta superior, singular y sin puntuación final. |
| `title` | string | Sí | H2 de la sección; nunca termina en punto. |
| `description` | string | Sí | Texto de apoyo del teaser. |
| `status` | string | Sí | Estado mostrado junto al punto animado. |
| `ctaLabel` | string | Sí | Texto del CTA principal. |
| `ctaUrl` | string | Sí | Destino del CTA principal (`/proyectos/`). |
| `items` | array | Sí | Lista de módulos; ver props de ítem. |

### Props de cada ítem

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `icon` | string | Sí | Nombre de Material Icon. |
| `title` | string | Sí | Título del módulo. |
| `description` | string | Sí | Descripción breve. |
| `ctaLabel` | string | Sí | Texto del enlace interno. |
| `url` | string | Sí | Destino del ítem (`/proyectos/`). |

El partial admite un objeto alternativo mediante la variable `teaser`:

```njk
{% set teaser = customTeaser %}
{% include "partials/projects-teaser.njk" %}
```

Si `teaser` no está definido, usa `projectsTeaser` como fuente por defecto.

---

## Reglas de uso

- **Sin `border-radius`** en la card ni en los ítems; el único círculo permitido es el punto de estado.
- Grid responsivo: 1 columna en mobile, 3 columnas desde `md` (`768px`).
- Íconos siempre Material Icons con `aria-hidden="true"`.
- Toda la card del módulo es navegable (`<a>`), con hover `hover:border-primary/40` y fondo blanco.
- Los enlaces apuntan a `/proyectos/`; si en el futuro existen anclas por módulo, cambiar solo el `url` en los datos.
- La sección va después de `#metodo` y antes de `#cta-final`.
