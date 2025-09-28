import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Wishlist from "./Components/Wishlist";
import NewIn from "./pages/NewIn";
import "./App.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle scrolled background
      if (currentScrollY > window.innerHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Show/hide navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Router>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg navbar-dark px-4 fixed-top ${
          scrolled ? "scrolled" : "bg-transparent"
        }`}
        style={{
          zIndex: 1000,
          transform: showNav ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease, background-color 0.4s ease",
        }}
      >
        <div className="container-fluid d-flex flex-column p-0">
          {/* Top row */}
          <div className="row w-100 align-items-center py-2">
            <div className="col-3 d-flex align-items-center">
              <span className="text-white d-flex align-items-center">
                <span role="img" aria-label="italy" className="me-2">
                  🇮🇹
                </span>
                English
              </span>
            </div>
            <div className="col-6 text-center">
              <Link
                className="navbar-brand fw-bold fs-3 text-white text-decoration-none"
                to="/"
              >
                NET-A-PORTER
              </Link>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-center gap-4">
              <Link
                to="/"
                className="text-white text-decoration-none d-flex align-items-center"
              >
                <i className="bi bi-search me-1"></i>
                <span>Search</span>
              </Link>
              <span className="text-white">Bronze</span>
              <Link to="/wishlist" className="text-white text-decoration-none">
                <i className="bi bi-person"></i>
              </Link>
              <Link to="/wishlist" className="text-white text-decoration-none">
                <i className="bi bi-heart"></i>
              </Link>
              <Link to="/cart" className="text-white text-decoration-none">
                <i className="bi bi-bag"></i>
              </Link>
            </div>
          </div>

          {/* Category Row */}
          <div className="row w-100 border-secondary py-1">
            <div className="col-12">
              <ul className="nav justify-content-center mb-0 flex-wrap">
                {[
                  { name: "New In", path: "/new-in" },
                  { name: "Shop By", path: "/" },
                  { name: "Designers", path: "/" },
                  { name: "Clothing", path: "/" },
                  // ... rest of the categories
                ].map((item, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      to={item.path}
                      className="nav-link text-white px-3 py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-in" element={<NewIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
