import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaTwitter,
  FaArrowUp,
} from 'react-icons/fa';
import { newsletterAPI } from '../services/api';
import '../Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subStatus, setSubStatus] = useState({ loading: false, message: '', error: false });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.trim()) return;

    setSubStatus({ loading: true, message: '', error: false });
    try {
      const res = await newsletterAPI.subscribe(newsletterEmail.trim());
      setSubStatus({
        loading: false,
        message: res.data?.message || 'Thank you for subscribing!',
        error: false,
      });
      setNewsletterEmail('');
    } catch (err) {
      setSubStatus({
        loading: false,
        message: err.response?.data?.message || 'Failed to subscribe. Please try again.',
        error: true,
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Programs</h3>
          <Link to="/courses">Undergraduate</Link>
          <Link to="/courses">Postgraduate</Link>
          <Link to="/services">One to One Counseling</Link>
          <Link to="/colleges">Affiliated Colleges</Link>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <Link to="/services">Career Guidance</Link>
          <Link to="/services">University Admissions</Link>
          <Link to="/services">Scholarship Support</Link>
          <Link to="/services">Visa & Documentation</Link>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/courses">Browse Courses</Link>
          <Link to="/contact">Help Desk & Contact</Link>
          <Link to="/faq">Frequently Asked Questions</Link>
        </div>

        <div className="newsletter">
          <h3>Newsletter</h3>
          <p style={{ color: '#c4c9dc', fontSize: '14px', marginBottom: '14px' }}>
            Subscribe to receive updates on admissions deadlines, cut-offs, and scholarships.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="subscribe-box">
            <input
              type="email"
              placeholder="Email Address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              disabled={subStatus.loading}
            />
            <button type="submit" disabled={subStatus.loading}>
              {subStatus.loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {subStatus.message && (
            <p
              style={{
                marginTop: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: subStatus.error ? '#ff6b6b' : '#1fcf82',
              }}
            >
              {subStatus.message}
            </p>
          )}

          <div className="social-icons">
            <a
              href="https://wa.me/917628954403"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>

            <button
              className="back-to-top"
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          </div>

          <p className="footer-contact-info" style={{ marginTop: '16px' }}>
            Mobile: +91 76289 54403
          </p>

          <p className="footer-contact-info">
            Email: crcnitrox@gmail.com
          </p>
        </div>
      </div>

      <div className="footer-line"></div>

      <div className="footer-bottom">
        <div className="footer-logo">
          <div className="logo-circle">
            <span>AVP</span>
          </div>

          <div className="logo-text">
            <h2>
              <span className="cross">AVP Global</span>
              <span className="culture"> Education</span>
            </h2>
            <p>Education Consultancy</p>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} AVP Global Education. All rights reserved.
        </div>

        <button
          className="back-to-top"
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      </div>

      <div className="policies">
        <Link to="/contact">Contact Us</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/refund-policy">Cancellation & Refund</Link>
        <Link to="/faq">Help Desk</Link>
      </div>
    </footer>
  );
};

export default Footer;
