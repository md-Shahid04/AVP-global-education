import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { coursesAPI, collegesAPI } from '../services/api';

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

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [collegeFilter, setCollegeFilter] = useState('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    duration: '3 Years',
    college: 'All Colleges',
    category: 'Engineering',
    description: '',
    isActive: true,
  });

  // Load colleges for dropdown
  useEffect(() => {
    collegesAPI.getColleges().then((res) => {
      if (res.data?.data) setColleges(res.data.data);
    });
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await coursesAPI.getAdminCourses({
        page: pagination.page,
        limit: pagination.limit,
        search,
        category: categoryFilter,
        college: collegeFilter,
      });
      if (res.data?.success) {
        setCourses(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, categoryFilter, collegeFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchCourses, 200);
    return () => clearTimeout(timer);
  }, [fetchCourses]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await coursesAPI.createCourse(formData);
      if (res.data?.success) {
        setShowAddModal(false);
        setFormData({
          name: '',
          code: '',
          duration: '3 Years',
          college: 'All Colleges',
          category: 'Engineering',
          description: '',
          isActive: true,
        });
        fetchCourses();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCourse) return;
    try {
      const res = await coursesAPI.updateCourse(editCourse._id, editCourse);
      if (res.data?.success) {
        setEditCourse(null);
        fetchCourses();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update course');
    }
  };

  const handleToggleStatus = async (course) => {
    try {
      await coursesAPI.updateCourse(course._id, { isActive: !course.isActive });
      fetchCourses();
    } catch (err) {
      alert('Failed to toggle course status');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await coursesAPI.deleteCourse(deleteConfirmId);
      setDeleteConfirmId(null);
      fetchCourses();
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  return (
    <AdminLayout title="Course Catalog Management">
      {/* FILTER BAR */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search course name or code..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
          />

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
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
            <option value="All Colleges">All Colleges (General)</option>
            {colleges.map((col) => (
              <option key={col._id} value={col.name}>
                {col.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-accent"
            style={{ marginLeft: 'auto' }}
          >
            + Add New Course
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Courses Database ({pagination.total})</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Page {pagination.page} of {pagination.pages}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p>Loading course directory...</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Affiliation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <strong>{course.name}</strong>
                      {course.code && (
                        <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>
                          [{course.code}]
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '11px',
                          background: '#e9f4fa',
                          color: '#075078',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {course.category}
                      </span>
                    </td>
                    <td>{course.duration || '3 Years'}</td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {course.college || 'All Colleges'}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(course)}
                        style={{
                          background: course.isActive ? '#dcfce7' : '#fee2e2',
                          color: course.isActive ? '#15803d' : '#991b1b',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                        }}
                      >
                        {course.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setEditCourse({ ...course })}
                          className="btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(course._id)}
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
            Showing {(pagination.page - 1) * pagination.limit + (courses.length > 0 ? 1 : 0)} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} courses
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

      {/* ADD COURSE MODAL */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Course</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Course Full Name*
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. B.Tech - Robotics and Automation"
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Course Code
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g. BTECH-ROBOT"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Duration
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 4 Years"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Category*
                    </label>
                    <select
                      className="filter-select"
                      style={{ width: '100%' }}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      College Affiliation
                    </label>
                    <select
                      className="filter-select"
                      style={{ width: '100%' }}
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    >
                      <option value="All Colleges">All Colleges (General)</option>
                      {colleges.map((col) => (
                        <option key={col._id} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editCourse && (
        <div className="modal-overlay" onClick={() => setEditCourse(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Course</h3>
              <button className="modal-close" onClick={() => setEditCourse(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Course Full Name*
                  </label>
                  <input
                    type="text"
                    className="search-input"
                    value={editCourse.name}
                    onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Course Code
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editCourse.code || ''}
                      onChange={(e) => setEditCourse({ ...editCourse, code: e.target.value })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Duration
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={editCourse.duration || '3 Years'}
                      onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      Category*
                    </label>
                    <select
                      className="filter-select"
                      style={{ width: '100%' }}
                      value={editCourse.category}
                      onChange={(e) => setEditCourse({ ...editCourse, category: e.target.value })}
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                      College
                    </label>
                    <select
                      className="filter-select"
                      style={{ width: '100%' }}
                      value={editCourse.college || 'All Colleges'}
                      onChange={(e) => setEditCourse({ ...editCourse, college: e.target.value })}
                    >
                      <option value="All Colleges">All Colleges (General)</option>
                      {colleges.map((col) => (
                        <option key={col._id} value={col.name}>
                          {col.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setEditCourse(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Course
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
              <h3 style={{ color: '#dc2626' }}>Delete Course</h3>
              <button className="modal-close" onClick={() => setDeleteConfirmId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Are you sure you want to permanently delete this course?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDelete}>
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCoursesPage;
