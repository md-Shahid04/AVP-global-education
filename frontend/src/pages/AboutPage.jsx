import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="about-page">
        {/* BANNER */}
        <section
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '60px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            ABOUT AVP GLOBAL EDUCATION
          </p>
          <h1 style={{ fontSize: '38px', margin: '12px 0 16px' }}>Guiding Future Leaders Since 2012</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '15px', color: '#c8dded', lineHeight: '1.6' }}>
            We bridge the gap between aspiring students and world-class educational institutions,
            delivering unbiased counseling, transparent admissions, and career mentoring.
          </p>
        </section>

        {/* CONTENT */}
        <section style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '60px' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <p className="section-label">OUR MISSION</p>
              <h2 style={{ fontSize: '28px', color: '#173f78', margin: '10px 0 18px' }}>
                Empowering Students with Transparent Admission Guidance
              </h2>
              <p style={{ color: '#555', lineHeight: '1.7', fontSize: '15px', marginBottom: '16px' }}>
                At AVP Global Education, we believe every student deserves access to quality higher education.
                Choosing the right college and degree program can be daunting with hundreds of options,
                differing cut-offs, and complex eligibility criteria.
              </p>
              <p style={{ color: '#555', lineHeight: '1.7', fontSize: '15px' }}>
                Our team of experienced educational counselors personally mentors students and parents,
                ensuring complete clarity on fee structures, curriculum value, campus facilities, and
                placement prospects.
              </p>
            </div>

            <div style={{ flex: '1', minWidth: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                alt="Counseling"
                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
            </div>
          </div>

          {/* STATS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              textAlign: 'center',
              background: '#f8fafd',
              padding: '40px 20px',
              borderRadius: '8px',
              border: '1px solid #e1e8f0',
              marginBottom: '60px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '36px', color: '#f51551', marginBottom: '6px' }}>15,000+</h3>
              <p style={{ color: '#444', fontSize: '14px', fontWeight: 600 }}>Students Counseled</p>
            </div>
            <div>
              <h3 style={{ fontSize: '36px', color: '#075078', marginBottom: '6px' }}>48+</h3>
              <p style={{ color: '#444', fontSize: '14px', fontWeight: 600 }}>Partner Colleges</p>
            </div>
            <div>
              <h3 style={{ fontSize: '36px', color: '#f51551', marginBottom: '6px' }}>92+</h3>
              <p style={{ color: '#444', fontSize: '14px', fontWeight: 600 }}>Degree Programs</p>
            </div>
            <div>
              <h3 style={{ fontSize: '36px', color: '#075078', marginBottom: '6px' }}>98.4%</h3>
              <p style={{ color: '#444', fontSize: '14px', fontWeight: 600 }}>Satisfaction Rate</p>
            </div>
          </div>

          {/* CORE VALUES */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <p className="section-label">WHY CHOOSE US</p>
              <h2 style={{ fontSize: '28px', color: '#173f78' }}>Our Core Pillars of Service</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '18px', color: '#075078', marginBottom: '8px' }}>1. Direct College Tie-Ups</h4>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  We are authorized admission representatives for premier medical, engineering, management, and commerce institutions in Bengaluru and across South India.
                </p>
              </div>

              <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '18px', color: '#075078', marginBottom: '8px' }}>2. Zero Hidden Costs</h4>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Total transparency in fee breakdowns, hostel fees, university registration dues, and payment schedules.
                </p>
              </div>

              <div style={{ padding: '24px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '18px', color: '#075078', marginBottom: '8px' }}>3. Career Mapping</h4>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  Detailed psychometric and aptitude evaluation to match students with high-growth careers in AI, Cloud, Medicine, FinTech, and Law.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, #173f78, #071c42)',
              borderRadius: '8px',
              padding: '40px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Ready to Take the Next Step in Your Education?</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 24px', color: '#c8dded', fontSize: '14px' }}>
              Fill our quick enquiry form to get contacted by an educational counselor within 24 hours.
            </p>
            <button
              onClick={() => navigate('/request-info')}
              style={{
                background: '#f51551',
                color: 'white',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Request Information Now
            </button>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;
