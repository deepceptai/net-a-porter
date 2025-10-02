import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/authService";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = authService.getToken(); // ✅ centralized logic

        if (!token) {
          console.warn("⚠️ No token found. User might not be logged in.");
          setCart([]);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <h4 className="text-center mt-5">Loading cart...</h4>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 My Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="row">
          {cart.map((item, index) => (
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
                    <strong>Size:</strong> {item.size} <br />
                    <strong>Quantity:</strong> {item.quantity} <br />
                    <strong>Price:</strong> ₹{item.priceAtAdd} <br />
                    <strong>Total:</strong> ₹{item.priceAtAdd * item.quantity}
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

export default Cart;
