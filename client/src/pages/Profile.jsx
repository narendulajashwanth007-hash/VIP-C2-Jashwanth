import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserOrders, cancelOrder } from '../services/api';

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getUserOrders(user.id);
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await cancelOrder(orderId);
      if (res.data.success) {
        fetchOrders();
        alert('Order cancelled successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Order Placed': return '#f59e0b';
      case 'Processing': return '#3b82f6';
      case 'In Transit': return '#8b5cf6';
      case 'Delivered': return '#10b981';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="profile-page" id="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</span>
        </div>
        <h2>{user?.username}</h2>
        <p className="profile-email">{user?.email}</p>
        <p className="profile-type">{user?.usertype === 'admin' ? '👑 Admin' : '👤 Customer'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {isAdmin() && (
            <Link to="/admin" className="btn btn-primary btn-full">📊 Admin Dashboard</Link>
          )}
          <button onClick={logout} className="btn btn-outline btn-full">Logout</button>
        </div>
      </div>

      <div className="orders-section">
        <h2>📦 Order History</h2>
        {loading ? (
          <div className="loading-spinner">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <span>🛍️</span>
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-image">
                  <img src={order.mainImg} alt={order.title} />
                </div>
                <div className="order-card-details">
                  <h3>{order.title}</h3>
                  <p>Size: {order.size} | Qty: {order.quantity}</p>
                  <p>₹{Math.round(order.price - (order.price * order.discount / 100))} × {order.quantity}</p>
                  <p className="order-date">Ordered: {order.orderDate}</p>
                </div>
                <div className="order-card-status">
                  <span className="status-badge" style={{ backgroundColor: statusColor(order.orderStatus) }}>
                    {order.orderStatus}
                  </span>
                  {order.deliveryDate && order.orderStatus !== 'Cancelled' && (
                    <p className="delivery-date">Est. Delivery: {order.deliveryDate}</p>
                  )}
                  {order.orderStatus !== 'Delivered' && (
                    <button 
                      className={`btn btn-outline btn-sm cancel-btn ${order.orderStatus === 'Cancelled' ? 'disabled' : ''}`}
                      onClick={() => order.orderStatus !== 'Cancelled' && handleCancelOrder(order._id)}
                      disabled={order.orderStatus === 'Cancelled'}
                      style={{ 
                        marginTop: '1rem', 
                        color: order.orderStatus === 'Cancelled' ? '#94a3b8' : '#ef4444', 
                        borderColor: order.orderStatus === 'Cancelled' ? '#e2e8f0' : '#ef4444',
                        cursor: order.orderStatus === 'Cancelled' ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {order.orderStatus === 'Cancelled' ? 'Cancelled' : 'Cancel Order'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
