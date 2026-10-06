import express from 'express';
import { createLead } from '../controllers/leadController.js';
import { formLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/', formLimiter, createLead);

export default router;
