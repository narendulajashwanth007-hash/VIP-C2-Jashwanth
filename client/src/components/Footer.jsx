import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="logo-icon">🛒</span> Shop<span className="logo-accent">EZ</span>
          </h3>
          <p className="footer-desc">Your one-stop destination for trendy fashion and accessories. Shop smart, shop easy with E-commerce Application ShopEZ.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">My Account</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><Link to="/products?category=Men">Men</Link></li>
            <li><Link to="/products?category=Women">Women</Link></li>
            <li><Link to="/products?category=Kids">Kids</Link></li>
            <li><Link to="/products?category=Accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-links">
          <li>📧 support@shopez.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Mumbai, India</li>
          </ul>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="YouTube">🎬</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-commerce Application ShopEZ. All rights reserved. Built with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
