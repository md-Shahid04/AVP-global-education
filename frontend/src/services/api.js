import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edu_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses and unauthorized redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we are currently in an admin page, clear token and redirect
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('edu_admin_token');
        localStorage.removeItem('edu_admin_user');
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updatePassword: (passwords) => api.put('/auth/update-password', passwords),
};

export const leadsAPI = {
  submitLead: (data) => api.post('/leads', data),
  getLeads: (params) => api.get('/admin/leads', { params }),
  getLeadById: (id) => api.get(`/admin/leads/${id}`),
  updateLead: (id, data) => api.patch(`/admin/leads/${id}`, data),
  updateLeadStatus: (id, status, note) => api.patch(`/admin/leads/${id}/status`, { status, note }),
  addLeadNote: (id, text) => api.post(`/admin/leads/${id}/notes`, { text }),
  deleteLead: (id) => api.delete(`/admin/leads/${id}`),
};

export const collegesAPI = {
  getColleges: (params) => api.get('/colleges', { params }),
  getAdminColleges: (params) => api.get('/admin/colleges', { params }),
  createCollege: (data) => api.post('/admin/colleges', data),
  updateCollege: (id, data) => api.patch(`/admin/colleges/${id}`, data),
  deleteCollege: (id) => api.delete(`/admin/colleges/${id}`),
};

export const coursesAPI = {
  getCourses: (params) => api.get('/courses', { params }),
  getAdminCourses: (params) => api.get('/admin/courses', { params }),
  createCourse: (data) => api.post('/admin/courses', data),
  updateCourse: (id, data) => api.patch(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAdminContacts: (params) => api.get('/admin/contacts', { params }),
  updateStatus: (id, status) => api.patch(`/admin/contacts/${id}/status`, { status }),
  deleteContact: (id) => api.delete(`/admin/contacts/${id}`),
};

export const newsletterAPI = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  getAdminSubscribers: (params) => api.get('/admin/newsletter', { params }),
  updateSubscriber: (id, data) => api.patch(`/admin/newsletter/${id}`, data),
  deleteSubscriber: (id) => api.delete(`/admin/newsletter/${id}`),
};

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};

export default api;
