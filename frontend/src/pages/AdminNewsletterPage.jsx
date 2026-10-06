import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { newsletterAPI } from '../services/api';

const AdminNewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await newsletterAPI.getAdminSubscribers({
        page: pagination.page,
        limit: pagination.limit,
        search,
        status: statusFilter,
      });
      if (res.data?.success) {
        setSubscribers(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchSubscribers, 200);
    return () => clearTimeout(timer);
  }, [fetchSubscribers]);

  const handleToggleStatus = async (subscriber) => {
    try {
      await newsletterAPI.updateSubscriber(subscriber._id, { isActive: !subscriber.isActive });
      fetchSubscribers();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await newsletterAPI.deleteSubscriber(deleteConfirmId);
      setDeleteConfirmId(null);
      fetchSubscribers();
    } catch (err) {
      alert('Failed to delete subscriber');
    }
  };

  const exportCSV = () => {
    if (subscribers.length === 0) {
      alert('No subscribers to export');
      return;
    }

    const headers = ['Email,Status,SubscribedAt'];
    const rows = subscribers.map(
      (s) => `"${s.email}","${s.isActive ? 'Active' : 'Inactive'}","${new Date(s.subscribedAt).toISOString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout title="Newsletter Subscribers">
      {/* TOOLBAR */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search subscriber email..."
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
            <option value="all">All Subscribers</option>
            <option value="active">Active Only</option>
            <option value="inactive">Unsubscribed / Inactive</option>
          </select>

          <button onClick={exportCSV} className="btn-outline" style={{ marginLeft: 'auto' }}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Subscribed Audiences ({pagination.total})</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p>Loading subscriber list...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <p>No subscribers found.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Subscriber Email</th>
                  <th>Status</th>
                  <th>Subscription Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub._id}>
                    <td>
                      <strong>✉️ {sub.email}</strong>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(sub)}
                        style={{
                          background: sub.isActive ? '#dcfce7' : '#fee2e2',
                          color: sub.isActive ? '#15803d' : '#991b1b',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {sub.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>{new Date(sub.subscribedAt).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => setDeleteConfirmId(sub._id)}
                        className="btn-danger"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        🗑️ Delete
                      </button>
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
            Showing {(pagination.page - 1) * pagination.limit + (subscribers.length > 0 ? 1 : 0)} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} subscribers
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

      {/* DELETE CONFIRM */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#dc2626' }}>Remove Subscriber</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Are you sure you want to remove this email address from the newsletter list?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Delete Subscriber
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNewsletterPage;
