# ServiceShowcase — Vitrina completa de servicios

**Spec type**: Componente de página
**Status**: Draft
**Constitution version**: 1.0.0

---

## 0. Propósito

Reemplazar el índice de anchors + 6 bloques de servicio extensos en `/servicios/` por una **vitrina visual compacta** que muestre los 6 servicios en un formato atractivo tipo showcase de dos niveles: un resumen narrativo superior (timeline + imagen + texto) seguido de una grilla de 6 cards con acceso rápido a la información clave de cada servicio.

El hero de la página y el CTA final permanecen intactos.

---

## 1. Diseño visual

### Principios (derivados de la constitución)

| Principio | Aplicación |
|-----------|------------|
| Blueprint aesthetic | Sin border-radius en cards, dots cuadrados, bordes rectos |
| Playfair Display | Títulos H2/H3 del showcase |
| Inter / font-sans | Cuerpo, labels, botones |
| Paleta `primary` (#0b2a4a) | Color dominante, acentos en azul |
| Sin framework JS | Stepper y grid con CSS puro, sin carruseles JS |

---

## 2. Estructura del showcase

```
┌──────────────────────────────────────────────────┐
│  ── TOP: TIMELINE + NARRATIVA ──                 │
│                                                   │
│  H2: "De la diagnosis a la evolución"             │
│                                                   │
│  [Paso 1] ─── [Paso 2] ─── [Paso 3]             │
│  Diagnóstico   Transformación   Escalabilidad     │
│                                                   │
│  [imagen decorativa izq]  [texto descriptivo der] │
│                                                   │
├──────────────────────────────────────────────────┤
│  ── BOTTOM: GRILLA DE 6 SERVICIOS ──             │
│                                                   │
│  H2: "6 servicios, un enfoque"                    │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Card 1  │ │ Card 2  │ │ Card 3  │            │
│  │ img     │ │ img     │ │ img     │            │
│  │ título  │ │ título  │ │ título  │            │
│  │ desc    │ │ desc    │ │ desc    │            │
│  │ [→]     │ │ [→]     │ │ [→]     │            │
│  └─────────┘ └─────────┘ └─────────┘            │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Card 4  │ │ Card 5  │ │ Card 6  │            │
│  │ img     │ │ img     │ │ img     │            │
│  │ título  │ │ título  │ │ título  │            │
│  │ desc    │ │ desc    │ │ desc    │            │
│  │ [→]     │ │ [→]     │ │ [→]     │            │
│  └─────────┘ └─────────┘ └─────────┘            │
└──────────────────────────────────────────────────┘
```

---

## 3. Componentes detallados

### 3.1 Timeline (stepper)

```
[Diagnóstico]  •  [Transformación]  •  [Escalabilidad]
```

- 3 pasos horizontales con línea conectora
- Dots: cuadrados de 12×12px, sin border-radius
- Label: `text-xs font-semibold tracking-[0.18em] uppercase` en singular
- Línea conectora: `h-px bg-slate-200` entre dots
- Paso central (Transformación) resaltado con color `primary`

### 3.2 Bloque narrativo

```
[imagen 75% ancho atrás]  [texto]
[imagen 85% ancho al frente con sombra]
```

- Dos imágenes superpuestas estilo gallery
- Sombra: `shadow-[0_30px_50px_-15px_rgba(11,42,74,0.3)]`
- Sin border-radius en imágenes
- Texto: 2 párrafos, `text-slate-600`, `leading-relaxed`

### 3.3 Service card

```
┌──────────────────────┐
│ [imagen]             │
│                      │
│ TÍTULO UPPERCASE     │
│ descripción breve    │
│ [→ botón cuadrado]   │
└──────────────────────┘
```

| Propiedad | Valor |
|-----------|-------|
| Border | `border border-slate-200` |
| Background | `bg-white` |
| Imagen | `h-44 w-full object-cover`, sin border-radius |
| Título H3 | `font-display text-primary text-sm font-bold tracking-widest uppercase` |
| Descripción | `text-sm text-slate-600 leading-relaxed` |
| Botón arrow | Cuadrado 32×32px `bg-primary text-white`, sin border-radius, hover `opacity-90` |

### 3.4 Grid

```css
grid-template-columns: repeat(3, 1fr);
gap: 1.5rem;
```

2 filas de 3 cards cada una.

---

## 4. Imágenes

Cada card usa la imagen de servicio existente en `/assets/img/`:

| Servicio | Imagen |
|----------|--------|
| Diagnóstico técnico | `/assets/img/diagnostico.png` |
| Modernización web | `/assets/img/modernizacion.png` |
| Performance | `/assets/img/optimization.png` |
| Sistemas web | `/assets/img/sistemas.png` |
| Arquitectura | `/assets/img/debt.png` |
| Seguridad | `/assets/img/security.png` |

Las imágenes del bloque narrativo superior usan las mismas assets del proyecto (diagnostico.png y modernizacion.png).

---

## 5. Contenido de cards

Cada card muestra:

| Card | Título | Descripción (de serviceBlocks.json) | CTA anchor |
|------|--------|--------------------------------------|------------|
| 1 | DIAGNÓSTICO TÉCNICO | Claridad antes de construir. Riesgos, oportunidades y próximos pasos documentados. | `/contacto/` |
| 2 | MODERNIZACIÓN WEB | De sitio a plataforma sostenible. Sin reescribir todo, sin perder lo que funciona. | `/contacto/` |
| 3 | PERFORMANCE | Reducimos fricción de carga e interacción. Mejor experiencia. Mejor conversión. | `/contacto/` |
| 4 | SISTEMAS WEB | Portales, dashboards e integraciones listos para operar y evolucionar. | `/contacto/` |
| 5 | ARQUITECTURA | Reducimos deuda técnica sin detener operación. Diseñamos un camino defendible. | `/contacto/` |
| 6 | SEGURIDAD | Reducimos superficie de ataque. Endurecemos la entrega. Priorizamos riesgos reales. | `/contacto/` |

---

## 6. Compliance check

| Principio constitucional | Compliance |
|-------------------------|------------|
| Sin border-radius en cards | ✅ Dots cuadrados, cards rectas, botón cuadrado |
| Playfair Display para títulos | ✅ H2, H3 con `font-display` |
| Inter para cuerpo | ✅ Descripciones con `font-sans` |
| Eyebrow en singular, sin puntuación | ✅ Labels de timeline en singular |
| H2 sin punto final | ✅ |
| Una acción primaria por sección | ✅ CTA global al pie de la página |
| Sin framework JS | ✅ Transiciones CSS, sin JS de interacción |
| Contenido en español (es-MX) | ✅ |
| IDs de sección en español (kebab-case) | ✅ |
| Sin duplicación de contenido | ✅ Contenido de serviceBlocks.json, una sola fuente |
| Entregables mencionados explícitamente | ✅ Cards resumen; detalle en `/contacto/` |

---

*This spec derives from the Constitution v1.0.0.*
