# Tokens de diseño

**Archivo fuente:** `assets/js/tailwind-config.js`

Todos los valores visuales del sistema derivan de estos tokens.
No usar valores hexadecimales, tamaños o fuentes hardcoded fuera de este archivo y de `theme.css`.

---

## Colores

| Token | Valor | Uso principal |
|-------|-------|---------------|
| `primary` | `#0D2B45` | Títulos, CTAs, bordes activos, fondos de énfasis |
| `secondary` | `#1A3C5A` | Variante de primary para hover/estados secundarios |
| `background-light` | `#FDFDFD` | Fondo de página, nav, cards sobre fondo claro |
| `background-dark` | `#050B10` | Reservado para secciones oscuras (no implementado aún) |
| `accent` | `#E5E7EB` | Bordes neutros, separadores (equivale a `slate-200`) |

### Grises de contenido (Tailwind slate, no custom)

| Clase Tailwind | Uso |
|----------------|-----|
| `text-slate-800` | Cuerpo principal de texto |
| `text-slate-600` | Texto secundario / descripciones |
| `text-slate-500` | Labels, eyebrows, metadatos |
| `border-slate-200` | Borde neutro de cards y separadores |
| `bg-slate-50` | Fondo de secciones alternadas |

---

## Tipografía

| Token | Familia | Pesos disponibles | Uso |
|-------|---------|-------------------|-----|
| `font-display` | Playfair Display, serif | 400, 700 | Títulos H1–H3, nombres de componentes |
| `font-sans` | Inter, sans-serif | 300, 400, 600 | Cuerpo, labels, botones, nav |

### Escala tipográfica habitual

| Contexto | Clases Tailwind |
|----------|-----------------|
| Hero H1 | `font-display text-5xl md:text-7xl` |
| Section H2 | `font-display text-3xl md:text-4xl` |
| Card H3 | `font-display text-xl` o `text-base font-semibold` |
| Eyebrow / label | `text-xs font-semibold tracking-[0.18em] uppercase text-slate-500` |
| Cuerpo | `text-base text-slate-600` |
| Meta / caption | `text-xs text-slate-500` |

---

## Espaciado y layout

No hay tokens de espaciado custom; se usa la escala de Tailwind directamente (`p-6`, `py-24`, `gap-6`, etc.).

| Convención | Valor |
|------------|-------|
| Ancho máximo de contenido | `max-w-7xl mx-auto px-6` |
| Padding horizontal de secciones | `px-6` |
| Padding vertical de secciones | `py-20` – `py-32` según jerarquía |

---

## Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded` (DEFAULT) | `0.25rem` | Botones, inputs pequeños |
| `rounded-lg` | `0.5rem` | Cards, modales (uso poco frecuente) |

---

## Notas de implementación

- `primary` se usa también en `theme.css` como valor hexadecimal `#0D2B45` para mantener compatibilidad con Tailwind CDN (sin purge).
- Los tokens están en `tailwind.config = { ... }` (formato CDN inline), no en un archivo `tailwind.config.js` de Node. Si se migra a build process, ese formato cambia.
