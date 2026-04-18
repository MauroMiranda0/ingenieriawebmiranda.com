# CONSTITUTION — Ingeniería Web Miranda

Documento fundacional del proyecto. Define el propósito, los principios y las reglas que gobiernan todas las decisiones: de diseño, de ingeniería y de contenido.

Toda decisión que contradiga este documento requiere actualizar el documento primero.

---

## 1. Propósito del sitio

Ingeniería Web Miranda es una consultoría de ingeniería web para transformación digital.
El sitio tiene un único objetivo: **generar confianza técnica y convertir visitantes en clientes de diagnóstico**.

No es un portafolio, ni un blog, ni una vitrina de tecnologías. Es un instrumento de negocio con enfoque en claridad, credibilidad y acción.

---

## 2. Audiencia objetivo

Tomadores de decisión técnica y no técnica en empresas que necesitan evolución digital:
- CTOs, directores de tecnología, gerentes de producto
- Fundadores de startups con deuda técnica acumulada
- Empresas con sitios lentos, inseguros o difíciles de mantener

**No es** audiencia: desarrolladores buscando empleo, estudiantes, reclutadores.

---

## 3. Principios de diseño

### 3.1 Identidad visual
- Estética **blueprint técnico**: esquinas rectas, sin border-radius en cards, tipografía serif para títulos
- Paleta restringida: `primary` (#0D2B45) como color dominante, fondos casi blancos, grises slate para contenido
- No usar colores de acento arbitrarios fuera del sistema de tokens

### 3.2 Tipografía
- **Playfair Display** (`font-display`): títulos H1–H3, nombres de componentes — transmite autoridad
- **Inter** (`font-sans`): cuerpo, labels, botones, nav — transmite precisión
- No mezclar con otras familias tipográficas

### 3.3 Jerarquía visual
- Una acción primaria por sección (`.btn-primary`)
- Máximo dos CTAs visibles simultáneamente (primario + secundario)
- El contenido manda sobre la decoración — los efectos visuales no compiten con el texto

---

## 4. Principios de ingeniería

### 4.1 Spec-Driven Development (SDD)
- Cada componente tiene una especificación en `_specs/` antes de existir en código
- Antes de modificar un componente, se actualiza su spec
- El código se deriva de la spec, nunca al revés

### 4.2 Fuente única de verdad
- Una sola fuente por recurso (un archivo CSS custom, un config de Tailwind, un archivo JS)
- Sin código duplicado entre páginas — los componentes globales viven en `_includes/`
- Sin estilos inline en HTML

### 4.3 Simplicidad sobre abstracción
- No crear abstracciones para casos de uso que no existen todavía
- Tres instancias similares justifican un componente; dos no
- El stack más simple que resuelve el problema

### 4.4 Calidad verificable
- El build debe pasar sin errores ni warnings en todo momento (`npm run build`)
- El código debe pasar el chequeo de formato (`npm run format:check`)
- Ningún despliegue con build roto

---

## 5. Principios de contenido

### 5.1 Claridad técnica
- El lenguaje refleja competencia: preciso, sin buzzwords vacíos
- Los entregables siempre se mencionan explícitamente — no "ayudamos con X", sino "entregamos X"
- Las afirmaciones son defendibles, no marketineras

### 5.2 Reglas tipográficas
- Los H2 no terminan en punto — son títulos, no oraciones
- Los eyebrow labels en singular, sin puntuación final
- Las descripciones de sección en 1–2 oraciones, máximo 3

### 5.3 Idioma
- El sitio es 100% en español (es-MX)
- Los IDs de sección en español (kebab-case)
- Los IDs de hooks JS en inglés (convención técnica universal)

---

## 6. Principios de SEO

- Cada página tiene `title`, `description`, `ogTitle`, `ogDescription` únicos y específicos
- El canonical URL se genera automáticamente desde `page.url`
- Sin contenido duplicado entre páginas
- Structured data (JSON-LD) en las páginas que lo justifican (home, contacto)

---

## 7. Restricciones permanentes

Estas decisiones están tomadas y no se revierten sin consenso explícito:

| Restricción | Razón |
|-------------|-------|
| Sin framework JS (React, Vue, etc.) | El sitio es contenido estático; la complejidad no está justificada |
| Sin border-radius en cards | Decisión de identidad visual (estética blueprint) |
| Tailwind via CDN, no build | Simplicidad; aceptable hasta que el tamaño del proyecto lo requiera |
| Un solo layout para las 18 páginas | DRY; la variación se gestiona con front matter |
| `_site/` no se versiona | Es output generado, no fuente |

---

## 8. Cómo tomar decisiones

Ante cualquier decisión de diseño o ingeniería, en orden:

1. ¿Existe una spec que la cubre? → Seguir la spec
2. ¿Contradice algún principio de este documento? → No hacerlo sin actualizar la constitución primero
3. ¿Es la opción más simple que resuelve el problema? → Preferir esa
4. ¿Agrega deuda técnica? → Documentar la deuda antes de aceptarla
