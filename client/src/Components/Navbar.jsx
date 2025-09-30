import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import './navbar.css';

const Navbar = ({ scrolled, showNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const navigationItems = [
    { name: "New In", path: "/new-in" },
    { name: "Shop By", path: "/shop-by" },
    { name: "Designers", path: "/designers" },
    { name: "Clothing", path: "/clothing" },
    { name: "Shoes", path: "/shoes" },
    { name: "Bags", path: "/bags" },
    { name: "Jewelry", path: "/jewelry" },
    { name: "Accessories", path: "/accessories" },
    { name: "Home", path: "/home" },
    { name: "Editorial", path: "/editorial" },
    { name: "Sale", path: "/sale" }
  ];

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const checkAuthStatus = async () => {
    if (!AuthService.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const data = await AuthService.getProfile();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      AuthService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const data = await AuthService.login(loginForm);
      setUser(data.user);
      setLoginForm({ email: '', password: '' });
      setIsProfileDropdownOpen(false);
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsProfileDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
      setLoginError('');
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark px-0 fixed-top netaporter-navbar d-flex flex-column ${
          scrolled ? "scrolled" : "bg-transparent"
        }`}
        style={{
          zIndex: 1000,
          transform: showNav ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease, background-color 0.4s ease",
        }}
      >
        <div className="promo-banner w-100">
          10% off when you subscribe to our emails. T&Cs apply
        </div>

        <div className="container-fluid d-flex flex-column">
          <div className="top-bar d-flex align-items-center justify-content-between w-100 px-4 py-2 gap-2">
            <div className="left-section d-flex align-items-center">
              <div className="language-selector d-flex align-items-center">
                <span role="img" aria-label="italy" className="me-2">
                  🇮🇹
                </span>
                <span className="language-text">English</span>
              </div>
              
              <button 
                className="mobile-hamburger d-lg-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
            
            <div className="center-section">
              <div className='custom-p'>
                <Link
                  className="navbar-brand fw-light text-white text-decoration-none brand-logo"
                  to="/"
                >
                  NET-A-PORTER
                </Link>
              </div>
            </div>
            
            <div className="right-section d-flex align-items-center gap-4">
              <Link
                to="/search"
                className="nav-icon-link d-flex align-items-center"
              >
                <i className="bi bi-search me-1"></i>
                <span className="icon-text">Search</span>
              </Link>
              
              <div className="rewards-section d-flex align-items-center">
                <i className="bi bi-diamond me-1"></i>
                <span className="rewards-text">Rewards</span>
              </div>
              
              <div 
                className="profile-dropdown-wrapper" 
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="nav-icon-link profile-trigger"
                  onClick={handleProfileClick}
                  aria-label="Profile"
                >
                  <i className="bi bi-person"></i>
                </button>

                {isProfileDropdownOpen && (
                  <div className="profile-dropdown">
                    {loading ? (
                      <div className="profile-dropdown-loading">
                        <div className="spinner-border spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : user ? (
                      // Logged in view
                      <div className="profile-dropdown-content">
                        <div className="profile-dropdown-header">
                          <h3 className="profile-dropdown-title">
                            HI {user.firstName?.toUpperCase()} {user.lastName?.toUpperCase()}
                          </h3>
                        </div>
                        
                        <div className="profile-dropdown-menu">
                          <Link to="/orders" className="profile-dropdown-item">
                            My Orders
                          </Link>
                          <Link to="/wishlist" className="profile-dropdown-item">
                            Wish List
                          </Link>
                          <Link to="/address-book" className="profile-dropdown-item">
                            Address Book
                          </Link>
                          <Link to="/preferences" className="profile-dropdown-item">
                            Preferences
                          </Link>
                          <Link to="/delivery" className="profile-dropdown-item">
                            Delivery
                          </Link>
                          <Link to="/returns" className="profile-dropdown-item">
                            Returns
                          </Link>
                        </div>
                        
                        <div className="profile-dropdown-footer">
                          <button 
                            className="profile-signout-btn"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Login form view
                      <div className="profile-dropdown-content">
                        <div className="profile-dropdown-header">
                          <h3 className="profile-dropdown-title">MY ACCOUNT</h3>
                        </div>
                        
                        <form onSubmit={handleLogin} className="profile-login-form">
                          {loginError && (
                            <div className="login-error-message">
                              {loginError}
                            </div>
                          )}
                          
                          <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                              type="email"
                              className="form-control profile-form-input"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                              required
                              disabled={isLoggingIn}
                            />
                          </div>
                          
                          <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="password-input-wrapper">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control profile-form-input"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                required
                                disabled={isLoggingIn}
                              />
                              <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoggingIn}
                              >
                                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                              </button>
                            </div>
                          </div>
                          
                          <button 
                            type="submit" 
                            className="profile-signin-btn"
                            disabled={isLoggingIn}
                          >
                            {isLoggingIn ? 'Signing in...' : 'Sign in'}
                          </button>
                          
                          <div className="profile-form-links">
                            <Link to="/forgot-password" className="profile-link">
                              Forgotten Your Password?
                            </Link>
                            
                            <div className="profile-register">
                              Don't have an account? <Link to="/register" className="profile-link-bold">Register now</Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Link to="/wishlist" className="nav-icon-link">
                <i className="bi bi-heart"></i>
              </Link>
              
              <Link to="/cart" className="nav-icon-link">
                <i className="bi bi-bag"></i>
              </Link>
            </div>
          </div>

          <div className="nav-menu w-100 d-none d-lg-block">
            <ul className="nav justify-content-center mb-0">
              {navigationItems.map((item, i) => (
                <li className="nav-item" key={i}>
                  <Link
                    to={item.path}
                    className="nav-link text-white nav-menu-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`mobile-side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link
            className="mobile-brand-logo"
            to="/"
            onClick={closeMobileMenu}
          >
            NET-A-PORTER
          </Link>
          <button 
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navigationItems.map((item, i) => (
              <li className="mobile-nav-item" key={i}>
                <Link
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mobile-menu-footer">
            <div className="mobile-secondary-links">
              <Link to="/account" className="mobile-secondary-link" onClick={closeMobileMenu}>
                <i className="bi bi-person me-2"></i>
                Account
              </Link>
              <Link to="/wishlist" className="mobile-secondary-link" onClick={closeMobileMenu}>
                <i className="bi bi-heart me-2"></i>
                Wishlist
              </Link>
              <div className="mobile-secondary-link">
                <i className="bi bi-diamond me-2"></i>
                Rewards
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;