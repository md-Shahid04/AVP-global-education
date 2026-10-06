import express from 'express';
import { subscribe } from '../controllers/newsletterController.js';
import { formLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/subscribe', formLimiter, subscribe);

export default router;
