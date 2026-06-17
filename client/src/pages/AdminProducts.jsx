import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await deleteProduct(id);
        if (res.data.success) {
          fetchProducts();
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="admin-page" id="admin-products">
      <div className="admin-header">
        <h1>Manage Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">➕ Add New Product</Link>
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
          
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.mainImg} alt={product.title} className="table-img" />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.gender} • {product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.discount > 0 ? `${product.discount}%` : '-'}</td>
                      <td className="table-actions">
                        <Link to={`/admin/products/edit/${product._id}`} className="btn-icon edit-btn" title="Edit">✏️</Link>
                        <button onClick={() => handleDelete(product._id)} className="btn-icon delete-btn" title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">No products found. Add some!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;
