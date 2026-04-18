# Especificaciones de componentes — Ingeniería Web Miranda

Documentos de referencia para Spec-Driven Development (SDD).
Cada spec es la **fuente de verdad** del componente: antes de modificar código, se actualiza la spec.

## Índice

| Spec | Archivo fuente | Estado |
|------|---------------|--------|
| [Tokens de diseño](tokens.md) | `assets/js/tailwind-config.js` | ✅ |
| [Button](button.md) | `assets/css/theme.css` | ✅ |
| [Card](card.md) | Tailwind (utilitarios) | ✅ |
| [SectionHeader](section-header.md) | Tailwind (utilitarios) | ✅ |
| [Header / Nav](header.md) | `_includes/partials/nav.njk` | ✅ |
| [Footer](footer.md) | `_includes/partials/footer.njk` | ✅ |
| [NavLink y HeroLink](nav-link.md) | `assets/css/theme.css` | ✅ |
| [Efectos visuales](visual-effects.md) | `assets/css/theme.css` | ✅ |

## Convención

- Los valores de color, fuente y radio siempre provienen de `tokens.md`.
- Los nombres de clase CSS custom provienen de `theme.css`; los utilitarios de Tailwind se usan directamente.
- Una spec nueva acompaña cualquier componente que se agregue al sistema.
