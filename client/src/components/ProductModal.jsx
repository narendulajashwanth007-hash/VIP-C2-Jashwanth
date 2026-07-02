import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  if (!product) return null;

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const images = [product.mainImg, ...(product.carousel || [])].filter((v, i, a) => a.indexOf(v) === i);

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

  return (
    <div className="modal-overlay" onClick={onClose} id="product-modal">
      <div className="modal-content premium-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-premium" onClick={onClose} id="modal-close-btn">✕</button>
        
        <div className="modal-body">
          <div className="modal-images">
            <div className="modal-main-image-wrapper">
              <img
                src={images[currentImg]}
                alt={product.title}
                className="modal-main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/500x500/e5e9f0/2c4152?text=${encodeURIComponent(product.title.split(' ').slice(0,2).join(' '))}`;
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="modal-thumbnails-premium">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumb-wrapper ${currentImg === idx ? 'active' : ''}`}
                    onClick={() => setCurrentImg(idx)}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-details-premium">
            <div className="modal-header-info">
              <span className="modal-brand">ShopEZ Selection</span>
              <h2 className="modal-title">{product.title}</h2>
              <p className="modal-category">{product.gender} • {product.category}</p>
            </div>

            <div className="modal-pricing-premium">
              <div className="price-tag">
                <span className="current-price">₹{Math.round(discountedPrice)}</span>
                {product.discount > 0 && (
                  <span className="original-price">₹{product.price}</span>
                )}
              </div>
              {product.discount > 0 && (
                <span className="discount-badge-premium">{product.discount}% OFF</span>
              )}
              <p className="tax-info">Inclusive of all taxes</p>
            </div>

            <div className="modal-description-section">
              <h4>Product Description</h4>
              <p>{product.description}</p>
            </div>

            {product.sizes.length > 0 && (
              <div className="modal-sizes-premium">
                <div className="size-header">
                  <h4>Select Size</h4>
                  <button className="size-guide">Size Guide</button>
                </div>
                <div className="size-options-premium">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn-premium ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions-premium">
              <button
                className="add-to-cart-btn-premium"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? 'Adding to Bag...' : 'Add to Bag'}
              </button>
              <button className="wishlist-btn-premium">
                🤍 Wishlist
              </button>
            </div>
            {message && <p className={`product-message ${message.includes('Added') ? 'success' : 'error'}`}>{message}</p>}
            
            <div className="modal-features-mini">
              <div className="mini-feature">
                <span>🚚</span>
                <p>Fast Delivery</p>
              </div>
              <div className="mini-feature">
                <span>🛡️</span>
                <p>Authentic Quality</p>
              </div>
              <div className="mini-feature">
                <span>🔄</span>
                <p>Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
