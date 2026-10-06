import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div>
          <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</Link>
          &nbsp; | &nbsp;
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Help Desk</Link>
          &nbsp; | &nbsp;
          <Link to="/admin/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>Admin Login</Link>
        </div>

        <div className="top-bar-socials">
          <span>📞 Admissions Helpline: +91 76289 54403</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="website-header">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-icon">▣</span>
          <div>
            <strong>AVP GLOBAL</strong>
            <strong>EDUCATION</strong>
            <small>Education & Lead Management Platform</small>
          </div>
        </Link>

        <div className="contact-info">
          <div>
            <span>📞</span>
            <span>
              <strong>CALL US TODAY!</strong>
              <br />
              +91 76289 54403
            </span>
          </div>

          <div>
            <span>🕐</span>
            <span>
              <strong>WE ARE OPEN!</strong>
              <br />
              Mon-Fri 8:00-18:00
            </span>
          </div>
        </div>

        {/* Mobile menu hamburger toggle button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* NAVIGATION */}
      <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          About Us
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          Courses
        </NavLink>
        <NavLink
          to="/colleges"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          Colleges
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={() => setMobileMenuOpen(false)}
        >
          FAQ
        </NavLink>

        <button
          className="book-now-btn"
          onClick={() => {
            setMobileMenuOpen(false);
            navigate('/request-info');
          }}
        >
          Request Information
        </button>
      </nav>
    </>
  );
};

export default Header;
