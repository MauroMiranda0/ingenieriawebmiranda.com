# Constitution — Ingeniería Web Miranda
> Versión 1.0 · Spec Kit SDD · Claude Agent

Este documento establece los principios no negociables del proyecto. Todo agente de IA, desarrollador o colaborador debe respetar estas reglas antes de generar cualquier especificación, plan o código.

---

## 1. Identidad del Proyecto

- **Nombre comercial:** Ingeniería Web Miranda
- **Sigla:** IWM
- **Dominio principal:** `ingenieriawebmiranda.com`
- **Sistema digital:** `sistema-digital/`
- **Idioma principal:** Español (documentación, UI, comentarios de código)
- **Zona horaria:** America/Mexico_City (UTC-6)

---

## 2. Propósito

IWM es una agencia orientada a proyectos de ingeniería web y digitalización de procesos empresariales, con enfoque en:

- Desarrollo de sitios y aplicaciones web
- Infraestructura tecnológica
- Integración de metodologías modernas (React, Vite, Node.js, Express, GitHub Actions, BDD, SDD) y aplicación de Inteligencia Artificial para optimizar procesos, automatizar despliegues y potenciar la toma de decisiones en proyectos de ingeniería web
- Soluciones personalizadas para la operación diaria de pymes

El sistema digital es la plataforma interna de gestión de casos que conecta la landing pública con el panel de administración privado.

---

## 3. Stack Tecnológico Obligatorio

### Frontend Público (`frontend-public/`)
- HTML / CSS / JS vanilla en la versión actual
- Migración progresiva a **React + Vite**
- **Tailwind CSS** como sistema de estilos
- Sin dependencia de jQuery ni librerías legacy

### Frontend Admin (`frontend-admin/`)
- HTML / CSS / JS vanilla en la versión actual
- Migración progresiva a **React + Vite**
- Panel privado — nunca expuesto en rutas públicas

### Backend (`backend/`)
- **Node.js + Express**
- Arquitectura por capas: routes → controllers → services → repositories
- **PostgreSQL** como base de datos principal
- ORM o query builder: **pg** (node-postgres) o **Prisma**
- Validación de datos: **Zod** o **Joi**
- Autenticación: **JWT** (JSON Web Tokens)

### Infraestructura
- Deploy principal: **VPS propio**
- Deploy alternativo por proyecto: **Vercel** (solo frontend)
- CI/CD: **GitHub Actions**
- Variables de entorno: nunca en el repositorio, siempre en `.env` con `.env.example` documentado

---

## 4. Estructura de Carpetas — No Modificable

```
sistema-digital/
├── frontend-public/
├── frontend-admin/
├── backend/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── db/
│       ├── schemas/
│       ├── constants/
│       ├── middleware/
│       └── utils/
└── docs/
```

Esta estructura no debe alterarse. Las nuevas funcionalidades se integran dentro de las capas existentes.

---

## 5. Seguridad — Reglas Obligatorias

- Todas las rutas del panel admin requieren autenticación JWT válida
- Aplicar **rate limiting** en todos los endpoints públicos
- Sanitizar y validar toda entrada antes de procesarla
- CORS configurado explícitamente — nunca `*` en producción
- Las contraseñas se almacenan con **bcrypt** (mínimo 10 rondas)
- Ningún dato sensible en logs ni en respuestas de error
- El panel admin (`/admin/`) nunca aparece en el menú público ni en el sitemap

---

## 6. Base de Datos

- Motor: **PostgreSQL**
- Esquema definido en `backend/src/db/schema.sql`
- Datos de prueba en `backend/src/db/seed.sql`
- Ninguna lógica SQL fuera de la capa `repositories/`
- Migraciones versionadas — no se modifica `schema.sql` sin registro de cambios

---

## 7. Notificaciones

- **Email:** SendGrid (prioridad) / Resend (alternativa según proyecto)
- **WhatsApp:** Twilio
- El canal se determina según preferencia del cliente registrada en el caso
- Las notificaciones no bloquean el flujo principal (se ejecutan de forma asíncrona)

---

## 8. Flujo de Casos

### Estados válidos (en orden):
1. `nuevo`
2. `en_revision`
3. `en_proceso`
4. `cerrado`

### Scoring de prioridad — factores:
- Tipo de cliente: empresa > particular
- Urgencia declarada por el cliente
- Complejidad técnica estimada
- Disponibilidad de recursos interna

Los estados y prioridades están definidos en `constants/` y no deben duplicarse en otros archivos.

---

## 9. Convenciones de Código

- **Nombrado:** camelCase para JS, kebab-case para archivos y carpetas
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **Ramas:** `main` (producción), `dev` (desarrollo), `feature/nombre-feature`
- **Tests:** obligatorios para services y controllers
- **Comentarios:** en español, explicativos (no obvios)
- **ESLint + Prettier** configurados en el proyecto

---

## 10. URLs de Producción

| Entorno | URL |
|---|---|
| Sitio corporativo | `ingenieriawebmiranda.com/` |
| Landing sistema digital | `ingenieriawebmiranda.com/sistema-digital/` |
| Panel admin | `ingenieriawebmiranda.com/admin/` |
| API | `api.ingenieriawebmiranda.com/api/` |

---

## 11. Orden de Construcción — Obligatorio

No se avanza al siguiente módulo sin completar el anterior:

1. Backend + base de datos (PostgreSQL, esquema, conexión)
2. Login básico (JWT, auth middleware)
3. Dashboard admin (métricas básicas)
4. Flujo de estados de casos
5. Landing pública conectada al backend
6. Tracking de eventos
7. Notificaciones (SendGrid + Twilio)
8. Documentación interna (`docs/`)

---

## 12. Documentación Interna Obligatoria

Los siguientes archivos deben mantenerse actualizados en `docs/`:

- `arquitectura.md` — diagrama y descripción de capas
- `endpoints.md` — todas las rutas de la API con ejemplos
- `flujo-estados.md` — diagrama del ciclo de vida de un caso
- `seguridad.md` — decisiones y configuraciones de seguridad
- `despliegue.md` — pasos para deploy en VPS y Vercel

---

_Este documento debe ser referenciado al inicio de cada sesión de trabajo con el agente Claude en VS Code._
