import { z } from 'zod';

export const caseSchema = z
  .object({
    nombre: z.string().min(2).max(255),
    email: z.string().email(),
    telefono: z.string().min(7).max(50),
    tipo_cliente: z.enum(['particular', 'empresa']),
    nombre_empresa: z.string().max(255).optional(),
    descripcion: z.string().min(10),
    urgencia: z.enum(['baja', 'media', 'alta']),
    canal_notificacion: z.enum(['email', 'whatsapp']),
  })
  .refine(
    (data) => {
      if (data.tipo_cliente === 'empresa') {
        return data.nombre_empresa && data.nombre_empresa.trim().length > 0;
      }
      return true;
    },
    { message: 'nombre_empresa es requerido cuando tipo_cliente es empresa', path: ['nombre_empresa'] }
  );
