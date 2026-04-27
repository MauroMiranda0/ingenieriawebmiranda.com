// Ejecuta validación Zod sobre req.body antes del controller
export const validate = (schema) => (req, res, next) => {
  const resultado = schema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      detalles: resultado.error.errors.map((e) => ({
        campo: e.path.join('.'),
        mensaje: e.message,
      })),
    });
  }
  req.body = resultado.data;
  next();
};
