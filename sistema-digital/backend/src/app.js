import express from 'express';
import { securityMiddleware } from './middleware/security.middleware.js';
import { publicLimiter } from './middleware/rate-limit.middleware.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(securityMiddleware);

// Rutas públicas con rate limit
app.use('/api', publicLimiter);
app.use('/api', healthRoutes);
app.use('/api', authRoutes);

// Manejo centralizado de errores (debe ir al final)
app.use(errorMiddleware);

export default app;
