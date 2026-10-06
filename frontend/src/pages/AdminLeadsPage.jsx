import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { leadsAPI, collegesAPI, coursesAPI } from '../services/api';

const STATUSES = [
  'all',
  'new',
  'contacted',
  'follow-up',
  'interested',
  'application',
  'admitted',
  'rejected',
  'closed',
];

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Options for dropdowns
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  // Modals
  const [selectedLead, setSelectedLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Load dropdown options once
  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [colRes, crsRes] = await Promise.all([
          collegesAPI.getColleges(),
          coursesAPI.getCourses(),
        ]);
        if (colRes.data?.data) setColleges(colRes.data.data);
        if (crsRes.data?.data) setCourses(crsRes.data.data);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadDropdownData();
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        status: statusFilter,
        college: collegeFilter,
        course: courseFilter,
        search,
        sortBy,
        sortOrder,
      };

      const res = await leadsAPI.getLeads(params);
      if (res.data?.success) {
        setLeads(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter, collegeFilter, courseFilter, search, sortBy, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 200);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await leadsAPI.updateLeadStatus(leadId, newStatus);
      if (res.data?.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(res.data.data);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    setSavingNote(true);
    try {
      const res = await leadsAPI.addLeadNote(selectedLead._id, newNoteText.trim());
      if (res.data?.success) {
        setSelectedLead(res.data.data);
        setNewNoteText('');
        // Update in table view as well
        setLeads((prev) =>
          prev.map((l) => (l._id === selectedLead._id ? res.data.data : l))
        );
      }
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editLead) return;

    try {
      const res = await leadsAPI.updateLead(editLead._id, editLead);
      if (res.data?.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === editLead._id ? res.data.data : l))
        );
        if (selectedLead && selectedLead._id === editLead._id) {
          setSelectedLead(res.data.data);
        }
        setEditLead(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save changes');
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteConfirmId) return;

    try {
      await leadsAPI.deleteLead(deleteConfirmId);
      setDeleteConfirmId(null);
      if (selectedLead && selectedLead._id === deleteConfirmId) {
        setSelectedLead(null);
      }
      fetchLeads();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lead');
    }
  };

  return (
    <AdminLayout title="Student Leads Management">
      {/* FILTER & SEARCH TOOLBAR */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search student name, email, phone, city..."
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
            {STATUSES.filter((s) => s !== 'all').map((st) => (
              <option key={st} value={st}>
                Status: {st}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={collegeFilter}
            onChange={(e) => {
              setCollegeFilter(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
            style={{ maxWidth: '200px' }}
          >
            <option value="all">All Colleges</option>
            {colleges.map((col) => (
              <option key={col._id} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={courseFilter}
            onChange={(e) => {
              setCourseFilter(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
            style={{ maxWidth: '200px' }}
          >
            <option value="all">All Courses</option>
            {courses.map((crs) => (
              <option key={crs._id} value={crs.name}>
                {crs.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split('-');
              setSortBy(sb);
              setSortOrder(so);
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="firstName-asc">Name A-Z</option>
            <option value="firstName-desc">Name Z-A</option>
          </select>

          {(search || statusFilter !== 'all' || collegeFilter !== 'all' || courseFilter !== 'all') && (
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setCollegeFilter('all');
                setCourseFilter('all');
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              style={{
                background: '#f1f5f9',
                border: '1px solid #ccd6e0',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>All Enquiries ({pagination.total})</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
        </div>

        {error && (
          <div style={{ padding: '16px', background: '#ffebee', color: '#c62828', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p>Loading student leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ color: '#075078', marginBottom: '6px' }}>No student leads found</h3>
            <p style={{ fontSize: '13px' }}>
              No leads match your active filters or search terms.
            </p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Target College</th>
                  <th>Selected Course</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <strong>
                        {lead.firstName} {lead.lastName}
                      </strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px' }}>✉️ {lead.email}</div>
                      <div style={{ fontSize: '12px' }}>📞 {lead.phone}</div>
                    </td>
                    <td>{lead.address?.city || 'N/A'}, {lead.address?.state || ''}</td>
                    <td style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lead.college}
                    </td>
                    <td style={{ maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lead.course}
                    </td>
                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`status-pill status-${lead.status}`}
                        style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
                      >
                        {STATUSES.filter((s) => s !== 'all').map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ fontSize: '12px', color: '#475569' }}>
                      {lead.assignedTo || 'Unassigned'}
                    </td>
                    <td style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="View Details"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => setEditLead({ ...lead })}
                          className="btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="Edit Lead"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(lead._id)}
                          className="btn-danger"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="Delete Lead"
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

        {/* PAGINATION CONTROLS */}
        <div className="pagination">
          <div>
            Showing {(pagination.page - 1) * pagination.limit + (leads.length > 0 ? 1 : 0)} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} leads
          </div>

          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
            >
              &larr; Prev
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.pages || Math.abs(p - pagination.page) <= 1)
              .map((p, index, array) => {
                const prev = array[index - 1];
                return (
                  <span key={p} style={{ display: 'flex', alignItems: 'center' }}>
                    {prev && p - prev > 1 && <span style={{ padding: '0 4px' }}>...</span>}
                    <button
                      className={`page-btn ${pagination.page === p ? 'active' : ''}`}
                      onClick={() => setPagination((prevP) => ({ ...prevP, page: p }))}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}

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

      {/* LEAD DETAILS MODAL */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <div>
                <h3>
                  {selectedLead.firstName} {selectedLead.lastName}
                </h3>
                <span className={`status-pill status-${selectedLead.status}`} style={{ marginTop: '4px' }}>
                  {selectedLead.status}
                </span>
              </div>
              <button className="modal-close" onClick={() => setSelectedLead(null)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* TWO COLUMN DETAILS */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafd', padding: '16px', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '13px', color: '#075078', marginBottom: '10px', textTransform: 'uppercase' }}>
                    Contact Information
                  </h4>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Email:</strong> {selectedLead.email}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Phone:</strong> {selectedLead.phone}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>SMS Permission:</strong> {selectedLead.contactPermission ? 'Yes' : 'No'}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Address:</strong> {selectedLead.address?.street || ''}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>City / State:</strong> {selectedLead.address?.city}, {selectedLead.address?.state} - {selectedLead.address?.postalCode}
                  </p>
                </div>

                <div style={{ background: '#f8fafd', padding: '16px', borderRadius: '6px' }}>
                  <h4 style={{ fontSize: '13px', color: '#075078', marginBottom: '10px', textTransform: 'uppercase' }}>
                    Application Preferences
                  </h4>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Target College:</strong> {selectedLead.college}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Preferred Course:</strong> {selectedLead.course}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Assigned Counselor:</strong> {selectedLead.assignedTo || 'Unassigned'}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Enquiry Date:</strong> {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    <strong>Last Updated:</strong> {new Date(selectedLead.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* CHANGE STATUS QUICKLY */}
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <strong style={{ fontSize: '13px' }}>Update Status:</strong>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccd6e0',
                    fontSize: '13px',
                  }}
                >
                  {STATUSES.filter((s) => s !== 'all').map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* COUNSELOR NOTES TIMELINE */}
              <div>
                <h4 style={{ fontSize: '14px', color: '#173f78', marginBottom: '12px' }}>
                  Counselor Notes & Activity Log
                </h4>

                <div
                  style={{
                    maxHeight: '180px',
                    overflowY: 'auto',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '14px',
                    background: '#fafbfc',
                  }}
                >
                  {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                    <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
                      No counseling notes added yet.
                    </p>
                  ) : (
                    selectedLead.notes.map((note, idx) => (
                      <div
                        key={note._id || idx}
                        style={{
                          padding: '8px 0',
                          borderBottom: idx < selectedLead.notes.length - 1 ? '1px solid #eef2f6' : 'none',
                          fontSize: '13px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '11px', marginBottom: '3px' }}>
                          <strong>{note.author || 'Admin'}</strong>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p style={{ margin: 0, color: '#334155' }}>{note.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* ADD NOTE FORM */}
                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Add an internal counselor note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid #ccd6e0',
                      fontSize: '13px',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={savingNote || !newNoteText.trim()}
                  >
                    {savingNote ? 'Adding...' : 'Add Note'}
                  </button>
                </form>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => {
                  setEditLead({ ...selectedLead });
                }}
              >
                ✏️ Edit Details
              </button>
              <button className="btn-primary" onClick={() => setSelectedLead(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {editLead && (
        <div className="modal-overlay" onClick={() => setEditLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Lead Information</h3>
              <button className="modal-close" onClick={() => setEditLead(null)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editLead.firstName}
                      onChange={(e) => setEditLead({ ...editLead, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editLead.lastName}
                      onChange={(e) => setEditLead({ ...editLead, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="search-input"
                      value={editLead.email}
                      onChange={(e) => setEditLead({ ...editLead, email: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Phone
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editLead.phone}
                      onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Target College
                  </label>
                  <select
                    className="filter-select"
                    style={{ width: '100%' }}
                    value={editLead.college}
                    onChange={(e) => setEditLead({ ...editLead, college: e.target.value })}
                  >
                    {colleges.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Chosen Course
                  </label>
                  <select
                    className="filter-select"
                    style={{ width: '100%' }}
                    value={editLead.course}
                    onChange={(e) => setEditLead({ ...editLead, course: e.target.value })}
                  >
                    {courses.map((crs) => (
                      <option key={crs._id} value={crs.name}>
                        {crs.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Status
                    </label>
                    <select
                      className="filter-select"
                      style={{ width: '100%' }}
                      value={editLead.status}
                      onChange={(e) => setEditLead({ ...editLead, status: e.target.value })}
                    >
                      {STATUSES.filter((s) => s !== 'all').map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Assigned Counselor
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editLead.assignedTo || ''}
                      onChange={(e) => setEditLead({ ...editLead, assignedTo: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setEditLead(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#dc2626' }}>Confirm Lead Removal</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
                Are you sure you want to delete this enquiry record? This action will permanently remove
                the candidate's details and note history from the database.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDeleteLead}>
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminLeadsPage;
