import React, { useEffect, useState } from "react";
import axios from "axios";

const ClothesList = () => {
  const [clothes, setClothes] = useState([]);
  const [loadingCart, setLoadingCart] = useState(null); // track which product is being added
  const [loadingWishlist, setLoadingWishlist] = useState(null);

  // 🔹 Fetch Clothes from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clothes/")
      .then((res) => {
        if (res.data.success) {
          setClothes(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching clothes:", err));
  }, []);

  //Hardcoded token for now (later store in localStorage after login)
 const token = localStorage.getItem("token");

  // Add to Cart
  const handleAddToCart = async (productId, size) => {
    try {
      setLoadingCart(productId);

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ " + res.data.message);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message) {
        alert( "error"+ err.response.data.message);
      } else {
        alert("Failed to add to cart");
      }
    } finally {
      setLoadingCart(null);
    }
  };

  // 💖 Add to Wishlist
  const handleAddToWishlist = async (productId) => {
    try {
      setLoadingWishlist(productId);

      const res = await axios.post(
        "http://localhost:5000/api/wishlist/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("💖 " + res.data.message);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.message) {
        alert("❌ " + err.response.data.message);
      } else {
        alert("❌ Failed to add to wishlist");
      }
    } finally {
      setLoadingWishlist(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛍️ Clothes Collection</h2>
      <div className="row">
        {clothes.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.images[0]}
                className="card-img-top"
                alt={item.dress}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.dress} - {item.type}
                </h5>
                <p className="card-text">
                  <strong>Size:</strong> {item.size} <br />
                  <strong>Color:</strong> {item.color} <br />
                  <strong>Designer:</strong> {item.designer} <br />
                  <strong>Price:</strong> ₹{item.price}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(item._id, item.size)}
                  disabled={loadingCart === item._id}
                >
                  {loadingCart === item._id ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleAddToWishlist(item._id)}
                  disabled={loadingWishlist === item._id}
                >
                  {loadingWishlist === item._id ? "Adding..." : "❤️ Wishlist"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
