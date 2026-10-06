import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Admin.css';

const AdminLayout = ({ children, title = 'Admin Portal' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="logo-badge">AVP</div>
          <div>
            <h2>AVP Global Education</h2>
            <small>Admin Management</small>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/leads"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>👥</span>
            <span>Student Leads</span>
          </NavLink>

          <NavLink
            to="/admin/colleges"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>🏛️</span>
            <span>Colleges</span>
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>📚</span>
            <span>Courses</span>
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>✉️</span>
            <span>Help Desk Inquiries</span>
          </NavLink>

          <NavLink
            to="/admin/newsletter"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>📰</span>
            <span>Newsletter Subscribers</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
            onClick={() => setSidebarOpen(false)}
          >
            <span>⚙️</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-avatar">
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
            <div className="admin-user-details">
              <h4>{user?.name || 'Admin'}</h4>
              <span>{user?.role || 'Administrator'}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="admin-logout-btn">
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 95,
          }}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'block',
              }}
              aria-label="Toggle navigation drawer"
            >
              ☰
            </button>
            <h1>{title}</h1>
          </div>

          <div className="admin-topbar-right">
            <Link to="/" target="_blank" className="view-site-btn">
              🌐 View Public Site
            </Link>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
