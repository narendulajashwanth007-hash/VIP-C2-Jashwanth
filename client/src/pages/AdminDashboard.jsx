import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard, getAdminConfig } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  return (
    <div className="admin-page" id="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the E-commerce Application ShopEZ admin control panel</p>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-link active">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link">📦 Products</Link>
            <Link to="/admin/orders" className="admin-nav-link">📋 Orders</Link>
            <Link to="/admin/banner" className="admin-nav-link">🖼️ Banner Content</Link>
            <Link to="/admin/categories" className="admin-nav-link">🏷️ Categories</Link>
          </nav>
        </aside>

        <main className="admin-main">
          {loading ? (
            <div className="loading-spinner">Loading stats...</div>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Users</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon products-icon">🛍️</div>
                <div className="stat-info">
                  <h3>Total Products</h3>
                  <p className="stat-value">{stats.totalProducts}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon orders-icon">🛒</div>
                <div className="stat-info">
                  <h3>Total Orders</h3>
                  <p className="stat-value">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
          )}

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/admin/products/new" className="btn btn-primary">➕ Add New Product</Link>
              <Link to="/admin/products" className="btn btn-outline">✏️ Update Prices & Details</Link>
              <Link to="/admin/orders" className="btn btn-outline">📋 Manage All Orders</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
