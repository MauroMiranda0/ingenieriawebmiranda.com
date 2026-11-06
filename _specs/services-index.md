# Services Index

**Archivo fuente:** `_includes/partials/services-index.njk`, `servicios/index.njk`, `_data/serviceBlocks.json`

Índice de navegación rápida de los 6 servicios de `/servicios/`. Es un bloque superior, no un menú lateral: presenta el catálogo completo y permite saltar a cada módulo sin recorrer la página.

---

## Estructura

```html
<section id="servicios-indice" class="scroll-mt-20 border-y border-slate-200 bg-slate-50">
  <div class="max-w-7xl mx-auto px-6 py-12 md:py-16">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div class="max-w-xl">
        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">Índice de servicios</p>
        <h2 class="mt-2 font-display text-2xl md:text-3xl text-primary">Seis servicios, una ruta de evolución</h2>
      </div>
      <p class="max-w-md text-sm text-slate-600 leading-relaxed md:text-right">
        Empieza por el diagnóstico o salta al bloque que responde a tu necesidad.
      </p>
    </div>

    <nav aria-label="Índice de los 6 servicios" class="mt-8">
      <ol class="grid grid-cols-1 border-l border-t border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-3">
        <li class="border-b border-r border-slate-200">
          <a href="#servicio-diagnostico-tecnico" class="group flex h-full items-start gap-4 p-5 ...">
            <span aria-hidden="true">01</span>
            <span>
              <span>Diagnóstico</span>
              <span>Diagnóstico técnico</span>
            </span>
            <span class="material-icons" aria-hidden="true">arrow_outward</span>
          </a>
        </li>
        <!-- 5 items más -->
      </ol>
    </nav>
  </div>
</section>
```

## Orden canónico

El índice se genera con el orden de `_data/serviceBlocks.json`. Ese orden es la fuente de verdad y debe coincidir con los bloques de `/servicios/`.

| #   | Servicio                      | Anchor                          |
| --- | ----------------------------- | ------------------------------- |
| 01  | Diagnóstico técnico           | `#servicio-diagnostico-tecnico` |
| 02  | Modernización web             | `#servicio-modernizacion-web`   |
| 03  | Performance & Core Web Vitals | `#servicio-performance`         |
| 04  | Sistemas web                  | `#servicio-sistemas-web`        |
| 05  | Arquitectura & Modernización  | `#servicio-arquitectura`        |
| 06  | Seguridad & DevSecOps         | `#servicio-seguridad`           |

**Criterio:** entrada por diagnóstico, evolución del sitio existente (modernización y performance), construcción de plataformas (sistemas), decisiones estructurales (arquitectura) y endurecimiento transversal (seguridad). El orden es de catálogo, no una secuencia obligatoria de contratación.

## Reglas visuales

- Fondo `bg-slate-50` con bordes superior e inferior `border-slate-200`; el índice se separa del hero y del bloque de proceso.
- Grid tipo blueprint: borde exterior y celdas con `border-r`/`border-b`; sin `border-radius`.
- Número de orden en Playfair Display (`font-display`), `text-slate-500`; decorativo (`aria-hidden`).
- Eyebrow en `text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500`.
- Título en `font-display text-lg text-primary`.
- Hover: fondo `bg-primary`, número/eyebrow en `text-white/70`, título y flecha en blanco. La flecha usa Material Icons `arrow_outward`.
- Sin sombras ni tarjetas flotantes; la retícula de bordes es el elemento gráfico.

## Responsive

| Breakpoint      | Columnas |
| --------------- | -------- |
| < 640px         | 1        |
| ≥ 640px (`sm`)  | 2        |
| ≥ 1024px (`lg`) | 3        |

Cada enlace ocupa el alto completo de su celda (`h-full`) para que las filas queden parejas.

## Comportamiento

- Cada enlace apunta al `id` del `ServiceBlock` correspondiente.
- `html { scroll-behavior: smooth; }` se aplica solo si el usuario no pide movimiento reducido (`prefers-reduced-motion: no-preference`).
- Los bloques destino usan `scroll-mt-20` para compensar el header fijo de 5rem.

## Accesibilidad

- `<nav aria-label="Índice de los 6 servicios">` agrupa la navegación.
- Lista semántica `<ol>`/`<li>`; el número y la flecha son decorativos.
- El nombre accesible del enlace combina eyebrow + título.
- Foco visible con `focus-visible:outline-2` y offset; no depende solo del color.
- Contraste: `text-slate-500` sobre blanco ≥ 4.5:1; blanco y `white/70` sobre `#0B2A4A` ≥ 4.5:1.
