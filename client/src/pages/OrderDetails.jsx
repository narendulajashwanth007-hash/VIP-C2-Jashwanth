import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const OrderDetails = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getDiscountedPrice = (price, discount) => price - (price * discount / 100);

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + getDiscountedPrice(item.price, item.discount) * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!mobile || !address || !pincode) {
      setError('Please fill all required fields');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const res = await createOrder({
        userId: user.id,
        name,
        email,
        mobile,
        address,
        pincode,
        paymentMethod,
        items: cartItems
      });

      if (res.data.success) {
        setSuccess(true);
        clearCart();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="order-page order-success" id="order-success">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h2>Order Placed Successfully!</h2>
          <p>Your order will be delivered within 7 days.</p>
          <div className="success-actions">
            <button onClick={() => navigate('/profile')} className="btn btn-primary">View Orders</button>
            <button onClick={() => navigate('/products')} className="btn btn-outline">Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="order-page empty-cart" id="order-page">
        <span className="empty-icon">📦</span>
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="order-page" id="order-page">
      <h1>📦 Checkout</h1>

      <div className="order-layout">
        <form onSubmit={handleSubmit} className="order-form" id="order-form">
          <h3>Delivery Details</h3>
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="order-email">Email</label>
              <input type="email" id="order-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input type="tel" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91 XXXXX XXXXX" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address with landmark" required rows={3}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit pincode" required />
          </div>

          <div className="form-group">
            <label htmlFor="payment">Payment Method</label>
            <select id="payment" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="filter-select">
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full" id="place-order-btn" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — ₹${Math.round(totalAmount)}`}
          </button>
        </form>

        <div className="order-items-summary">
          <h3>Order Items ({cartItems.length})</h3>
          {cartItems.map((item) => (
            <div className="order-item" key={item._id}>
              <img src={item.mainImg} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>Size: {item.size} | Qty: {item.quantity}</p>
                <p className="order-item-price">₹{Math.round(getDiscountedPrice(item.price, item.discount) * item.quantity)}</p>
              </div>
            </div>
          ))}
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{Math.round(totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
