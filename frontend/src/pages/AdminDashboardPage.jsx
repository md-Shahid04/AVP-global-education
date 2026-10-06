import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { adminAPI, leadsAPI } from '../services/api';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickStatusChange = async (leadId, newStatus) => {
    try {
      await leadsAPI.updateLeadStatus(leadId, newStatus);
      fetchStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <AdminLayout title="Admissions & Lead Management Dashboard">
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
          <p>Loading dashboard metrics...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '20px', background: '#ffebee', color: '#c62828', borderRadius: '6px' }}>
          {error}
        </div>
      ) : (
        <>
          {/* TOP KPI CARDS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#075078' }} />
              <div>
                <p>Total Leads</p>
                <h3>{stats?.counts?.total || 0}</h3>
              </div>
              <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                👥
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#0284c7' }} />
              <div>
                <p>New Enquiries</p>
                <h3 style={{ color: '#0284c7' }}>{stats?.counts?.new || 0}</h3>
              </div>
              <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                ✨
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#f59e0b' }} />
              <div>
                <p>In Follow-Up</p>
                <h3 style={{ color: '#d97706' }}>
                  {(stats?.counts?.contacted || 0) + (stats?.counts?.followUp || 0)}
                </h3>
              </div>
              <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                📞
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#8b5cf6' }} />
              <div>
                <p>Interested / Ready</p>
                <h3 style={{ color: '#7c3aed' }}>{stats?.counts?.interested || 0}</h3>
              </div>
              <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                ⭐
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#10b981' }} />
              <div>
                <p>Applications Filed</p>
                <h3 style={{ color: '#059669' }}>{stats?.counts?.application || 0}</h3>
              </div>
              <div className="stat-icon" style={{ background: '#d1fae5', color: '#059669' }}>
                📝
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-border-top" style={{ background: '#22c55e' }} />
              <div>
                <p>Admitted Students</p>
                <h3 style={{ color: '#16a34a' }}>{stats?.counts?.admitted || 0}</h3>
              </div>
              <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                🎓
              </div>
            </div>
          </div>

          {/* SECONDARY ROW: QUICK STATS & ACTIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            <div className="admin-card" style={{ padding: '24px', margin: 0 }}>
              <h3 style={{ fontSize: '15px', color: '#173f78', marginBottom: '16px' }}>
                Admissions Funnel Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● New Inquiries:</span>
                  <strong>{stats?.counts?.new || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● Contacted & In Discussion:</span>
                  <strong>{stats?.counts?.contacted || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● Active Follow-Up:</span>
                  <strong>{stats?.counts?.followUp || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● High Interest:</span>
                  <strong>{stats?.counts?.interested || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● Application Processing:</span>
                  <strong>{stats?.counts?.application || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● Confirmed Admissions:</span>
                  <strong style={{ color: '#16a34a' }}>{stats?.counts?.admitted || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>● Closed / Rejected:</span>
                  <strong style={{ color: '#991b1b' }}>
                    {(stats?.counts?.closed || 0) + (stats?.counts?.rejected || 0)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="admin-card" style={{ padding: '24px', margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '15px', color: '#173f78', marginBottom: '12px' }}>
                  Quick Shortcuts
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Easily manage course catalogs, affiliated institutions, or review candidate submissions.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/admin/leads')} className="btn-primary">
                    View All Leads ({stats?.counts?.total || 0})
                  </button>
                  <button onClick={() => navigate('/admin/colleges')} className="btn-outline">
                    Colleges ({stats?.counts?.colleges || 0})
                  </button>
                  <button onClick={() => navigate('/admin/courses')} className="btn-outline">
                    Courses ({stats?.counts?.courses || 0})
                  </button>
                  <button onClick={() => navigate('/admin/contacts')} className="btn-outline">
                    Help Inquiries ({stats?.counts?.unreadContacts || 0} new)
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafd', borderRadius: '6px', fontSize: '12px', color: '#555' }}>
                💡 <strong>Tip:</strong> Changing a lead's status to <em>Admitted</em> or <em>Application</em> automatically appends an audit note to the student's timeline.
              </div>
            </div>
          </div>

          {/* RECENT LEADS TABLE */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Recent Student Inquiries</h2>
              <Link to="/admin/leads" style={{ color: '#075078', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
                Manage All Leads &rarr;
              </Link>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Contact Info</th>
                    <th>Target College</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Quick Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {!stats?.recentLeads || stats.recentLeads.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '30px' }}>
                        No leads recorded yet.
                      </td>
                    </tr>
                  ) : (
                    stats.recentLeads.map((lead) => (
                      <tr key={lead._id}>
                        <td>
                          <strong>{lead.firstName} {lead.lastName}</strong>
                          <br />
                          <small style={{ color: '#64748b' }}>{lead.address?.city || 'India'}</small>
                        </td>
                        <td>
                          <div>✉️ {lead.email}</div>
                          <div>📞 {lead.phone}</div>
                        </td>
                        <td style={{ maxWidth: '200px' }}>{lead.college}</td>
                        <td style={{ maxWidth: '180px' }}>{lead.course}</td>
                        <td>
                          <span className={`status-pill status-${lead.status}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleQuickStatusChange(lead._id, e.target.value)}
                            style={{
                              fontSize: '11px',
                              padding: '4px 6px',
                              border: '1px solid #ccd6e0',
                              borderRadius: '4px',
                              background: 'white',
                            }}
                          >
                            <option value="new">new</option>
                            <option value="contacted">contacted</option>
                            <option value="follow-up">follow-up</option>
                            <option value="interested">interested</option>
                            <option value="application">application</option>
                            <option value="admitted">admitted</option>
                            <option value="rejected">rejected</option>
                            <option value="closed">closed</option>
                          </select>
                        </td>
                        <td>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboardPage;
