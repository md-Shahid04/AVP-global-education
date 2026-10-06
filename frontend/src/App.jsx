import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Public Pages
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import CoursesPage from './pages/CoursesPage';
import CollegesPage from './pages/CollegesPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import { TermsPage, PrivacyPolicyPage, RefundPolicyPage } from './pages/LegalPages';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLeadsPage from './pages/AdminLeadsPage';
import AdminCollegesPage from './pages/AdminCollegesPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import AdminContactsPage from './pages/AdminContactsPage';
import AdminNewsletterPage from './pages/AdminNewsletterPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/request-info" element={<FormPage />} />
          <Route path="/enquire" element={<FormPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/colleges" element={<CollegesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedAdminRoute>
                <AdminLeadsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/colleges"
            element={
              <ProtectedAdminRoute>
                <AdminCollegesPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedAdminRoute>
                <AdminCoursesPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedAdminRoute>
                <AdminContactsPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/newsletter"
            element={
              <ProtectedAdminRoute>
                <AdminNewsletterPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminSettingsPage />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;