<!--
  Sync Impact Report — Constitution v1.0.0
  =========================================
  Version change: (template) → 1.0.0
  Modified principles: N/A (initial population from template)
  Added sections:
    - Core Principles (5 principles): Design, Engineering, Content, SEO, Permanent Constraints
    - Purpose & Target Audience
    - Decision-Making Framework
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed (Constitution Check section generic)
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/checklist-template.md ✅ no changes needed
    - .specify/templates/constitution-template.md ⚠ source template only, not used at runtime
  Other artifacts:
    - docs/CONSTITUTION.md ✅ source document, unchanged
    - README.md ✅ references aligned
    - AGENTS.md ✅ references aligned
  Follow-up TODOs: none
-->

# Ingeniería Web Miranda Constitution

Documento fundacional del proyecto. Define el propósito, los principios y las reglas que gobiernan todas las decisiones: de diseño, de ingeniería y de contenido.

Toda decisión que contradiga este documento requiere actualizar el documento primero.

---

## Core Principles

### I. Design Principles — Blueprint Aesthetic

**Visual identity:**
- Estética **blueprint técnico**: esquinas rectas, sin border-radius en cards, tipografía serif para títulos
- Paleta restringida: `primary` (#0D2B45) como color dominante, fondos casi blancos, grises slate para contenido
- No usar colores de acento arbitrarios fuera del sistema de tokens

**Typography:**
- **Playfair Display** (`font-display`): títulos H1–H3, nombres de componentes — transmite autoridad
- **Inter** (`font-sans`): cuerpo, labels, botones, nav — transmite precisión
- No mezclar con otras familias tipográficas

**Visual hierarchy:**
- Una acción primaria por sección (`.btn-primary`)
- Máximo dos CTAs visibles simultáneamente (primario + secundario)
- El contenido manda sobre la decoración — los efectos visuales no compiten con el texto

### II. Engineering Principles — Spec-Driven & Simple

**Spec-Driven Development (SDD):**
- Cada componente tiene una especificación en `_specs/` antes de existir en código
- Antes de modificar un componente, se actualiza su spec
- El código se deriva de la spec, nunca al revés

**Single source of truth:**
- Una sola fuente por recurso (un archivo CSS custom, un config de Tailwind, un archivo JS)
- Sin código duplicado entre páginas — los componentes globales viven en `_includes/`
- Sin estilos inline en HTML

**Simplicity over abstraction:**
- No crear abstracciones para casos de uso que no existen todavía
- Tres instancias similares justifican un componente; dos no
- El stack más simple que resuelve el problema

**Verifiable quality:**
- El build debe pasar sin errores ni warnings en todo momento (`npm run build`)
- El código debe pasar el chequeo de formato (`npm run format:check`)
- Ningún despliegue con build roto

### III. Content Principles — Clarity & Consistency

**Technical clarity:**
- El lenguaje refleja competencia: preciso, sin buzzwords vacíos
- Los entregables siempre se mencionan explícitamente — no "ayudamos con X", sino "entregamos X"
- Las afirmaciones son defendibles, no marketineras

**Typographic rules:**
- Los H2 no terminan en punto — son títulos, no oraciones
- Los eyebrow labels en singular, sin puntuación final
- Las descripciones de sección en 1–2 oraciones, máximo 3

**Language:**
- El sitio es 100% en español (es-MX)
- Los IDs de sección en español (kebab-case)
- Los IDs de hooks JS en inglés (convención técnica universal)

### IV. SEO Principles

- Cada página tiene `title`, `description`, `ogTitle`, `ogDescription` únicos y específicos
- El canonical URL se genera automáticamente desde `page.url`
- Sin contenido duplicado entre páginas
- Structured data (JSON-LD) en las páginas que lo justifican (home, contacto)

### V. Permanent Constraints

| Restricción | Razón |
|-------------|-------|
| Sin framework JS (React, Vue, etc.) | El sitio es contenido estático; la complejidad no está justificada |
| Sin border-radius en cards | Decisión de identidad visual (estética blueprint) |
| Tailwind via CDN, no build | Simplicidad; aceptable hasta que el tamaño del proyecto lo requiera |
| Un solo layout para las 18 páginas | DRY; la variación se gestiona con front matter |
| `_site/` no se versiona | Es output generado, no fuente |

---

## Purpose & Target Audience

**Purpose:** Ingeniería Web Miranda es una consultoría de ingeniería web para transformación digital. El sitio tiene un único objetivo: **generar confianza técnica y convertir visitantes en clientes de diagnóstico**. No es un portafolio, ni un blog, ni una vitrina de tecnologías. Es un instrumento de negocio con enfoque en claridad, credibilidad y acción.

**Target audience:** Tomadores de decisión técnica y no técnica en empresas que necesitan evolución digital:
- CTOs, directores de tecnología, gerentes de producto
- Fundadores de startups con deuda técnica acumulada
- Empresas con sitios lentos, inseguros o difíciles de mantener

**Not** audience: desarrolladores buscando empleo, estudiantes, reclutadores.

---

## Decision-Making Framework

Ante cualquier decisión de diseño o ingeniería, en orden:

1. ¿Existe una spec que la cubre? → Seguir la spec
2. ¿Contradice algún principio de este documento? → No hacerlo sin actualizar la constitución primero
3. ¿Es la opción más simple que resuelve el problema? → Preferir esa
4. ¿Agrega deuda técnica? → Documentar la deuda antes de aceptarla

---

## Governance

Esta constitución es la fuente de verdad del proyecto. Toda práctica, revisión o decisión debe validarse contra ella.

**Amendment procedure:**
- Cualquier cambio requiere documentación del cambio propuesto, aprobación y plan de migración si aplica
- Las versiones siguen semver: MAJOR para cambios incompatibles (principios eliminados o redefinidos), MINOR para adiciones materiales, PATCH para aclaraciones y correcciones
- La constitución actualizada debe reflejar la fecha de última modificación

**Compliance:**
- Toda revisión de código debe verificar conformidad con los principios aquí definidos
- Toda spec nueva debe ser compatible con estos principios
- La complejidad debe justificarse explícitamente cuando un principio de simplicidad pudiera estar en tensión

**Runtime guidance:** Use `AGENTS.md` for runtime development guidance and command reference.

**Version**: 1.0.0 | **Ratified**: 2026-06-09 | **Last Amended**: 2026-06-09
