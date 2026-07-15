# Content Architecture — Home + Servicios

**Spec type**: Content architecture (página + componente)
**Status**: Draft
**Constitution version**: 1.0.0

---

## 0. Diagnosis: duplicación actual

| Nivel | Formato | Problema |
|-------|---------|----------|
| Home `#que-resolvemos` | 6 cards (blog-card-post) con imagen, eyebrow, título, descripción breve, CTA "Saber más" | **Vitrina correcta**, pero el contenido del modal de entregables compite con la página de servicio |
| `/servicios/` | 6 cards (service-card) con eyebrow, icono, nombre, descripción, CTA "Ver servicio" | **Redundante**: repite la misma función de vitrina que el home |
| `/servicios/*/` (6 páginas individuales) | Páginas profundas con hero, problemas, entregables, palancas, proceso, FAQ, CTA | **Contenido valioso pero disperso**: obliga al usuario a navegar 6 páginas para comparar |

**Decisión arquitectónica**: El home es la vitrina. `/servicios/` es el escaparate completo. Las 6 páginas individuales se consolidan en una sola página todo-en-uno.

---

## 1. Home como landing — vitrina de servicios

### Propósito
Comunicar propuesta de valor en segundos. Las 6 cards funcionan como **storefront**: título, breve descripción y CTA que lleva a `/servicios/#{ancla}` del bloque correspondiente.

### Estructura de cada card (blog-card-post) en `#que-resolvemos`

```
┌──────────────────────────────────┐
│  [imagen]                        │
│                                  │
├──────────────────────────────────┤
│  Eyebrow singular   | tags       │
│  Título del servicio             │
│  Descripción (1 línea)           │
│  [CTA → /servicios/#{ancla}]     │
└──────────────────────────────────┘
```

- CTA apunta al **bloque completo** en `/servicios/` vía anchor, no a una página individual
- Sin modal de entregables (el contenido completo vive en `/servicios/`)
- 6 cards, grid 3 columnas en desktop

### Home CTA final (`#cta-final`)
- "Solicitar diagnóstico" → `/contacto/`
- "Ver servicios" → `/servicios/`

---

## 2. Página `/servicios/` — los 6 bloques completos

### Propósito
Única página que contiene el desarrollo completo de los 6 servicios. Sin cards de preview. Cada servicio es un **módulo narrativo completo** con índice de navegación rápida.

### Navegación
Índice lateral (desktop) o superior (mobile) con anchors a cada servicio:

```
[ Diagnóstico técnico ] [ Modernización web ] [ Performance ]
[ Sistemas web        ] [ Arquitectura      ] [ Seguridad    ]
```

Cada item del índice hace scroll suave (`scroll-behavior: smooth`) al `id` del bloque.

### Estructura de cada bloque de servicio

```yaml
id: servicio-{slug}           # ej: servicio-diagnostico-tecnico
```

Cada bloque sigue esta estructura exacta, sin variaciones entre servicios:

```
┌──────────────────────────────────────────────────┐
│  [Anchor target]                                  │
│                                                   │
│  Eyebrow (singular, sin puntuación final)         │
│  H2 "Nombre del servicio"  (Playfair Display)     │
│  Descripción (1–2 oraciones, max 3)               │
│                                                   │
│  ── Desarrollo ──                                  │
│  3 columnas:                                      │
│    • Qué entregamos (deliverables concretos)      │
│    • Beneficios (qué gana el cliente)             │
│    • Para quién / cuándo (señales de necesidad)   │
│                                                   │
│  ── Áreas que cubrimos ──                          │
│  6 items en grid: concepto + breve descripción    │
│                                                   │
│  [CTA primario: "Solicitar diagnóstico"]           │
└──────────────────────────────────────────────────┘
```

### Reglas de contenido por bloque

| Elemento | Regla constitucional | Fuente de contenido |
|----------|---------------------|-------------------|
| Eyebrow | Singular, sin puntuación final | `services.json` → `eyebrow` |
| H2 | Playfair Display, sin punto final | `services.json` → `name` |
| Descripción | 1–2 oraciones, máximo 3 | `services.json` → `listingDescription` |
| Qué entregamos | Lenguaje preciso: "entregamos X", no "ayudamos con X" | De `sectionEntregablesHeading` + `entregablesItems` en cada página individual |
| Beneficios | Afirmaciones defendibles, no marketineras | Derivado de `sectionProblemasHeading` + `problemas[].heading` |
| Señales de necesidad | Lenguaje de tomadores de decisión técnica | Derivado de `noHacemosItems` + `faq[].question` |
| Áreas que cubrimos | 6 items, blueprint aesthetic | `sectionGrid6Heading` + `grid6` de cada página individual |
| CTA primario | Una acción primaria por sección | Botón "Solicitar diagnóstico" → `/contacto/` |

### Contenido detallado por servicio

#### 2.1 Diagnóstico técnico

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Diagnóstico |
| H2 | Diagnóstico técnico |
| Descripción | Claridad antes de construir. Riesgos, oportunidades y próximos pasos documentados. |
| Qué entregamos | Resumen ejecutivo con hallazgos clave, baseline técnico del estado actual, lista priorizada de riesgos y oportunidades, backlog inicial con estimaciones de impacto/esfuerzo, roadmap recomendado con próximos pasos |
| Beneficios | Sabes por dónde empezar sin incertidumbre, evitas retrabajos, alineas expectativas con el equipo, traduces incertidumbre en backlog priorizado |
| Señales de necesidad | "No sabemos por dónde empezar", "Las estimaciones siempre fallan", "Hay riesgos técnicos que nadie ha documentado" |
| Áreas | Arquitectura, Performance, Seguridad, Código, Infraestructura, Procesos |

#### 2.2 Modernización web

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Modernización |
| H2 | Modernización web |
| Descripción | De sitio a plataforma sostenible. Sin reescribir todo, sin perder lo que funciona. |
| Qué entregamos | Diagnóstico de estructura actual y deuda técnica, plan de modernización progresiva por fases, reestructuración de base técnica sin romper operación, migración controlada de contenidos y funcionalidades, documentación de arquitectura resultante |
| Beneficios | El sitio existente sigue operando durante la transformación, solo se cambia lo que justifica cambio, el equipo puede trabajar sin fricción después de la intervención |
| Señales de necesidad | "El sitio creció sin control", "Hacer cambios toma semanas", "El código legacy frena cualquier evolución" |
| Áreas | Estructura, Rendimiento, Mantenibilidad, Contenido, Integraciones, Despliegue |

#### 2.3 Performance

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Performance |
| H2 | Performance & Core Web Vitals |
| Descripción | Reducimos fricción de carga e interacción. Mejor experiencia. Mejor conversión. |
| Qué entregamos | Baseline de performance con Lighthouse y datos de campo, lista priorizada de oportunidades por impacto/esfuerzo, performance budget con límites de JS/CSS/imagen, plan de optimización por etapas, checklist de regresión antes/después |
| Beneficios | Carga rápida en dispositivos reales, mejora de conversión al remover fricción, equipo con criterios claros para no degradar con el tiempo |
| Señales de necesidad | "El sitio se siente lento aunque carga", "Las métricas de CWV están en rojo", "No sabemos qué está causando la lentitud" |
| Áreas | Render crítico, Imágenes, JS, Fuentes, Caching, Infra/Entrega |

#### 2.4 Sistemas web

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Sistemas |
| H2 | Sistemas web |
| Descripción | Portales, dashboards e integraciones listos para operar y evolucionar. |
| Qué entregamos | Sistema web funcional (portal, dashboard, catálogo, etc.), documentación técnica de arquitectura y decisiones, integraciones con servicios existentes documentadas, despliegue automatizado con CI/CD básico, guía operativa para el equipo |
| Beneficios | Sistema que no depende de una sola persona para operar, cambios sin regresión inesperada, operación automatizada sin supervisión constante |
| Señales de necesidad | "Cualquier cambio rompe algo", "Las integraciones son una caja negra", "Dependemos de procesos manuales" |
| Áreas | Frontend, Backend, Base de datos, Autenticación, Integraciones, Despliegue |

#### 2.5 Arquitectura & Modernización

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Arquitectura |
| H2 | Arquitectura & Modernización |
| Descripción | Reducimos deuda técnica sin detener operación. Diseñamos un camino defendible para escalar. |
| Qué entregamos | Mapa del sistema con componentes, flujos y riesgos, roadmap técnico por fases con impacto/esfuerzo/riesgo, decisiones de arquitectura documentadas (ADR simple), plan de refactor defendible con qué/por qué/cuándo, lineamientos mínimos de estructura, naming y boundaries |
| Beneficios | El equipo entiende qué depende de qué, los cambios se hacen con control de regresión, la velocidad de entrega se recupera |
| Señales de necesidad | "Cada cambio genera regresión inesperada", "Nadie sabe qué depende de qué", "La velocidad de entrega cae cada mes" |
| Áreas | Boundaries, Contratos, Observabilidad mínima, Deuda visible, Estrategia de migración, Documentación útil |

#### 2.6 Seguridad & DevSecOps

| Campo | Contenido |
|-------|-----------|
| Eyebrow | Seguridad |
| H2 | Seguridad & DevSecOps |
| Descripción | Reducimos superficie de ataque. Endurecemos la entrega. Priorizamos riesgos reales. |
| Qué entregamos | Checklist OWASP Top 10 aplicado al contexto, hardening básico de headers, cookies, CORS y TLS, revisión de dependencias con riesgos y acciones, recomendaciones priorizadas por impacto/esfuerzo, guía operativa con lo mínimo para sostener seguridad |
| Beneficios | Riesgos reales identificados y mitigados, equipo con controles mínimos integrados al ciclo de entrega, sin depender de "ojalá no pase nada" |
| Señales de necesidad | "No sabemos qué tan expuestos estamos", "La seguridad es un pendiente que nunca se atiende", "Dependemos de que nadie nos ataque" |
| Áreas | Headers, Cookies, CORS, Dependencias, Autenticación, Registro mínimo |

---

## 3. Mapa de navegación resultante

```
/                               Home (vitrina con 6 cards → anclas a /servicios/)
└── /servicios/                 Página única con 6 bloques completos + índice
    │                           (Diagnóstico, Modernización, Performance,
    │                            Sistemas, Arquitectura, Seguridad)
    ├── /casos/                 (sin cambios)
    ├── /metodo/                (sin cambios)
    ├── /contacto/              (sin cambios)
    └── /legal/*                (sin cambios)
```

**Cambios respecto a la arquitectura actual:**
- `/servicios/diagnostico-tecnico/` → eliminado (contenido migrado a `/servicios/#servicio-diagnostico-tecnico`)
- `/servicios/modernizacion-web/` → eliminado (contenido migrado a `/servicios/#servicio-modernizacion-web`)
- `/servicios/performance/` → eliminado (contenido migrado a `/servicios/#servicio-performance`)
- `/servicios/sistemas-web/` → eliminado (contenido migrado a `/servicios/#servicio-sistemas-web`)
- `/servicios/arquitectura/` → eliminado (contenido migrado a `/servicios/#servicio-arquitectura`)
- `/servicios/seguridad/` → eliminado (contenido migrado a `/servicios/#servicio-seguridad`)
- `/servicios/index.njk` → reescrito con 6 bloques completos + índice de anchors
- `_data/services.json` → conservado como fuente de datos o reemplazado por contenido inline

**Reducción de páginas: 18 → 12** (o se mantienen como redirects las 6 eliminadas)

---

## 4. Consistencia visual (blueprint aesthetic)

| Elemento | Regla |
|----------|-------|
| Bloques de servicio | Sin border-radius, bordes rectos `border border-slate-200` |
| H2 | Playfair Display (`font-display`), color `text-primary`, sin punto final |
| Eyebrow | `text-xs font-semibold tracking-[0.18em] uppercase text-slate-500`, singular |
| Cuerpo | Inter (`font-sans`), `text-slate-600`, `leading-relaxed` |
| CTA primario | `.btn-primary` → uno por bloque |
| Separación entre bloques | `border-t border-slate-200` o `py-24` |
| Índice de navegación | Links con `text-primary`, `hover:opacity-80`, sin border-radius |
| Grid de 6 áreas | `grid grid-cols-1 md:grid-cols-3 gap-5`, cards sin border-radius, `bg-white` con `shadow-[0_1px_3px_rgba(34,25,25,0.4)]` |

---

## 5. Compliance check

| Principio constitucional | Compliance |
|-------------------------|------------|
| Sin border-radius en cards | ✅ Todos los contenedores con `border` recto |
| Playfair Display para títulos | ✅ H2 con `font-display` |
| Inter para cuerpo | ✅ Descripciones y desarrollo con `font-sans` |
| Eyebrow en singular, sin puntuación | ✅ |
| H2 sin punto final | ✅ |
| Una acción primaria por sección | ✅ Un `.btn-primary` por bloque |
| Máximo dos CTAs visibles | ✅ Primario + opcional secundario por bloque |
| Sin framework JS | ✅ Navegación por anchors con HTML puro |
| Contenido en español (es-MX) | ✅ |
| IDs de sección en español (kebab-case) | ✅ `servicio-diagnostico-tecnico` |
| Sin duplicación de contenido | ✅ Contenido vive solo en `/servicios/` |
| Entregables siempre mencionados explícitamente | ✅ Sección "Qué entregamos" con items concretos |
| Afirmaciones defendibles, no marketineras | ✅ Lenguaje preciso sin buzzwords |

---

## 6. Migración desde el estado actual

| Paso | Acción | Impacto |
|------|--------|---------|
| 1 | Crear partial `_includes/partials/service-block.njk` con estructura del bloque | Nuevo componente |
| 2 | Reescribir `servicios/index.njk` con índice + 6 bloques usando datos de cada página individual | Archivo existente modificado |
| 3 | Actualizar cards del home `index.njk` para que CTAs apunten a `/servicios/#servicio-{slug}` | Archivo existente modificado |
| 4 | Eliminar modales `dialog` del home (contenido migrado a `/servicios/`) | Archivo existente modificado |
| 5 | Eliminar 6 directorios de servicio individual | 6 directorios eliminados |
| 6 | Eliminar `_data/services.json` si ya no se usa | 1 archivo eliminado |
| 7 | Actualizar `docs/SPECIFICATION.md` con nuevo mapa de sitio | Documento actualizado |
| 8 | Verificar enlaces entrantes (nav, casos, método, etc.) | Validación cruzada |
| 9 | `npm run build` para verificar cero errores | Build validation |

---

*This spec derives from the Constitution v1.0.0. Any contradiction with the constitution requires updating the constitution first.*
