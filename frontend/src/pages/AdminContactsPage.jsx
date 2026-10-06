import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { contactAPI } from '../services/api';

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await contactAPI.getAdminContacts({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status: statusFilter,
      });
      if (res.data?.success) {
        setContacts(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchContacts, 200);
    return () => clearTimeout(timer);
  }, [fetchContacts]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await contactAPI.updateStatus(id, newStatus);
      if (res.data?.success) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact(res.data.data);
        }
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await contactAPI.deleteContact(deleteConfirmId);
      setDeleteConfirmId(null);
      if (selectedContact && selectedContact._id === deleteConfirmId) {
        setSelectedContact(null);
      }
      fetchContacts();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  return (
    <AdminLayout title="Help Desk & Contact Inquiries">
      {/* TOOLBAR */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search inquiries by sender, email, subject, text..."
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
            <option value="all">All Inquiries</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Messages ({pagination.total})</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p>Loading inquiries...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <p>No contact messages found.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Contact Info</th>
                  <th>Subject</th>
                  <th>Message Preview</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} style={contact.status === 'unread' ? { fontWeight: 600 } : {}}>
                    <td>{contact.name}</td>
                    <td>
                      <div>✉️ {contact.email}</div>
                      {contact.phone && <div>📞 {contact.phone}</div>}
                    </td>
                    <td>{contact.subject}</td>
                    <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {contact.message}
                    </td>
                    <td>
                      <select
                        value={contact.status}
                        onChange={(e) => handleUpdateStatus(contact._id, e.target.value)}
                        style={{
                          fontSize: '11px',
                          padding: '4px 6px',
                          borderRadius: '4px',
                          border: '1px solid #ccd6e0',
                        }}
                      >
                        <option value="unread">unread</option>
                        <option value="read">read</option>
                        <option value="resolved">resolved</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            if (contact.status === 'unread') {
                              handleUpdateStatus(contact._id, 'read');
                            }
                          }}
                          className="btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(contact._id)}
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
            Showing {(pagination.page - 1) * pagination.limit + (contacts.length > 0 ? 1 : 0)} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} messages
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

      {/* DETAIL MODAL */}
      {selectedContact && (
        <div className="modal-overlay" onClick={() => setSelectedContact(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedContact.subject}</h3>
              <button className="modal-close" onClick={() => setSelectedContact(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div style={{ background: '#f8fafd', padding: '16px', borderRadius: '6px', marginBottom: '18px' }}>
                <p style={{ margin: '4px 0' }}>
                  <strong>From:</strong> {selectedContact.name} ({selectedContact.email})
                </p>
                {selectedContact.phone && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>Phone:</strong> {selectedContact.phone}
                  </p>
                )}
                <p style={{ margin: '4px 0' }}>
                  <strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
                <p style={{ margin: '4px 0' }}>
                  <strong>Status:</strong> {selectedContact.status}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Message Content
                </h4>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '14px', color: '#202535' }}>
                  {selectedContact.message}
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  ✉️ Reply via Email
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="btn-outline"
                    style={{ textDecoration: 'none' }}
                  >
                    📞 Call Sender
                  </a>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setSelectedContact(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#dc2626' }}>Delete Message</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Are you sure you want to permanently delete this inquiry?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContactsPage;
