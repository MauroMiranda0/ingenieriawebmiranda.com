import { logger } from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;

  // No exponer detalles internos en producción
  const mensaje =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Error interno del servidor'
      : err.message;

  logger.error('Error en la aplicación', {
    status,
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  res.status(status).json({ error: mensaje });
};
