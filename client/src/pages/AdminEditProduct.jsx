import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct, getAdminConfig } from '../services/api';

const AdminEditProduct = () => {
  const { id } = useParams();
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
  const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports']);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const categorySizes = {
    'Fashion':     'S, M, L, XL, XXL',
    'Sports':      'S, M, L, XL, XXL',
    'Men':         'S, M, L, XL, XXL',
    'Women':       'XS, S, M, L, XL, XXL',
    'Kids':        '2-3Y, 4-5Y, 6-7Y, 8-9Y, 10-11Y, 12-13Y',
    'Footwear':    '5, 6, 7, 8, 9, 10, 11',
    'Beauty':      '30ml, 50ml, 100ml, 200ml',
    'Home':        'Small, Medium, Large',
    'Electronics': 'Standard',
    'Accessories': 'One Size',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, configRes] = await Promise.all([
          getProduct(id),
          getAdminConfig().catch(() => null)
        ]);

        if (productRes.data.success) {
          const product = productRes.data.product;
          setFormData({
            title: product.title,
            description: product.description,
            mainImg: product.mainImg,
            carouselStr: product.carousel ? product.carousel.join(', ') : '',
            sizesStr: product.sizes ? product.sizes.join(', ') : '',
            category: product.category,
            gender: product.gender,
            price: product.price,
            discount: product.discount
          });
        }

        if (configRes?.data?.success && configRes.data.config.categories?.length > 0) {
          setCategories(configRes.data.config.categories);
        }
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value,
        sizesStr: categorySizes[value] ?? formData.sizesStr
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        carousel: formData.carouselStr.split(',').map(s => s.trim()).filter(s => s),
        sizes: formData.sizesStr.split(',').map(s => s.trim()).filter(s => s)
      };

      const res = await updateProduct(id, payload);
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
    setSaving(false);
  };

  if (loading) return <div className="admin-page"><div className="loading-spinner">Loading product...</div></div>;

  return (
    <div className="admin-page" id="admin-edit-product">
      <div className="admin-header">
        <h1>Edit Product</h1>
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
                <input type="url" name="mainImg" value={formData.mainImg} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Carousel Images URLs (comma separated)</label>
                <input type="text" name="carouselStr" value={formData.carouselStr} onChange={handleChange} />
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
              <input type="text" name="sizesStr" value={formData.sizesStr} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminEditProduct;
