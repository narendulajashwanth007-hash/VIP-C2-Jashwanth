import { useState, useEffect } from 'react';
import { getWishlist } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();
        if (res.data.success) {
          setWishlist(res.data.wishlist);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (loading) return <div className="loading-spinner">Loading your wishlist...</div>;

  return (
    <div className="wishlist-page container-wide">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>{wishlist.length} items saved</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <span className="empty-icon">❤️</span>
          <h3>Your wishlist is empty</h3>
          <p>Save items you like in your wishlist to keep track of them.</p>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default Wishlist;
