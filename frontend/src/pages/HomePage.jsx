import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { coursesAPI, collegesAPI } from '../services/api';

function HomePage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, collegeRes] = await Promise.all([
          coursesAPI.getCourses(),
          collegesAPI.getColleges(),
        ]);
        if (courseRes.data?.data) {
          setCourses(courseRes.data.data.slice(0, 6));
        }
        if (collegeRes.data?.data) {
          setColleges(collegeRes.data.data.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching preview data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PublicLayout>
      <div className="home-page">
        {/* HERO */}
        <section className="education-hero">
          <div className="hero-overlay">
            <h1>EDUCATION</h1>
            <h2>EDUCATION FOR EVERYONE</h2>
            <p>
              We provide always our best services for our clients and always try to achieve our
              client's trust and satisfaction.
            </p>
            <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/request-info')}
                style={{
                  padding: '12px 26px',
                  background: '#f51551',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(245, 21, 81, 0.4)',
                }}
              >
                REQUEST INFORMATION
              </button>
              <button
                onClick={() => navigate('/courses')}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                EXPLORE COURSES
              </button>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="education-content">
          <p className="section-label">ALL ABOUT</p>
          <h2>THE WORLD'S BEST EDUCATION</h2>
          <p>
            Welcome to our education portal. Explore courses, learning opportunities and programs
            designed for everyone. We guide students at every phase — from selecting accredited colleges
            and optimal degree programs to admission counseling and scholarships.
          </p>

          {/* HIGHLIGHT STATS / FEATURES */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginTop: '45px',
            }}
          >
            <div
              style={{
                background: '#f8fafd',
                border: '1px solid #e1e8f0',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #075078',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎯</div>
              <h3 style={{ fontSize: '18px', color: '#173f78', marginBottom: '8px' }}>
                Expert Counseling
              </h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                One-on-one personalized mentorship to align your strengths with top programs and careers.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafd',
                border: '1px solid #e1e8f0',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #f51551',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🏛️</div>
              <h3 style={{ fontSize: '18px', color: '#173f78', marginBottom: '8px' }}>
                45+ Top Colleges
              </h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                Direct counseling access to premier medical, engineering, management, and commerce colleges.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafd',
                border: '1px solid #e1e8f0',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #075078',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>📜</div>
              <h3 style={{ fontSize: '18px', color: '#173f78', marginBottom: '8px' }}>
                90+ Accredited Courses
              </h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                Undergraduate, Postgraduate, and Professional certifications across diverse disciplines.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafd',
                border: '1px solid #e1e8f0',
                borderRadius: '8px',
                padding: '24px',
                borderTop: '4px solid #f51551',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>🎓</div>
              <h3 style={{ fontSize: '18px', color: '#173f78', marginBottom: '8px' }}>
                100% Admission Support
              </h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                End-to-end guidance through application submission, documentation, and seat confirmations.
              </p>
            </div>
          </div>

          {/* POPULAR COURSES PREVIEW */}
          <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <p className="section-label">EXPLORE MAJORS</p>
                <h3 style={{ fontSize: '24px', color: '#173f78', margin: '4px 0' }}>Popular Courses</h3>
              </div>
              <Link
                to="/courses"
                style={{
                  color: '#f51551',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                View All Courses &rarr;
              </Link>
            </div>

            {loading ? (
              <p style={{ color: '#888' }}>Loading courses...</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px',
                }}
              >
                {courses.map((course) => (
                  <div
                    key={course._id}
                    style={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '20px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: '#075078',
                          background: '#e9f4fa',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {course.category || 'Degree'}
                      </span>
                      <h4 style={{ fontSize: '16px', color: '#202535', margin: '12px 0 6px' }}>
                        {course.name}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#777' }}>
                        Duration: {course.duration || '3 Years'} &bull; College: {course.college || 'Multiple Colleges'}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#28a745', fontWeight: 600 }}>● Admissions Open</span>
                      <button
                        onClick={() => navigate(`/request-info?course=${encodeURIComponent(course.name)}`)}
                        style={{
                          background: '#075078',
                          color: 'white',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PARTNER COLLEGES PREVIEW */}
          <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <p className="section-label">OUR NETWORK</p>
                <h3 style={{ fontSize: '24px', color: '#173f78', margin: '4px 0' }}>Affiliated & Partner Colleges</h3>
              </div>
              <Link
                to="/colleges"
                style={{
                  color: '#f51551',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                View All Colleges &rarr;
              </Link>
            </div>

            {loading ? (
              <p style={{ color: '#888' }}>Loading colleges...</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px',
                }}
              >
                {colleges.map((col) => (
                  <div
                    key={col._id}
                    style={{
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '22px', marginBottom: '8px' }}>🏫</div>
                      <h4 style={{ fontSize: '16px', color: '#202535', marginBottom: '6px' }}>
                        {col.name}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#666' }}>
                        📍 {col.city}, {col.state}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f0f0f0' }}>
                      <button
                        onClick={() => navigate(`/request-info?college=${encodeURIComponent(col.name)}`)}
                        style={{
                          width: '100%',
                          background: '#f8fafd',
                          color: '#075078',
                          border: '1px solid #075078',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        Apply for Admission
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CALL TO ACTION BANNER */}
          <div
            style={{
              marginTop: '60px',
              background: 'linear-gradient(135deg, #173f78, #071c42)',
              borderRadius: '8px',
              padding: '40px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ maxWidth: '650px' }}>
              <h3 style={{ fontSize: '26px', marginBottom: '10px' }}>
                Need Guidance for the 2026 Academic Session?
              </h3>
              <p style={{ fontSize: '14px', color: '#c8dded', lineHeight: '1.6' }}>
                Speak directly with an education counselor today. We evaluate your academic qualifications,
                budget, and career aspirations to recommend the best colleges and degree options.
              </p>
            </div>
            <button
              onClick={() => navigate('/request-info')}
              style={{
                background: '#f51551',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Fill Enquiry Form
            </button>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

export default HomePage;
