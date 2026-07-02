import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { getAdminConfig } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Landing = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [banner, setBanner] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, configRes] = await Promise.all([
          getProducts({ sort: 'price_desc' }),
          getAdminConfig().catch(() => null)
        ]);
        if (productsRes.data.success) {
          setFeaturedProducts(productsRes.data.products.slice(0, 4));
        }
        if (configRes?.data?.success && configRes.data.config.banner) {
          setBanner(configRes.data.config.banner);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="landing-page" id="landing-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero-section" style={banner ? { backgroundImage: `linear-gradient(225deg, rgba(15,23,42,0.9), rgba(15,23,42,0.4)), url(${banner})` } : {}}>
        <div className="hero-content">
          <div className="hero-badge">✨ Season's Favorites</div>
          <h1 className="hero-title">Smart<span className="hero-accent">Bridge</span></h1>
          <p className="hero-subtitle">Discover curated collections from top global brands. Experience luxury fashion with seamless delivery and premium service.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg" id="shop-now-btn">
              Explore Collection
            </Link>
            <Link to="/products?category=Women" className="btn btn-outline btn-lg">
              New Arrivals
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Styles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Brands</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">Fast</span>
              <span className="stat-label">Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar">
        <span>Trusted by 1M+ customers worldwide</span>
        <div className="trust-logos">
          <span className="trust-logo">✦ SHIELD</span>
          <span className="trust-logo">✦ PRIME</span>
          <span className="trust-logo">✦ GLOBAL</span>
        </div>
      </div>

      {/* Categories */}
      <section className="categories-section" id="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {[
            { name: 'Electronics', emoji: '💻', desc: 'Smartphones, Laptops & More' },
            { name: 'Fashion', emoji: '👕', desc: 'Trendy Clothes & Footwear' },
            { name: 'Home', emoji: '🏠', desc: 'Furniture & Decor' },
            { name: 'Beauty', emoji: '💄', desc: 'Skincare & Makeup' },
            { name: 'Sports', emoji: '⚽', desc: 'Gear & Activewear' }
          ].map((cat) => (
            <Link to={`/products?category=${cat.name}`} className="category-card" key={cat.name}>
              <span className="category-emoji">{cat.emoji}</span>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section" id="featured-section">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">Handpicked just for you</p>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
        <div className="section-cta">
          <Link to="/products" className="btn btn-primary">View All Products →</Link>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Free Shipping</h3>
            <p>On orders above ₹999</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>24/7 Support</h3>
            <p>Always here to help</p>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default Landing;
