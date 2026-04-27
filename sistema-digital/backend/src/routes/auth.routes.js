import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { authLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

router.post('/auth/login', authLimiter, validate(loginSchema), authController.login);
router.post('/auth/logout', authMiddleware, authController.logout);
router.get('/auth/me', authMiddleware, authController.me);

export default router;
