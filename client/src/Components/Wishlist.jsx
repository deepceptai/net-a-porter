import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/authService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

   
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = authService.getToken(); // ✅ centralized logic

        if (!token) {
          console.warn("⚠️ No token found. User might not be logged in.");
          setWishlist([]);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/wishlist", {
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

    fetchWishlist();
  }, []);
  if (loading) return <h4 className="text-center mt-5">Loading wishlist...</h4>;

  return (
    <div className="container margin-custom">
      <h2 className="mb-4 text-center">💖 My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty</p>
      ) : (
        <div className="row">
          {wishlist.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.product.images[0]}
                  className="card-img-top"
                  alt={item.product.dress}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {item.product.dress} - {item.product.type}
                  </h5>
                  <p className="card-text">
                    <strong>Color:</strong> {item.product.color} <br />
                    <strong>Designer:</strong> {item.product.designer} <br />
                    <strong>Price:</strong> ₹{item.product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
