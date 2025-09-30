import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Wishlist from "./Components/Wishlist";
import NewIn from "./pages/NewIn";
import "./App.css";
import Clothes from "./pages/Clothes";
import Register from "./pages/Register";
import ProductDetailPage from "./pages/ProductDetailsPage";

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
      {/* Use the Navbar component */}
      <Navbar scrolled={scrolled} showNav={showNav} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-in" element={<NewIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/clothing" element={<Clothes />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />
      </Routes>
    </Router>
  );
}

export default App;