import helmet from 'helmet';
import cors from 'cors';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

export const securityMiddleware = [
  helmet(),
  cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, curl) solo en desarrollo
      if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    credentials: true,
  }),
];
