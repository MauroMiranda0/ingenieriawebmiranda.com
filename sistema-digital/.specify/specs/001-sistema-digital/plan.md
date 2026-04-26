# Technical Plan — Sistema Digital IWM
> Versión 1.0 · Spec Kit SDD · `/speckit.plan`

---

## 1. Decisiones Técnicas

| Decisión | Elección | Justificación |
|---|---|---|
| Base de datos | PostgreSQL | Robustez, escalabilidad, soporte JSON nativo |
| ORM / Query | node-postgres (`pg`) | Control directo del SQL, sin overhead de ORM completo |
| Validación | Zod | TypeScript-friendly, composable, mensajes claros |
| Autenticación | JWT (jsonwebtoken) | Sin estado, fácil de validar en middleware |
| Hashing | bcrypt | Estándar para contraseñas, configurable por rondas |
| Email | SendGrid SDK | API confiable, buen free tier para empezar |
| WhatsApp | Twilio SDK | Integración oficial con WhatsApp Business API |
| Frontend actual | HTML/CSS/JS vanilla | Ya existe en producción, se conecta al backend |
| Frontend futuro | React + Vite | Migración progresiva por módulo |
| CSS | Tailwind CSS | Ya en uso en el proyecto corporativo |
| Deploy | VPS (principal) + Vercel (frontend opcional) | Control total del backend, agilidad en frontend |
| CI/CD | GitHub Actions | Integrado con el repositorio existente |
| Logging | Winston | Niveles de log, formato JSON, fácil de filtrar |

---

## 2. Arquitectura del Sistema

```
Cliente (browser)
      │
      ├── frontend-public/     → landing page (HTML/CSS/JS → React/Vite)
      │         │
      │         ├── POST /api/cases
      │             POST /api/events
      │
      └── frontend-admin/      → panel privado (HTML/CSS/JS → React/Vite)
                │
                └── todas las rutas /api/* (con JWT)

                        │
                        ▼
                   backend/ (Express)
                        │
              ───────────┼──────────
           routes/  middleware/  schemas/
              │
         controllers/
              │
           services/
              │
         repositories/
              │
          PostgreSQL
```

---

## 3. Esquema de Base de Datos

### Tabla `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `cases`
```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  tipo_cliente VARCHAR(20) NOT NULL CHECK (tipo_cliente IN ('particular', 'empresa')),
  nombre_empresa VARCHAR(255),
  descripcion TEXT NOT NULL,
  urgencia VARCHAR(20) NOT NULL CHECK (urgencia IN ('baja', 'media', 'alta')),
  canal_notificacion VARCHAR(20) NOT NULL CHECK (canal_notificacion IN ('email', 'whatsapp')),
  estado VARCHAR(30) DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'en_revision', 'en_proceso', 'cerrado')),
  prioridad VARCHAR(20) DEFAULT 'baja' CHECK (prioridad IN ('baja', 'media', 'alta')),
  score INTEGER DEFAULT 0,
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `case_history`
```sql
CREATE TABLE case_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  estado_anterior VARCHAR(30),
  estado_nuevo VARCHAR(30) NOT NULL,
  changed_by UUID REFERENCES users(id),
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  nota TEXT
);
```

### Tabla `events`
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo VARCHAR(100) NOT NULL,
  payload JSONB,
  ip VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. Endpoints de la API

### Públicos (sin autenticación)

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/cases` | Crear nuevo caso desde la landing |
| `POST` | `/api/events` | Registrar evento de tracking |
| `GET` | `/api/health` | Health check del servidor |

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Login con email + contraseña, devuelve JWT |
| `POST` | `/api/auth/logout` | Logout (invalida token en cliente) |
| `GET` | `/api/auth/me` | Datos del usuario autenticado |

### Privados (requieren JWT válido)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/cases` | Listar casos con filtros y paginación |
| `GET` | `/api/cases/:id` | Detalle de un caso |
| `PATCH` | `/api/cases/:id/status` | Cambiar estado del caso |
| `POST` | `/api/cases/:id/notes` | Agregar nota interna al caso |
| `GET` | `/api/dashboard/summary` | Métricas del dashboard |

---

## 5. Middleware Stack (en orden de ejecución)

```
Request
  → security.middleware     (helmet, CORS configurado)
  → rate-limit.middleware   (express-rate-limit)
  → auth.middleware         (verifica JWT en rutas privadas)
  → validate.middleware     (valida body con Zod)
  → controller
  → error.middleware        (manejo centralizado de errores)
Response
```

---

## 6. Lógica del Scoring Service

```javascript
// scoring.service.js
function calcularScore({ tipo_cliente, urgencia }) {
  let score = 0;

  if (tipo_cliente === 'empresa') score += 3;
  if (tipo_cliente === 'particular') score += 1;

  if (urgencia === 'alta') score += 3;
  if (urgencia === 'media') score += 2;
  if (urgencia === 'baja') score += 1;

  let prioridad = 'baja';
  if (score >= 7) prioridad = 'alta';
  else if (score >= 4) prioridad = 'media';

  return { score, prioridad };
}
```

---

## 7. Flujo de Creación de un Caso (POST /api/cases)

```
1. Recibir body del formulario
2. validate.middleware → Zod schema valida campos
3. cases.controller → llama case.service.crear()
4. case.service:
   a. scoring.service.calcularScore()
   b. case.repository.insertar()
   c. notification.service.enviarConfirmacion() [asíncrono]
5. Responder 201 con { id, estado, prioridad }
```

---

## 8. Seguridad — Implementación

```javascript
// security.middleware.js
import helmet from 'helmet';
import cors from 'cors';

const allowedOrigins = [
  'https://ingenieriawebmiranda.com',
  'https://www.ingenieriawebmiranda.com'
];

app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
```

```javascript
// rate-limit.middleware.js
import rateLimit from 'express-rate-limit';

export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Demasiadas solicitudes. Intenta más tarde.' }
});
```

---

## 9. Estrategia de Migración Frontend (vanilla → React/Vite)

La migración es progresiva y no bloquea el desarrollo del backend. El orden recomendado:

1. **Fase 1 (actual):** HTML/CSS/JS vanilla conectado a la API
2. **Fase 2:** Migrar `frontend-admin/` a React + Vite (mayor complejidad de estado)
3. **Fase 3:** Migrar `frontend-public/` a React + Vite (mejora de performance y SEO)

Cada fase es independiente — el backend no cambia entre fases.

---

## 10. Deploy en VPS

### Estructura de servicios en producción

```
VPS
├── nginx (reverse proxy)
│   ├── / → frontend-public (static files)
│   ├── /admin → frontend-admin (static files)
│   └── api.* → backend (puerto 3000)
├── Node.js (PM2 como process manager)
└── PostgreSQL (local o contenedor Docker)
```

### Variables de entorno requeridas (`.env`)

```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/iwm_db

# JWT
JWT_SECRET=secreto_muy_largo_y_aleatorio
JWT_EXPIRES_IN=8h

# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxx
EMAIL_FROM=noreply@ingenieriawebmiranda.com

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Servidor
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://ingenieriawebmiranda.com
```

### GitHub Actions — CI/CD básico

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy a VPS vía SSH
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/iwm-sistema-digital
            git pull origin main
            cd backend && npm install --production
            pm2 restart iwm-backend
```

---

## 11. Testing

### Cobertura mínima requerida

| Módulo | Qué se prueba |
|---|---|
| `auth.test.js` | Login correcto, login fallido, token inválido |
| `cases.test.js` | Crear caso válido, validación de campos, scoring correcto |
| `status.test.js` | Transiciones de estado válidas, rechazo de transiciones inválidas |

### Herramienta recomendada
- **Jest** + **Supertest** para pruebas de integración de la API

---

_Generado con Spec Kit SDD para uso con Claude en VS Code._
