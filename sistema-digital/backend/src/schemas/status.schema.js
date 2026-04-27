import { z } from 'zod';

export const statusSchema = z.object({
  estado: z.enum(['nuevo', 'en_revision', 'en_proceso', 'cerrado']),
  nota: z.string().max(1000).optional(),
});
