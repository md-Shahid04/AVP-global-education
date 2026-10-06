import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { formLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

router.post('/', formLimiter, submitContact);

export default router;
