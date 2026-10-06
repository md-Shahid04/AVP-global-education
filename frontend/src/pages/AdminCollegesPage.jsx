import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { collegesAPI } from '../services/api';

const AdminCollegesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCollege, setEditCollege] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: 'Karnataka',
    country: 'India',
    description: '',
    website: '',
    isActive: true,
  });

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await collegesAPI.getAdminColleges({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status: statusFilter,
      });
      if (res.data?.success) {
        setColleges(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchColleges, 200);
    return () => clearTimeout(timer);
  }, [fetchColleges]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await collegesAPI.createCollege(formData);
      if (res.data?.success) {
        setShowAddModal(false);
        setFormData({
          name: '',
          city: '',
          state: 'Karnataka',
          country: 'India',
          description: '',
          website: '',
          isActive: true,
        });
        fetchColleges();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create college');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCollege) return;
    try {
      const res = await collegesAPI.updateCollege(editCollege._id, editCollege);
      if (res.data?.success) {
        setEditCollege(null);
        fetchColleges();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update college');
    }
  };

  const handleToggleStatus = async (college) => {
    try {
      await collegesAPI.updateCollege(college._id, { isActive: !college.isActive });
      fetchColleges();
    } catch (err) {
      alert('Failed to toggle status');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await collegesAPI.deleteCollege(deleteConfirmId);
      setDeleteConfirmId(null);
      fetchColleges();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete college');
    }
  };

  return (
    <AdminLayout title="Affiliated Colleges Directory">
      {/* TOOLBAR */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search college name or city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-accent"
            style={{ marginLeft: 'auto' }}
          >
            + Add New College
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Colleges Database ({pagination.total})</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p>Loading colleges...</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>College Name</th>
                  <th>Location</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college._id}>
                    <td>
                      <strong>{college.name}</strong>
                      {college.description && (
                        <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>
                          {college.description}
                        </p>
                      )}
                    </td>
                    <td>
                      {college.city}, {college.state}
                    </td>
                    <td>{college.country || 'India'}</td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(college)}
                        style={{
                          background: college.isActive ? '#dcfce7' : '#fee2e2',
                          color: college.isActive ? '#15803d' : '#991b1b',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {college.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setEditCollege({ ...college })}
                          className="btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(college._id)}
                          className="btn-danger"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="pagination">
          <div>
            Showing {(pagination.page - 1) * pagination.limit + (colleges.length > 0 ? 1 : 0)} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} colleges
          </div>

          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
            >
              &larr; Prev
            </button>
            <span style={{ fontSize: '12px', padding: '0 8px' }}>
              {pagination.page} / {pagination.pages}
            </span>
            <button
              className="page-btn"
              disabled={pagination.page >= pagination.pages}
              onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ADD COLLEGE MODAL */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New College</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    College Name*
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramaiah Institute of Technology"
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      City*
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bengaluru"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      State*
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Website URL
                  </label>
                  <input
                    type="url"
                    className="search-input"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Brief Description
                  </label>
                  <textarea
                    rows="3"
                    className="search-input"
                    style={{ height: 'auto' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Accreditation, specialties, ranking..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COLLEGE MODAL */}
      {editCollege && (
        <div className="modal-overlay" onClick={() => setEditCollege(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit College</h3>
              <button className="modal-close" onClick={() => setEditCollege(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    College Name*
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={editCollege.name}
                    onChange={(e) => setEditCollege({ ...editCollege, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      City*
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editCollege.city}
                      onChange={(e) => setEditCollege({ ...editCollege, city: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      State*
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editCollege.state}
                      onChange={(e) => setEditCollege({ ...editCollege, state: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Website URL
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={editCollege.website || ''}
                    onChange={(e) => setEditCollege({ ...editCollege, website: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="search-input"
                    style={{ height: 'auto' }}
                    value={editCollege.description || ''}
                    onChange={(e) => setEditCollege({ ...editCollege, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setEditCollege(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#dc2626' }}>Delete College</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Are you sure you want to permanently delete this college?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Delete College
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCollegesPage;
