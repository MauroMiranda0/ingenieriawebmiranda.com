# AGENTS.md — Ingeniería Web Miranda

Static site (Eleventy + Nunjucks), Tailwind via CDN, vanilla JS, 18 pages.

## Commands

| Command | What |
|---------|------|
| `npm run start` | Dev server at `http://localhost:8080` with live reload |
| `npm run build` | Generate static site to `_site/` |
| `npm run format` | Prettier on `*.{njk,css,js}` |
| `npm run format:check` | Prettier check (no write) |
| `node scripts/preview-site.mjs` | Preview `_site/` at `http://localhost:8081` |

Run `npm run build` and verify zero errors before finishing any task.

## Architecture

- **Single layout** `_includes/layouts/base.njk` — conditional nav via `navStyle` front matter
- Legal pages (`/legal/*`) set `navStyle: "legal"`; all others omit it
- **No JS framework** (React, Vue, etc.) — constitution constraint
- **No border-radius on cards** — constitution constraint
- Tailwind is CDN-only (design tokens in `assets/js/tailwind-config.js`, not used by a build)
- All CSS custom classes in `assets/css/theme.css`
- All JS in `assets/js/ui.js` (mobile menu toggle + copyright year)

## Front matter (every page)

```yaml
layout: layouts/base.njk
title: "[Page] | Ingeniería Web Miranda"     # Home: "[Marca] | [Tagline]"
description: "..."
ogTitle: "..."                               # unique per page
ogDescription: "..."                         # unique per page
ogImage: "og-cover.png"                      # filename only (shared)
twitterTitle: "..."
twitterDescription: "..."
navStyle: "legal"                            # only for /legal/*
jsonld: |                                    # only for home and contacto
  { "@context": "https://schema.org", ... }
```

- ALL 18 pages must have unique `title`, `description`, `ogTitle`, `ogDescription`
- Section `id` attributes: Spanish (kebab-case)
- JS hook `id` attributes: English

## Spec-Driven Development

- `_specs/README.md` lists all component specs
- **Update the spec before modifying the component** — code derives from spec, never the reverse
- `docs/CONSTITUTION.md` defines permanent constraints (no JS framework, no border-radius on cards, Tailwind CDN only, single layout, etc.)
- `docs/SPECIFICATION.md` describes every page's sections, components, and requirements
- `docs/TECHNICAL_PLAN.md` documents known debt and roadmap

## Known issues

| Issue | File | Fix |
|-------|------|-----|
| `title: "Metodo"` (missing accent) | `metodo/index.njk:3` | Change to `"Método \| Ingeniería Web Miranda"` |
| `.skip-link` defined in CSS but not in `base.njk` | `_includes/layouts/base.njk` | Implement skip-link before `{{ content \| safe }}` |
| Cache stale after deploy | `_includes/partials/head.njk` | Update `v=YYYYMMDD` in `theme.css` and `tailwind-config.js` URLs before each deploy to force browser refresh |

## Formatting quirks

- `.prettierignore` skips `_includes/partials/nav.njk` and `nav-legal.njk` (long lines from Tailwind)
- Override in `.prettierrc`: `*.njk` parsed as `"html"`, `bracketSameLine: true`, `htmlWhitespaceSensitivity: "ignore"`

## Deploy

- `npm run build`, then upload contents of `_site/` to Hostinger `public_html/`
- No CI/CD pipeline configured yet
- Formspree endpoint `xpqjevwp` for contact form (public by design)
- `.github/workflows/` does not exist yet (mentioned in TECHNICAL_PLAN.md but not set up)

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
