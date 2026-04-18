# Button

**Archivo fuente:** `assets/css/theme.css`

Elemento de acción primaria del sistema. Siempre usa la clase base `.btn` más exactamente una variante.

---

## Variantes

| Clase | Fondo | Texto | Borde | Contexto de uso |
|-------|-------|-------|-------|-----------------|
| `.btn-primary` | `primary` (#0D2B45) | blanco | `primary` | CTA principal, sobre fondos claros |
| `.btn-outline` | transparente | `primary` | `primary` | CTA secundario, sobre fondos claros |
| `.btn-ghost` | transparente | blanco | `white/70` | CTA sobre fondos oscuros (`bg-primary`) |
| `.btn-white` | blanco | `primary` | ninguno | CTA principal sobre fondos oscuros |

---

## Estructura HTML

```html
<!-- Enlace (más común) -->
<a class="btn btn-primary" href="/contacto/">Solicitar diagnóstico</a>

<!-- Con ícono Material -->
<a class="btn btn-outline" href="/metodo/">
  Ver método completo <span class="material-icons">arrow_forward</span>
</a>

<!-- Botón de formulario -->
<button class="btn btn-primary w-full" type="submit">Enviar solicitud</button>
```

---

## Propiedades base (`.btn`)

```css
display: inline-flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
padding: 1rem 2rem;          /* py-4 px-8 */
font-size: 0.875rem;          /* text-sm */
font-weight: 700;             /* font-bold */
text-transform: uppercase;
letter-spacing: 0.1em;        /* tracking-widest aprox. */
transition: all 200ms ease;
```

---

## Estados

| Estado | `.btn-primary` | `.btn-outline` | `.btn-ghost` | `.btn-white` |
|--------|----------------|----------------|--------------|--------------|
| hover | `opacity: 0.9` | fondo `primary`, texto blanco | `border-color: white` | `opacity: 0.9` |
| focus-visible | heredado del navegador | heredado | heredado | heredado |
| disabled | no implementado | no implementado | no implementado | no implementado |

---

## Interacción con `.nav-link-tech`

Cuando `.btn-primary` se usa dentro de la nav junto a `.nav-link-tech`, el selector `:not(.btn-primary)` en `nav-link-tech` excluye al botón del subrayado animado. Esta combinación está prevista en el diseño.

---

## Reglas de uso

- Máximo un `.btn-primary` visible por sección (jerarquía de acción).
- `.btn-ghost` y `.btn-white` solo dentro de contenedores `bg-primary` u oscuros.
- No usar `.btn` sin una clase de variante.
- No agregar `border-radius` custom; el sistema usa `rounded` (0.25rem) por defecto via Tailwind, aunque `.btn` no lo declara explícitamente — mantener consistencia con el reset global.
