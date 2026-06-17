import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders();
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateOrderStatus(id, { orderStatus: newStatus });
      if (res.data.success) {
        setOrders(orders.map(o => o._id === id ? { ...o, orderStatus: newStatus } : o));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Order Placed': return '#f59e0b';
      case 'Processing': return '#3b82f6';
      case 'In Transit': return '#8b5cf6';
      case 'Delivered': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="admin-page" id="admin-orders">
      <div className="admin-header">
        <h1>Manage Orders</h1>
      </div>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <Link to="/admin" className="admin-nav-link">📊 Dashboard</Link>
            <Link to="/admin/products" className="admin-nav-link">📦 Products</Link>
            <Link to="/admin/orders" className="admin-nav-link active">📋 Orders</Link>
            <Link to="/admin/banner" className="admin-nav-link">🖼️ Banner Content</Link>
            <Link to="/admin/categories" className="admin-nav-link">🏷️ Categories</Link>
          </nav>
        </aside>

        <main className="admin-main">
          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="loading-spinner">Loading orders...</div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td title={order._id}>{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                      <td>
                        <strong>{order.name}</strong><br/>
                        <small>{order.email}</small>
                      </td>
                      <td>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <img src={order.mainImg} alt="product" style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'4px'}} />
                          <small>{order.title}<br/>Qty: {order.quantity}</small>
                        </div>
                      </td>
                      <td>₹{Math.round((order.price - (order.price * order.discount / 100)) * order.quantity)}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        <select 
                          value={order.orderStatus} 
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="status-select"
                          style={{ borderColor: statusColor(order.orderStatus) }}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">No orders found.</td>
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

export default AdminOrders;
