# Specification — Sistema Digital IWM
> Versión 1.0 · Spec Kit SDD · `/speckit.specify`

---

## 1. Visión General

**¿Qué se construye?**

El Sistema Digital de Ingeniería Web Miranda es una plataforma de gestión de casos que conecta:

- Una **landing pública** donde clientes particulares y empresas pueden enviar solicitudes de servicio
- Un **panel de administración privado** donde el equipo IWM gestiona, prioriza y da seguimiento a cada caso
- Un **backend API REST** que conecta ambos frontends y concentra toda la lógica de negocio

**¿Por qué existe?**

Para digitalizar el proceso de captación y seguimiento de proyectos de ingeniería web, eliminando la gestión manual por WhatsApp o email, y dando trazabilidad completa a cada caso desde el primer contacto hasta el cierre.

---

## 2. Usuarios del Sistema

### 2.1 Cliente (usuario público)
- Puede ser **particular** o **empresa**
- Accede a través de `ingenieriawebmiranda.com/sistema-digital/`
- Envía una solicitud mediante el formulario de la landing
- Recibe notificaciones por email o WhatsApp según su preferencia
- No requiere cuenta ni autenticación

### 2.2 Administrador IWM (usuario privado)
- Accede a través de `ingenieriawebmiranda.com/admin/`
- Requiere autenticación con usuario y contraseña
- Puede ver todos los casos, cambiar estados, agregar notas y consultar métricas
- Es el único perfil con acceso al panel admin

---

## 3. Módulos del Sistema

### 3.1 Landing Pública (`frontend-public/`)

**Objetivo:** Presentar el sistema y captar solicitudes de clientes.

**Secciones de la página:**
- Hero con propuesta de valor del sistema
- Descripción de servicios que ofrece IWM
- Formulario de contacto/solicitud
- Footer con datos de contacto

**Formulario de solicitud — campos:**

| Campo | Tipo | Requerido |
|---|---|---|
| Nombre completo | texto | sí |
| Email | email | sí |
| Teléfono / WhatsApp | texto | sí |
| Tipo de cliente | select: particular / empresa | sí |
| Nombre de empresa | texto | solo si es empresa |
| Descripción del proyecto | textarea | sí |
| Urgencia | select: baja / media / alta | sí |
| Canal de notificación preferido | select: email / WhatsApp | sí |

**Comportamiento tras envío:**
- Mensaje de confirmación en pantalla
- Notificación automática al cliente (email o WhatsApp)
- Registro del caso en base de datos con estado `nuevo`
- Scoring automático calculado por el backend

**Tracking de eventos:**
- Registro de visita a la página
- Registro de inicio de formulario
- Registro de envío exitoso o fallido

---

### 3.2 Panel Admin (`frontend-admin/`)

#### Login (`login.html`)
- Formulario de email + contraseña
- JWT almacenado en `localStorage` con expiración
- Redirección automática al dashboard si ya hay sesión activa
- Redirección al login si el token expira o es inválido

#### Dashboard (`dashboard.html`)
Métricas visibles al entrar:
- Total de casos activos
- Casos nuevos (sin revisar)
- Casos en proceso
- Casos cerrados este mes
- Distribución por tipo de cliente (empresa vs particular)

#### Lista de Casos (`cases.html`)
- Tabla con todos los casos ordenados por prioridad
- Filtros: por estado, por tipo de cliente, por urgencia
- Búsqueda por nombre o email
- Indicador visual de prioridad (alta / media / baja)
- Acceso al detalle de cada caso con un clic

#### Detalle de Caso (`case-detail.html`)
- Toda la información del formulario enviado por el cliente
- Estado actual y botones para cambiar al siguiente estado
- Historial de cambios de estado con fecha y hora
- Campo para agregar notas internas
- Score de prioridad calculado automáticamente

---

### 3.3 Backend API (`backend/`)

#### Autenticación
- `POST /api/auth/login` — inicio de sesión, devuelve JWT
- `POST /api/auth/logout` — invalida sesión
- `GET /api/auth/me` — datos del usuario autenticado

#### Casos
- `POST /api/cases` — crear nuevo caso (público, desde la landing)
- `GET /api/cases` — listar todos los casos (admin)
- `GET /api/cases/:id` — detalle de un caso (admin)
- `PATCH /api/cases/:id/status` — cambiar estado (admin)
- `POST /api/cases/:id/notes` — agregar nota interna (admin)

#### Dashboard
- `GET /api/dashboard/summary` — métricas generales (admin)

#### Eventos / Tracking
- `POST /api/events` — registrar evento de la landing (público)

#### Health
- `GET /api/health` — estado del servidor (público)

---

## 4. Flujo de Estados de un Caso

```
[nuevo] → [en_revision] → [en_proceso] → [cerrado]
```

- El estado inicial siempre es `nuevo`
- Solo el administrador puede cambiar el estado
- Cada cambio de estado queda registrado con timestamp
- Al cambiar de estado se dispara una notificación al cliente (asíncrona)
- No se puede retroceder de estado (el flujo es unidireccional)

---

## 5. Scoring de Prioridad

El score se calcula automáticamente al crear el caso y se puede recalcular si se edita.

| Factor | Peso |
|---|---|
| Tipo de cliente: empresa | +3 puntos |
| Tipo de cliente: particular | +1 punto |
| Urgencia alta | +3 puntos |
| Urgencia media | +2 puntos |
| Urgencia baja | +1 punto |
| Complejidad estimada (alta) | +2 puntos |
| Complejidad estimada (media) | +1 punto |

**Rangos de prioridad:**
- 7–8 puntos → Prioridad **alta**
- 4–6 puntos → Prioridad **media**
- 1–3 puntos → Prioridad **baja**

---

## 6. Notificaciones

### Al crear un caso:
- **Al cliente:** confirmación de recepción (por el canal preferido)
- **Al admin:** alerta de nuevo caso (email fijo del equipo IWM)

### Al cambiar de estado:
- **Al cliente:** notificación con el nuevo estado del caso

### Canales:
- Email — **SendGrid** (o Resend como alternativa)
- WhatsApp — **Twilio**

Las notificaciones son asíncronas y no bloquean la respuesta de la API.

---

## 7. Clasificación del Tipo de Remitente

El sistema clasifica automáticamente al remitente según el campo `tipo_cliente` del formulario:

- `particular` → flujo estándar individual
- `empresa` → mayor prioridad base en el scoring, campo adicional de nombre de empresa obligatorio

Esta clasificación ajusta el scoring y puede ajustar futuras reglas de negocio sin modificar la estructura del caso.

---

## 8. Requisitos No Funcionales

- El formulario debe enviar en menos de 2 segundos en condiciones normales
- El panel admin debe cargar la lista de casos en menos de 1 segundo
- El sistema debe soportar al menos 100 solicitudes simultáneas sin degradación
- La API debe responder con mensajes de error claros y códigos HTTP correctos
- El sistema debe funcionar correctamente en los últimos 2 años de Chrome, Firefox y Safari
- El panel admin no debe ser indexable por motores de búsqueda (`robots.txt` + `noindex`)

---

## 9. Lo que Está Fuera de Alcance (v1.0)

- Pagos en línea
- Portal de autoservicio para clientes
- Chat en tiempo real
- Reportes exportables (PDF/Excel)
- Multi-usuario admin (solo un administrador en v1.0)
- Integración con CRM externo

---

_Generado con Spec Kit SDD para uso con Claude en VS Code._
