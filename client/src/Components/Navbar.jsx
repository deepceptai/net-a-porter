import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import custom CSS

const Navbar = ({ scrolled, showNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
        {/* Promotional Banner */}
        <div className="promo-banner w-100">
          10% off when you subscribe to our emails. T&Cs apply
        </div>

        <div className="container-fluid d-flex flex-column">
          {/* Top row */}
          <div className="top-bar d-flex align-items-center justify-content-between w-100 px-4 py-2 gap-2">
            <div className="left-section d-flex align-items-center">
              <div className="language-selector d-flex align-items-center">
                <span role="img" aria-label="italy" className="me-2">
                  🇮🇹
                </span>
                <span className="language-text">English</span>
                
              </div>
              
              {/* Mobile Hamburger Menu Button */}
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
              
              <Link to="/account" className="nav-icon-link">
                <i className="bi bi-person"></i>
              </Link>
              
              <Link to="/wishlist" className="nav-icon-link">
                <i className="bi bi-heart"></i>
              </Link>
              
              <Link to="/cart" className="nav-icon-link">
                <i className="bi bi-bag"></i>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Side Menu */}
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