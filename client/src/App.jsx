import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Wishlist from "./Components/Wishlist";
import NewIn from "./pages/NewIn";
import "./App.css";
import Clothes from "./pages/Clothes";
import Register from "./pages/Register";
import ProductDetailPage from "./pages/ProductDetailsPage";
import AuthService from "./services/authService"; // import your auth service

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Global user state
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > window.innerHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Check auth on app mount
  useEffect(() => {
    const checkUser = async () => {
      if (AuthService.isAuthenticated()) {
        try {
          const data = await AuthService.getProfile();
          setUser(data.user);
        } catch (err) {
          AuthService.logout();
          setUser(null);
        }
      }
      setLoadingUser(false);
    };

    checkUser();
  }, []);

  return (
    <Router>
      {/* Pass user and setter into Navbar */}
      <Navbar 
        scrolled={scrolled} 
        showNav={showNav} 
        user={user} 
        setUser={setUser} 
        loadingUser={loadingUser}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-in" element={<NewIn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/clothing" element={<Clothes />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
