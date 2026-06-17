import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { toggleWishlist } from '../services/api';

const ProductCard = ({ product, onViewDetails }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  const [wishlisted, setWishlisted] = useState(user?.wishlist?.includes(product._id) || false);

  const handleAddToCart = async () => {
    if (!user) {
      setMessage('Please login to add items to cart');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      setMessage('Please select a size');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    setAdding(true);
    const success = await addToCart({
      title: product.title,
      description: product.description,
      mainImg: product.mainImg,
      size: selectedSize || 'One Size',
      quantity: 1,
      price: product.price,
      discount: product.discount
    });
    setAdding(false);
    if (success) {
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      setMessage('Please login to use wishlist');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    try {
      const res = await toggleWishlist(product._id);
      if (res.data.success) {
        setWishlisted(!wishlisted);
        setMessage(res.data.message);
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-card" id={`product-${product._id}`}>
      <div className="product-image-wrapper">
        <img src={product.mainImg} alt={product.title} className="product-image" loading="lazy" onClick={() => onViewDetails(product)} />
        <button 
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`} 
          onClick={handleWishlist}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
        <div className="quick-view-overlay" onClick={() => onViewDetails(product)}>
          <span>Quick View</span>
        </div>
        {product.discount > 0 && (
          <span className="discount-badge">-{product.discount}% OFF</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title" onClick={() => onViewDetails(product)}>{product.title}</h3>
        <p className="product-category">{product.gender} • {product.category}</p>
        <div className="product-pricing">
          <span className="product-price">₹{Math.round(discountedPrice)}</span>
          {product.discount > 0 && (
            <span className="product-original-price">₹{product.price}</span>
          )}
        </div>
        {product.sizes.length > 0 && (
          <div className="product-sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
        <button
          className="add-to-cart-btn premium"
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add to Bag'}
        </button>
        {message && <p className={`product-message ${message.includes('Added') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
