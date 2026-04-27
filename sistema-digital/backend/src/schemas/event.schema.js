import { z } from 'zod';

export const eventSchema = z.object({
  tipo: z.enum(['page_view', 'form_start', 'form_submit_success', 'form_submit_error']),
  payload: z.record(z.unknown()).optional(),
});
