# Tasks — Sistema Digital IWM
> Versión 1.0 · Spec Kit SDD · `/speckit.tasks`

Cada tarea es atómica y ejecutable. El orden es obligatorio — no se avanza sin completar el módulo anterior. Marca cada tarea con `[x]` al completarla.

---

## Módulo 1 — Backend + Base de Datos

### 1.1 Inicialización del proyecto
- [x] Crear carpeta `sistema-digital/backend/`
- [x] Inicializar `package.json` con `npm init`
- [x] Instalar dependencias base: `express`, `pg`, `dotenv`, `helmet`, `cors`, `express-rate-limit`, `jsonwebtoken`, `bcrypt`, `zod`, `winston`
- [x] Crear `.env` con variables de entorno (usar `.env.example` como plantilla)
- [x] Configurar `ESLint` y `Prettier`
- [x] Crear `src/server.js` y `src/app.js`

### 1.2 Base de datos
- [x] Crear base de datos `iwm_db` en PostgreSQL
- [x] Crear `src/db/connection.js` con pool de conexiones usando `pg`
- [x] Escribir `src/db/schema.sql` con las tablas: `users`, `cases`, `case_history`, `events`
- [x] Escribir `src/db/seed.sql` con usuario admin de prueba y casos de ejemplo
- [x] Ejecutar schema y seed en la base de datos local
- [x] Verificar conexión con un script de prueba

### 1.3 Constantes y esquemas
- [x] Crear `constants/status.constants.js` con los 4 estados del caso
- [x] Crear `constants/priority.constants.js` con los niveles de prioridad
- [x] Crear `constants/roles.constants.js` con el rol `admin`
- [x] Crear `schemas/case.schema.js` con validación Zod del formulario
- [x] Crear `schemas/auth.schema.js` con validación Zod del login
- [x] Crear `schemas/status.schema.js` con validación de cambio de estado
- [x] Crear `schemas/event.schema.js` con validación de eventos de tracking

### 1.4 Utilidades
- [x] Crear `utils/id.js` — generación de UUIDs
- [x] Crear `utils/time.js` — formateo de fechas y timestamps
- [x] Crear `utils/logger.js` — configuración de Winston
- [x] Crear `utils/sanitize.js` — limpieza de inputs de texto

### 1.5 Health check
- [x] Crear `routes/health.routes.js`
- [x] Verificar que `GET /api/health` responde `{ status: 'ok' }` con código 200

---

## Módulo 2 — Login y Autenticación

### 2.1 Repositorio y servicio de usuarios
- [x] Crear `repositories/user.repository.js` — buscar usuario por email
- [x] Crear `services/auth.service.js` — verificar contraseña con bcrypt, generar JWT

### 2.2 Middleware de autenticación
- [x] Crear `middleware/auth.middleware.js` — verificar JWT en headers de rutas privadas
- [x] Crear `middleware/validate.middleware.js` — ejecutar esquemas Zod antes del controller
- [x] Crear `middleware/error.middleware.js` — manejo centralizado de errores
- [x] Crear `middleware/rate-limit.middleware.js` — límite de requests por IP
- [x] Crear `middleware/security.middleware.js` — helmet + CORS configurado

### 2.3 Rutas y controlador de auth
- [x] Crear `controllers/auth.controller.js` — login, logout, me
- [x] Crear `routes/auth.routes.js` — POST /login, POST /logout, GET /me
- [x] Probar login con usuario del seed: respuesta con JWT válido
- [x] Probar acceso a ruta privada sin token: respuesta 401
- [x] Probar acceso a ruta privada con token válido: respuesta 200

### 2.4 Frontend login
- [x] Crear `frontend-admin/login.html` con formulario de email + contraseña
- [x] Crear `frontend-admin/modules/auth.js` — POST al endpoint, guardar JWT en localStorage
- [x] Redirigir al dashboard si el login es exitoso
- [x] Mostrar mensaje de error si las credenciales son inválidas
- [x] Agregar verificación de token al cargar cualquier página del admin

---

## Módulo 3 — Dashboard Admin

### 3.1 Endpoint de métricas
- [ ] Crear `repositories/case.repository.js` — queries de conteo por estado y tipo
- [ ] Crear `services/dashboard.service.js` — calcular métricas del resumen
- [ ] Crear `controllers/dashboard.controller.js`
- [ ] Crear `routes/dashboard.routes.js` — GET /api/dashboard/summary
- [ ] Verificar respuesta con los 5 campos de métricas definidos en el spec

### 3.2 Frontend dashboard
- [ ] Crear `frontend-admin/dashboard.html` con las tarjetas de métricas
- [ ] Crear `frontend-admin/modules/dashboard-metrics.js` — fetch al endpoint y render
- [ ] Crear `frontend-admin/modules/api-client.js` — wrapper de fetch con JWT en headers
- [ ] Mostrar métricas: total activos, nuevos, en proceso, cerrados este mes, distribución por tipo

---

## Módulo 4 — Flujo de Estados de Casos

### 4.1 CRUD de casos (solo admin por ahora)
- [ ] Completar `repositories/case.repository.js` — insertar, listar, obtener por ID, actualizar estado
- [ ] Crear `repositories/event.repository.js` — insertar en `case_history`
- [ ] Crear `services/case.service.js` — lógica de creación y cambio de estado
- [ ] Crear `services/status.service.js` — validar transiciones de estado (unidireccional)
- [ ] Crear `services/scoring.service.js` — calcular score y prioridad
- [ ] Crear `controllers/cases.controller.js` — GET lista, GET detalle, PATCH status, POST nota
- [ ] Crear `routes/cases.routes.js` — todas las rutas de cases

### 4.2 Frontend de casos
- [ ] Crear `frontend-admin/cases.html` con tabla de casos
- [ ] Crear `frontend-admin/modules/case-table.js` — fetch y render de la lista con filtros
- [ ] Crear `frontend-admin/case-detail.html` con toda la información del caso
- [ ] Crear `frontend-admin/modules/case-detail.js` — fetch del caso por ID y render
- [ ] Crear `frontend-admin/modules/status-flow.js` — botones de cambio de estado con confirmación
- [ ] Mostrar historial de cambios de estado en el detalle del caso
- [ ] Implementar campo de notas internas con guardado

### 4.3 Tests del flujo de estados
- [ ] Escribir `tests/cases.test.js` — crear caso válido, scoring correcto
- [ ] Escribir `tests/status.test.js` — transiciones válidas e inválidas
- [ ] Ejecutar tests y verificar que pasan

---

## Módulo 5 — Landing Pública Conectada

### 5.1 Endpoint público de casos
- [ ] Habilitar `POST /api/cases` sin autenticación
- [ ] Aplicar `rate-limit.middleware` al endpoint público
- [ ] Validar body con `schemas/case.schema.js`
- [ ] Calcular score automáticamente al crear el caso
- [ ] Responder 201 con `{ id, estado: 'nuevo', prioridad }`

### 5.2 Frontend público
- [ ] Crear `frontend-public/index.html` con las secciones del spec (hero, servicios, formulario, footer)
- [ ] Crear `frontend-public/styles.css` con Tailwind CSS
- [ ] Crear `frontend-public/app.js` — POST del formulario al backend con fetch
- [ ] Mostrar mensaje de confirmación tras envío exitoso
- [ ] Mostrar mensaje de error si el backend responde con error
- [ ] Validar campos requeridos en el cliente antes de enviar
- [ ] Mostrar/ocultar campo "nombre de empresa" según tipo de cliente seleccionado
- [ ] Crear `frontend-public/config/env.js` con la URL base de la API

---

## Módulo 6 — Tracking de Eventos

### 6.1 Endpoint de eventos
- [ ] Habilitar `POST /api/events` sin autenticación con rate limit
- [ ] Crear `controllers/events.controller.js`
- [ ] Crear `routes/events.routes.js`
- [ ] Guardar en tabla `events`: tipo, payload, IP, user-agent

### 6.2 Frontend tracking
- [ ] Crear `frontend-public/tracking.js`
- [ ] Registrar evento `page_view` al cargar la landing
- [ ] Registrar evento `form_start` al primer foco en el formulario
- [ ] Registrar evento `form_submit_success` tras envío exitoso
- [ ] Registrar evento `form_submit_error` si el envío falla

---

## Módulo 7 — Notificaciones

### 7.1 Configuración de servicios
- [ ] Instalar `@sendgrid/mail` y `twilio`
- [ ] Agregar variables de SendGrid y Twilio al `.env`
- [ ] Crear `services/notification.service.js` con funciones:
  - `enviarConfirmacionCliente(caso)` — email o WhatsApp según canal preferido
  - `notificarAdminNuevoCaso(caso)` — email fijo del equipo IWM
  - `notificarCambioEstado(caso, estadoNuevo)` — al cliente

### 7.2 Integración con el flujo
- [ ] Llamar `notification.service.enviarConfirmacionCliente()` después de crear un caso (async, no bloquea respuesta)
- [ ] Llamar `notification.service.notificarAdminNuevoCaso()` después de crear un caso (async)
- [ ] Llamar `notification.service.notificarCambioEstado()` después de cambiar el estado de un caso (async)
- [ ] Verificar en logs que las notificaciones se envían correctamente
- [ ] Agregar manejo de errores en notificaciones — si falla, registrar en log pero no lanzar error al cliente

---

## Módulo 8 — Documentación Interna

- [ ] Escribir `docs/arquitectura.md` — diagrama y descripción de capas del sistema
- [ ] Escribir `docs/endpoints.md` — todos los endpoints con ejemplos de request/response
- [ ] Escribir `docs/flujo-estados.md` — diagrama del ciclo de vida de un caso
- [ ] Escribir `docs/seguridad.md` — JWT, bcrypt, rate limit, CORS, decisiones tomadas
- [ ] Escribir `docs/despliegue.md` — pasos completos para deploy en VPS y configuración de nginx
- [ ] Actualizar `README.md` principal con instrucciones de instalación local

---

## Checklist Final Antes de Producción

- [ ] Todas las variables de `.env` configuradas en el VPS
- [ ] CORS apunta solo a `ingenieriawebmiranda.com`
- [ ] `NODE_ENV=production` en el servidor
- [ ] PM2 configurado para reiniciar el backend automáticamente
- [ ] nginx configurado con reverse proxy y SSL (Let's Encrypt)
- [ ] `robots.txt` bloqueando `/admin/`
- [ ] Tests pasando en CI (GitHub Actions)
- [ ] Seed de producción ejecutado (solo usuario admin, sin casos de prueba)
- [ ] Verificar formulario de la landing en producción (end-to-end)
- [ ] Verificar notificación de email y WhatsApp en producción

---

_Generado con Spec Kit SDD para uso con Claude en VS Code._
