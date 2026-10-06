import { useState } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import { contactAPI } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: '', error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: false, message: '', error: false });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ success: false, message: 'Please complete all required fields.', error: true });
      return;
    }

    setLoading(true);
    try {
      const res = await contactAPI.submit(formData);
      setStatus({
        success: true,
        message: res.data?.message || 'Your message has been sent successfully!',
        error: false,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Admission Enquiry',
        message: '',
      });
    } catch (err) {
      setStatus({
        success: false,
        message: err.response?.data?.message || 'Failed to send message. Please try again.',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="contact-page">
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '50px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            HELP DESK & SUPPORT
          </p>
          <h1 style={{ fontSize: '36px', margin: '12px 0 16px' }}>Get in Touch With Us</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#c8dded' }}>
            Have questions about college admissions, cut-offs, or course eligibility? Our advisory team
            is here to assist you every day.
          </p>
        </section>

        {/* CONTENT */}
        <section style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {/* CONTACT DETAILS */}
            <div style={{ flex: '1', minWidth: '300px' }}>
              <p className="section-label">CONTACT DETAILS</p>
              <h2 style={{ fontSize: '26px', color: '#173f78', margin: '10px 0 20px' }}>
                Visit Our Counseling Center
              </h2>

              <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', color: '#075078' }}>📍</span>
                <div>
                  <h4 style={{ fontSize: '15px', color: '#202535', marginBottom: '4px' }}>Office Address</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                    45 Residency Road, Ashok Nagar,<br />
                    Opposite Bishop Cotton Boys' School,<br />
                    Bengaluru, Karnataka - 560025, India
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', color: '#075078' }}>📞</span>
                <div>
                  <h4 style={{ fontSize: '15px', color: '#202535', marginBottom: '4px' }}>Phone Numbers</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                    Admissions Helpline: +91 76289 54403<br />
                    Mobile / WhatsApp: +91 76289 54403
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', color: '#075078' }}>✉️</span>
                <div>
                  <h4 style={{ fontSize: '15px', color: '#202535', marginBottom: '4px' }}>Email Inquiries</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                    crcnitrox@gmail.com<br />
                    admissions@avpglobaleducation.com
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', color: '#075078' }}>🕐</span>
                <div>
                  <h4 style={{ fontSize: '15px', color: '#202535', marginBottom: '4px' }}>Working Hours</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed (Helpline active)
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div
              style={{
                flex: '1.2',
                minWidth: '320px',
                background: '#f8fafd',
                border: '1px solid #d9e2ec',
                borderRadius: '8px',
                padding: '30px',
              }}
            >
              <h3 style={{ fontSize: '20px', color: '#075078', marginBottom: '8px' }}>
                Send Us a Direct Message
              </h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
                Fill out the form below and an admissions representative will reply within 24 hours.
              </p>

              {status.message && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    marginBottom: '16px',
                    background: status.error ? '#ffebee' : '#e8f5e9',
                    color: status.error ? '#c62828' : '#2e7d32',
                    border: `1px solid ${status.error ? '#ffcdd2' : '#c8e6c9'}`,
                  }}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334154', marginBottom: '6px' }}>
                    Full Name*
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      background: 'white',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <label htmlFor="contact-email" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334154', marginBottom: '6px' }}>
                      Email Address*
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'white',
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334154', marginBottom: '6px' }}>
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '14px',
                        background: 'white',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334154', marginBottom: '6px' }}>
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      background: 'white',
                    }}
                  >
                    <option value="Admission Enquiry">Admission Enquiry</option>
                    <option value="Fee Structure & Scholarships">Fee Structure & Scholarships</option>
                    <option value="Hostel & Accommodation">Hostel & Accommodation</option>
                    <option value="Institutional Partnership">Institutional Partnership</option>
                    <option value="Other Query">Other Query</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334154', marginBottom: '6px' }}>
                    Your Message*
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your query or requirement..."
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      border: '1px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '14px',
                      background: 'white',
                      resize: 'vertical',
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#075078',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
