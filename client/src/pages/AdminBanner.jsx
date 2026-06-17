import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminConfig, updateBanner } from '../services/api';

const AdminBanner = () => {
  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await getAdminConfig();
        if (res.data.success && res.data.config.banner) {
          setBanner(res.data.config.banner);
        }
      } catch (err) {
        console.error(err);
      }
      setFetching(false);
    };
    fetchConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await updateBanner({ banner });
      if (res.data.success) {
        setMessage('Banner updated successfully!');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update banner');
    }
    setLoading(false);
  };

  return (
    <div className="admin-page" id="admin-banner">
      <div className="admin-header">
        <h1>Hero Banner Settings</h1>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-link">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link">📦 Products</Link>
            <Link to="/admin/orders" className="admin-nav-link">📋 Orders</Link>
            <Link to="/admin/banner" className="admin-nav-link active">🖼️ Banner Content</Link>
            <Link to="/admin/categories" className="admin-nav-link">🏷️ Categories</Link>
          </nav>
        </aside>

        <main className="admin-main">
          {fetching ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="admin-card">
              <h3>Current Hero Banner Update</h3>
              <p>Enter an image URL for the homepage hero background.</p>

              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                  <label>Banner Image URL</label>
                  <input 
                    type="url" 
                    value={banner} 
                    onChange={(e) => setBanner(e.target.value)} 
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

                {banner && (
                  <div className="banner-preview" style={{ marginBottom: '20px' }}>
                    <p><strong>Live Preview:</strong></p>
                    <img src={banner} alt="Banner Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Banner'}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBanner;
