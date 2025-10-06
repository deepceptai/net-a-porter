import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

function ProductList({ products, loading, formatPrice }) {
  const API_URL=import.meta.env.VITE_API_URL;

  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Fetch wishlist on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}api/wishlist/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlist(res.data.map((item) => item.product._id));
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  // Handle image cycling on hover
  useEffect(() => {
    if (!hoveredProduct) return;

    const product = products.find(p => p._id === hoveredProduct);
    if (!product || !product.images || product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [hoveredProduct]: ((prev[hoveredProduct] || 0) + 1) % product.images.length
      }));
    }, 800); // Change image every 800ms

    return () => clearInterval(interval);
  }, [hoveredProduct, products]);

  // Add product to wishlist
  const handleAddToWishlist = async (product) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlist((prev) =>
        prev.includes(product._id) ? prev : [...prev, product._id]
      );

      alert("Added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert(error.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleMouseLeave = (productId) => {
    setHoveredProduct(null);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No products found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="row g-4 products-grid">
      {products.map((item) => {
        const isInWishlist = wishlist.includes(item._id);
        const currentIndex = currentImageIndex[item._id] || 0;

        return (
          <div key={item._id} className="col-lg-4 col-md-6 col-sm-12">
            <Link to={`/product/${item._id}`} className="product-card-link">
              <div 
                className="product-card"
                onMouseEnter={() => handleMouseEnter(item._id)}
                onMouseLeave={() => handleMouseLeave(item._id)}
              >
                <div className="product-image-container">
                  <div className="product-image-wrapper">
                    <img
                      src={item.images?.[currentIndex] || "/placeholder-image.jpg"}
                      alt={`${item.designer} ${item.dress || item.name}`}
                      className="product-image"
                    />
                  </div>

                  <button
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isInWishlist) handleAddToWishlist(item);
                    }}
                  >
                    <i
                      className={`fa-heart ${
                        isInWishlist ? "fas text-danger" : "far"
                      }`}
                    ></i>
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-designer">
                    {item.designer?.toUpperCase() || "DESIGNER"}
                  </div>
                  <div className="product-name">
                    {item.dress && `${item.dress} ${item.type || ""}`}
                    {item.name && item.name}
                  </div>
                  <div className="product-price">{formatPrice(item.price)}</div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;