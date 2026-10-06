import { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const AdminSettingsPage = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', error: false });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatus({ message: '', error: false });

    if (newPassword !== confirmPassword) {
      setStatus({ message: 'New passwords do not match.', error: true });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ message: 'New password must be at least 6 characters.', error: true });
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.updatePassword({
        currentPassword,
        newPassword,
      });
      setStatus({
        message: res.data?.message || 'Password updated successfully!',
        error: false,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatus({
        message: err.response?.data?.message || 'Failed to update password',
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Administrator Settings">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* PROFILE INFO CARD */}
        <div className="admin-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', color: '#173f78', marginBottom: '16px' }}>
            Administrator Profile
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#075078',
                color: 'white',
                fontSize: '22px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>{user?.name || 'Administrator'}</h4>
              <span className={`status-pill status-${user?.role === 'admin' ? 'interested' : 'follow-up'}`}>
                Role: {user?.role || 'admin'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0 }}>
              <strong>Email:</strong> {user?.email}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Account Status:</strong> {user?.isActive ? 'Active' : 'Inactive'}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Last Login:</strong>{' '}
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Current Session'}
            </p>
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '14px',
              background: '#f8fafd',
              borderRadius: '6px',
              border: '1px solid #d0e0ed',
              fontSize: '12px',
              color: '#555',
            }}
          >
            <strong>Security Notice:</strong> Roles define permissions across lead assignment, catalog management, and institutional settings.
          </div>
        </div>

        {/* CHANGE PASSWORD CARD */}
        <div className="admin-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', color: '#173f78', marginBottom: '16px' }}>
            Change Password
          </h3>

          {status.message && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '4px',
                fontSize: '13px',
                marginBottom: '16px',
                background: status.error ? '#ffebee' : '#e8f5e9',
                color: status.error ? '#c62828' : '#2e7d32',
                border: `1px solid ${status.error ? '#ffcdd2' : '#c8e6c9'}`,
              }}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handlePasswordChange}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                Current Password*
              </label>
              <input
                type="password"
                className="search-input"
                style={{ width: '100%' }}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                New Password (min 6 chars)*
              </label>
              <input
                type="password"
                className="search-input"
                style={{ width: '100%' }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                Confirm New Password*
              </label>
              <input
                type="password"
                className="search-input"
                style={{ width: '100%' }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', height: '40px', justifyContent: 'center' }}
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
