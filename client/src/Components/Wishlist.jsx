import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "./Wishlist.css";

const Wishlist = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Price formatter (USD)
  const formatPriceUSD = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  // Price formatter (INR approx)
  const formatPriceINR = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 83);

  // Fetch user profile + wishlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          console.warn("No token found. User might not be logged in.");
          setWishlist([]);
          return;
        }

        // Fetch user profile
        const profile = await authService.getProfile();
        setUser(profile.user);

        // Fetch wishlist
        const res = await axios.get(`${API_URL}api/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Add to Cart - uses the size from wishlist item
  const handleAddToCart = async (productId, size) => {
    try {
      const token = authService.getToken();
      if (!token) {
        alert("Please log in to add items to your cart.");
        return;
      }

      // Add to cart API call with the actual size from wishlist
      await axios.post(
        `${API_URL}api/cart/add`,
        {
          productId,
          quantity: 1,
          size, // Use the size from the wishlist item
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Item added to cart!");
      // Optionally navigate to cart
      // navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Failed to add item to cart.");
    }
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = async (productId, size) => {
    try {
      const token = authService.getToken();
      if (!token) {
        alert("Please log in first.");
        return;
      }

      // Include size in the delete request query params
      await axios.delete(
        `${API_URL}api/wishlist/remove/${productId}?size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update UI after deletion
      setWishlist((prev) =>
        prev.filter(
          (item) => !(item.product._id === productId && item.size === size)
        )
      );

      alert("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove item");
    }
  };

  if (loading) return <h4 className="loading-text">Loading wishlist...</h4>;

  return (
    <div className="wishlist-container">
      {/* Title */}
      <h2 className="wishlist-title">
        {user
          ? `${user.firstName} ${user.lastName}'s Wish List`
          : "My Wishlist"}
      </h2>

      {/* Top bar with filters */}
      <div className="wishlist-topbar">
        <div className="tabs">
          <span className="tab">Alerts</span>
          <span className="tab">Closet</span>
          <span className="tab active">
            {user
              ? `${user.firstName} ${user.lastName}'s Wish List`
              : "Wishlist"}
          </span>
        </div>
        <div className="wishlist-actions">
          <button className="icon-btn">＋</button>
          <button className="icon-btn">⇪</button>
          <span className="share-text">Share</span>
        </div>
      </div>

      <hr />

      {/* Filter & Availability */}
      <div className="wishlist-filterbar">
        <span className="filter-label">
          Filter {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
        <select className="availability-dropdown">
          <option>Availability</option>
        </select>
      </div>

      {/* Wishlist items */}
      {wishlist.length === 0 ? (
        <p className="empty-text">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <div className="wishlist-card" key={index}>
              <div
                className="wishlist-image-wrapper"
                onClick={() => navigate(`/product/${item.product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.dress}
                  className="wishlist-image"
                />
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(item.product._id, item.size);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="wishlist-info">
                {/* Add to Cart with actual size */}
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(item.product._id, item.size)}
                >
                  Add to Bag
                </button>
                <h5 className="wishlist-product-title">
                  {item.product.designer}
                </h5>
                <p className="wishlist-product-desc">
                  {item.product.dress} – {item.product.type}
                </p>
                {/* Display the size */}
                <p className="wishlist-product-size">Size: {item.size}</p>

                {/* Price */}
                <p className="wishlist-product-price">
                  {formatPriceUSD(item.product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;