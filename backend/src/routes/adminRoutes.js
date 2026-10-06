import express from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../controllers/adminController.js';
import {
  getLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
} from '../controllers/leadController.js';
import {
  getAdminColleges,
  createCollege,
  updateCollege,
  deleteCollege,
} from '../controllers/collegeController.js';
import {
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import {
  getSubscribers,
  updateSubscriber,
  deleteSubscriber,
} from '../controllers/newsletterController.js';

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(protectAdmin);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Lead Management
router.get('/leads', getLeads);
router.get('/leads/:id', getLeadById);
router.patch('/leads/:id', updateLead);
router.patch('/leads/:id/status', updateLeadStatus);
router.post('/leads/:id/notes', addLeadNote);
router.delete('/leads/:id', deleteLead);

// College Management
router.get('/colleges', getAdminColleges);
router.post('/colleges', createCollege);
router.patch('/colleges/:id', updateCollege);
router.delete('/colleges/:id', deleteCollege);

// Course Management
router.get('/courses', getAdminCourses);
router.post('/courses', createCourse);
router.patch('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

// Contact Management
router.get('/contacts', getContacts);
router.patch('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

// Newsletter Management
router.get('/newsletter', getSubscribers);
router.patch('/newsletter/:id', updateSubscriber);
router.delete('/newsletter/:id', deleteSubscriber);

export default router;
