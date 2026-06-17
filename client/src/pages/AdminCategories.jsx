import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminConfig, updateCategories } from '../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');

  const fetchConfig = async () => {
    try {
      const res = await getAdminConfig();
      if (res.data.success && res.data.config.categories) {
        setCategories(res.data.config.categories);
      }
    } catch (err) {
      console.error(err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const saveCategories = async (updatedCategories) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await updateCategories({ categories: updatedCategories });
      if (res.data.success) {
        setMessage('Categories updated successfully!');
        setCategories(res.data.categories);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update categories');
    }
    setLoading(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) {
      setMessage('Category already exists');
      return;
    }
    const updated = [...categories, newCategory.trim()];
    saveCategories(updated);
    setNewCategory('');
  };

  const handleRemove = (categoryToRemove) => {
    const updated = categories.filter(c => c !== categoryToRemove);
    saveCategories(updated);
  };

  return (
    <div className="admin-page" id="admin-categories">
      <div className="admin-header">
        <h1>Manage Categories</h1>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-link">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link">📦 Products</Link>
            <Link to="/admin/orders" className="admin-nav-link">📋 Orders</Link>
            <Link to="/admin/banner" className="admin-nav-link">🖼️ Banner Content</Link>
            <Link to="/admin/categories" className="admin-nav-link active">🏷️ Categories</Link>
          </nav>
        </aside>

        <main className="admin-main">
          {fetching ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="admin-card">
              <h3>Product Categories</h3>
              <p>These categories will be available when adding products and filtering.</p>

              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                  {message}
                </div>
              )}

              <div className="categories-list">
                {categories.map((cat, idx) => (
                  <div key={idx} className="category-tag">
                    {cat}
                    <button onClick={() => handleRemove(cat)} className="category-remove" disabled={loading}>✕</button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAdd} className="admin-form" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)} 
                  placeholder="New Category Name (e.g. Watches)"
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
                <button type="submit" className="btn btn-primary" disabled={loading || !newCategory.trim()}>
                  {loading ? 'Adding...' : '➕ Add Category'}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;
