# Ingeniería Web Miranda

Sitio corporativo de [ingenieriawebmiranda.com](https://ingenieriawebmiranda.com).

## Stack

- **Eleventy (11ty) v3** — generador de sitios estáticos con plantillas Nunjucks
- **Tailwind CSS** — vía CDN (sin build process de CSS)
- **Vanilla JS** — menú móvil y año de copyright (`assets/js/ui.js`)
- **Prettier** — formateo de `.njk`, `.css` y `.js`

## Estructura

```
_includes/
  layouts/base.njk         # Layout único para las 18 páginas
  partials/
    head.njk               # <head> con SEO y scripts
    nav.njk                # Navegación estándar
    nav-legal.njk          # Navegación simplificada (/legal/*)
    footer.njk             # Footer global
_specs/                    # Especificaciones de componentes (SDD)
assets/
  css/theme.css            # Clases CSS custom (botones, links, efectos)
  js/tailwind-config.js    # Tokens de diseño (colores, fuentes)
  js/ui.js                 # JS: menú móvil + año de copyright
  img/
[sección]/index.njk        # Páginas del sitio (18 en total)
_site/                     # Output del build (no se versiona)
```

## Desarrollo local

```bash
npm install
npm run start        # servidor en http://localhost:8080 con live reload
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run build` | Genera el sitio en `_site/` |
| `npm run start` | Servidor local con live reload |
| `npm run watch` | Rebuild automático sin servidor |
| `npm run format` | Aplica Prettier a todos los archivos |
| `npm run format:check` | Verifica formato sin modificar |

## Deploy en Hostinger

1. `npm run build`
2. Subir el **contenido** de `_site/` a `public_html/` en el File Manager de Hostinger

## Especificaciones de componentes

Los componentes del sistema están documentados en [`_specs/`](_specs/README.md):
tokens, Button, Card, SectionHeader, Header, Footer, NavLink, HeroLink y efectos visuales.

Antes de modificar un componente, actualizar su spec correspondiente.
