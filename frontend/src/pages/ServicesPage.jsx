import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Personalized Career Counseling',
      icon: '🧭',
      desc: 'Our certified counselors conduct one-on-one sessions to understand your academic strengths, passions, and long-term career goals, helping you select the ideal degree pathway.',
      features: ['Aptitude & interest evaluation', 'Industry trend insights', 'Course curriculum comparison'],
    },
    {
      title: 'College Selection & Admissions',
      icon: '🏛️',
      desc: 'Guidance through 45+ premier universities and colleges in Bengaluru, Karnataka, and across India. We manage deadlines, eligibility verification, and application documentation.',
      features: ['Merit list & cut-off analysis', 'Application form preparation', 'Seat booking & provisional letters'],
    },
    {
      title: 'Scholarship & Financial Aid Guidance',
      icon: '💰',
      desc: 'Identify institutional scholarships, government grants, and education loan tie-ups to ensure your higher education is affordable and accessible without financial stress.',
      features: ['Merit scholarship identification', 'Education loan bank tie-ups', 'Fee installment planning'],
    },
    {
      title: 'Campus Visits & Hostel Assistance',
      icon: '🛏️',
      desc: 'We assist outstation and overseas candidates in arranging verified campus tours, inspecting hostel facilities, safety provisions, and local connectivity.',
      features: ['Hostel room reservation assistance', 'Campus tour coordination', 'Local travel and arrival support'],
    },
  ];

  return (
    <PublicLayout>
      <div className="services-page">
        {/* HERO */}
        <section
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '50px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            WHAT WE DO
          </p>
          <h1 style={{ fontSize: '36px', margin: '12px 0 16px' }}>Our Educational Services</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#c8dded' }}>
            Comprehensive guidance designed to make your admission journey smooth, transparent, and rewarding.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginBottom: '60px',
            }}
          >
            {services.map((srv, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  border: '1px solid #e1e8f0',
                  borderRadius: '8px',
                  padding: '30px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{srv.icon}</div>
                  <h3 style={{ fontSize: '19px', color: '#173f78', marginBottom: '12px' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                    {srv.desc}
                  </p>
                  <ul style={{ paddingLeft: '20px', color: '#444', fontSize: '13px', lineHeight: '1.8' }}>
                    {srv.features.map((feat, fidx) => (
                      <li key={fidx}>{feat}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                  <button
                    onClick={() => navigate('/request-info')}
                    style={{
                      width: '100%',
                      background: '#075078',
                      color: 'white',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    Enquire for this Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ServicesPage;
