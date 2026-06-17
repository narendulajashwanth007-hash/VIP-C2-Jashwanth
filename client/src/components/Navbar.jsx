import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="main-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Shop<span className="logo-accent">EZ</span></span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch} id="navbar-search-form">
          <span className="search-icon-fixed">🔍</span>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            id="search-input"
          />
          <button type="submit" className="search-btn" id="search-btn">
            Search
          </button>
        </form>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} id="menu-toggle">
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/products" className="nav-link" id="nav-products" onClick={() => setMenuOpen(false)}>Explore</Link>
          
          {user ? (
            <>
              <Link to="/cart" className="nav-link cart-link" id="nav-cart" onClick={() => setMenuOpen(false)}>
                <span>Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <Link to="/wishlist" className="nav-link" id="nav-wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
              <Link to="/profile" className="nav-link" id="nav-profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              {isAdmin() && (
                <Link to="/admin" className="nav-link admin-link" id="nav-admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button onClick={handleLogout} className="nav-btn logout-btn" id="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-btn login-btn" id="nav-login" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
