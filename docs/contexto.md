Contexto para nueva sesión
Proyecto: ingenieriawebmiranda.com — sitio HTML estático + Tailwind CDN, sin framework ni build process. 18 páginas */index.html.

Lo que se hizo en sesiones anteriores:

Unificación de botones — se crearon clases .btn, .btn-primary, .btn-outline, .btn-ghost, .btn-white en assets/css/theme.css y se aplicaron en todos los HTML.

Auditoría técnica SDD — diagnóstico completo de arquitectura, nomenclatura, deuda técnica y brechas para Spec-Driven Development.

Bloque A ejecutado — consolidación de fuentes duplicadas sin SSG:

styles/tailwind.css eliminado (huérfano, conflictivo)
Bloques <style> inline removidos de los 18 HTML
Config Tailwind centralizada en assets/js/tailwind-config.js
JS centralizado en assets/js/ui.js
~1,850 líneas de código duplicado eliminadas
Fuentes únicas activas:

Recurso	Archivo
Clases CSS custom	assets/css/theme.css
Design tokens	assets/js/tailwind-config.js
JS interacción	assets/js/ui.js
Pendiente — Bloque B:
Header + footer están duplicados manualmente en los 18 HTML (~1,890 líneas). Requiere motor de plantillas. Recomendación: Eleventy (11ty) con Nunjucks — compatible con el stack actual sin reescribir CSS ni JS.

Objetivo final: llegar a SDD (Spec-Driven Development). El orden es: Bloque B → tooling (package.json + Prettier) → estandarizar IDs → escribir specs de componentes.
