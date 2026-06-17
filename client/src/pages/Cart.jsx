import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const getDiscountedPrice = (price, discount) => price - (price * discount / 100);

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + getDiscountedPrice(item.price, item.discount) * item.quantity;
  }, 0);

  const totalSavings = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.discount / 100) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart" id="cart-page">
        <span className="empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page" id="cart-page">
      <h1>🛒 Shopping Cart</h1>
      <p className="cart-count">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-image">
                <img src={item.mainImg} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-size">Size: {item.size}</p>
                <div className="cart-item-pricing">
                  <span className="cart-item-price">₹{Math.round(getDiscountedPrice(item.price, item.discount))}</span>
                  {item.discount > 0 && (
                    <>
                      <span className="cart-item-original">₹{item.price}</span>
                      <span className="cart-item-discount">-{item.discount}%</span>
                    </>
                  )}
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                  >−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="qty-btn"
                  >+</button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="cart-item-remove"
                aria-label="Remove item"
              >🗑️</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{Math.round(totalAmount + totalSavings)}</span>
          </div>
          <div className="summary-row savings">
            <span>Discount</span>
            <span>-₹{Math.round(totalSavings)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{totalAmount >= 999 ? 'FREE' : '₹49'}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{Math.round(totalAmount + (totalAmount >= 999 ? 0 : 49))}</span>
          </div>
          <button
            onClick={() => navigate('/orders')}
            className="btn btn-primary btn-full"
            id="checkout-btn"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
