import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import { apiLimiter } from './middleware/rateLimitMiddleware.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import collegeRoutes from './routes/collegeRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS configuration
const normalizeUrl = (url) => (url ? url.trim().replace(/\/+$/, '') : null);

const configuredClientUrl = normalizeUrl(process.env.CLIENT_URL);
const allowedOrigins = [
  configuredClientUrl,
  'https://avp-global-education-tau.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (such as mobile apps, curl, Postman, health monitors)
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = normalizeUrl(origin);
      const isAllowed =
        allowedOrigins.includes(cleanOrigin) ||
        allowedOrigins.includes(origin) ||
        cleanOrigin.endsWith('.vercel.app');

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing with safe size limits
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// General Rate limiting
app.use('/api', apiLimiter);

// Health check (supports both /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'AVP Global Education API is running',
    timestamp: new Date().toISOString(),
  });
});

// Primary API Routes (standard /api prefix)
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);

// Compatibility Aliases (supports requests without /api prefix to guarantee 0 404 errors)
app.use('/auth', authRoutes);
app.use('/leads', leadRoutes);
app.use('/colleges', collegeRoutes);
app.use('/courses', courseRoutes);
app.use('/contact', contactRoutes);
app.use('/newsletter', newsletterRoutes);
app.use('/admin', adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // In production, keep running or gracefully close
});

export default app;
