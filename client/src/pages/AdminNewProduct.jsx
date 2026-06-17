import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProduct, getAdminConfig } from '../services/api';

const AdminNewProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainImg: '',
    carouselStr: '',
    sizesStr: '',
    category: '',
    gender: 'Unisex',
    price: '',
    discount: '0'
  });
  const [categories, setCategories] = useState(['Men', 'Women', 'Kids', 'Accessories', 'Footwear']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await getAdminConfig();
        if (res.data.success && res.data.config.categories?.length > 0) {
          setCategories(res.data.config.categories);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        carousel: formData.carouselStr.split(',').map(s => s.trim()).filter(s => s),
        sizes: formData.sizesStr.split(',').map(s => s.trim()).filter(s => s)
      };

      const res = await createProduct(payload);
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
    setLoading(false);
  };

  return (
    <div className="admin-page" id="admin-new-product">
      <div className="admin-header">
        <h1>Add New Product</h1>
        <Link to="/admin/products" className="btn btn-outline">🔙 Back to Products</Link>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-link">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link active">📦 Products</Link>
            <Link to="/admin/orders" className="admin-nav-link">📋 Orders</Link>
            <Link to="/admin/banner" className="admin-nav-link">🖼️ Banner Content</Link>
            <Link to="/admin/categories" className="admin-nav-link">🏷️ Categories</Link>
          </nav>
        </aside>

        <main className="admin-main">
          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={3}></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Main Image URL</label>
                <input type="url" name="mainImg" value={formData.mainImg} onChange={handleChange} required placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Carousel Images URLs (comma separated)</label>
                <input type="text" name="carouselStr" value={formData.carouselStr} onChange={handleChange} placeholder="url1, url2..." />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender/Target</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label>Discount (%)</label>
                <input type="number" name="discount" value={formData.discount} onChange={handleChange} min="0" max="100" />
              </div>
            </div>

            <div className="form-group">
              <label>Available Sizes (comma separated)</label>
              <input type="text" name="sizesStr" value={formData.sizesStr} onChange={handleChange} placeholder="S, M, L, XL or 7, 8, 9" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminNewProduct;
