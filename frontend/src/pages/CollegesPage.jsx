import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { collegesAPI } from '../services/api';

const CollegesPage = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }
        const res = await collegesAPI.getColleges(params);
        if (res.data?.data) {
          setColleges(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load colleges:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchColleges, 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const cities = ['All', ...new Set(colleges.map((c) => c.city).filter(Boolean))];

  const filteredColleges = colleges.filter((c) => {
    if (selectedCity !== 'All' && c.city !== selectedCity) return false;
    return true;
  });

  return (
    <PublicLayout>
      <div className="colleges-page-container">
        {/* BANNER */}
        <div
          style={{
            background: 'linear-gradient(135deg, #173f78, #071c42)',
            color: 'white',
            padding: '50px 8%',
            textAlign: 'center',
          }}
        >
          <p style={{ color: '#f51551', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
            CAMPUS DIRECTORY
          </p>
          <h1 style={{ fontSize: '36px', margin: '10px 0 16px' }}>Affiliated & Partner Institutions</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#c8dded' }}>
            Explore accredited colleges and universities across Karnataka and India with top-tier
            infrastructure, faculty, and industry placement track records.
          </p>
        </div>

        {/* SEARCH & FILTERS */}
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
                placeholder="Search college name or city..."
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label htmlFor="city-filter" style={{ fontSize: '13px', color: '#555', fontWeight: 600 }}>
                Filter City:
              </label>
              <select
                id="city-filter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid #ccd6e0',
                  fontSize: '13px',
                  outline: 'none',
                  background: 'white',
                }}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GRID */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
              <p>Loading college directory...</p>
            </div>
          ) : filteredColleges.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#f8fafd',
                borderRadius: '8px',
                border: '1px dashed #ccd6e0',
              }}
            >
              <h3 style={{ color: '#075078', marginBottom: '8px' }}>No colleges found</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Try adjusting your search keywords or city filter.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px',
                marginBottom: '60px',
              }}
            >
              {filteredColleges.map((college) => (
                <div
                  key={college._id}
                  style={{
                    background: 'white',
                    border: '1px solid #e1e8f0',
                    borderRadius: '8px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '26px' }}>🏛️</span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#075078',
                          background: '#e9f4fa',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {college.state}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '17px', color: '#173f78', marginBottom: '8px' }}>
                      {college.name}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
                      📍 <strong>Location:</strong> {college.city}, {college.state}, {college.country || 'India'}
                    </p>

                    {college.description && (
                      <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                        {college.description}
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
                      ● Direct Counseling Partner
                    </span>
                    <button
                      onClick={() => navigate(`/request-info?college=${encodeURIComponent(college.name)}`)}
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
                      Enquire Admission
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

export default CollegesPage;
