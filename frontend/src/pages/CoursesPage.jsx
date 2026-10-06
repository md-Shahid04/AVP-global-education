import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { coursesAPI } from '../services/api';

const CATEGORIES = [
  'All',
  'Engineering',
  'Medical',
  'Management',
  'Commerce',
  'Computer Science & IT',
  'Science',
  'Arts',
  'Law',
  'Healthcare',
  'Pharmacy',
  'Hospitality',
  'Architecture',
  'Design',
];

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }
        const res = await coursesAPI.getCourses(params);
        if (res.data?.data) {
          setCourses(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCourses, 250);
    return () => clearTimeout(debounce);
  }, [selectedCategory, searchTerm]);

  return (
    <PublicLayout>
      <div className="courses-page-container">
        {/* HERO BANNER */}
        <div
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '50px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            ACADEMIC PROGRAMS
          </p>
          <h1 style={{ fontSize: '36px', margin: '10px 0 16px' }}>Explore Degree & Diploma Courses</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#c8dded' }}>
            Find the right undergraduate, postgraduate, and professional courses tailored to your
            career aspirations with expert admissions assistance.
          </p>
        </div>

        {/* SEARCH AND CATEGORY BAR */}
        <div style={{ maxWidth: '1200px', margin: '40px auto 20px', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px',
            }}
          >
            <div style={{ flex: '1', minWidth: '280px', maxWidth: '450px' }}>
              <input
                type="text"
                placeholder="Search course name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1px solid #ccd6e0',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Showing <strong>{courses.length}</strong> available courses
            </p>
          </div>

          {/* CATEGORY TABS */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '12px',
              marginBottom: '30px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? 'none' : '1px solid #d0d7de',
                  background: selectedCategory === cat ? '#075078' : '#f8fafd',
                  color: selectedCategory === cat ? 'white' : '#334154',
                  fontSize: '13px',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: '0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* COURSES GRID */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
              <p>Loading course directory...</p>
            </div>
          ) : courses.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#f8fafd',
                borderRadius: '8px',
                border: '1px dashed #ccd6e0',
              }}
            >
              <h3 style={{ color: '#075078', marginBottom: '8px' }}>No courses found</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Try adjusting your search criteria or select a different category.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px',
                marginBottom: '60px',
              }}
            >
              {courses.map((course) => (
                <div
                  key={course._id}
                  style={{
                    background: 'white',
                    border: '1px solid #e1e8f0',
                    borderRadius: '8px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: '#075078',
                          background: '#e9f4fa',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {course.category}
                      </span>
                      {course.code && (
                        <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>
                          Code: {course.code}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '17px', color: '#173f78', marginBottom: '8px' }}>
                      {course.name}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      ⏱ <strong>Duration:</strong> {course.duration || '3 Years'}
                      <br />
                      🏫 <strong>Affiliation:</strong> {course.college || 'Multiple Partner Colleges'}
                    </p>

                    {course.description && (
                      <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                        {course.description}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: '#28a745', fontWeight: 600 }}>
                      ● Admissions Open 2026
                    </span>
                    <button
                      onClick={() => navigate(`/request-info?course=${encodeURIComponent(course.name)}`)}
                      style={{
                        background: '#075078',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default CoursesPage;
