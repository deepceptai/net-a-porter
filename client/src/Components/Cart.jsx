import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../services/authService";
import "./Cart.css"; // custom styles

// Payment Icons
import Qrcode from "/Images/qr-code.svg";
import Paypal from "/Images/paypal.svg";
import Visa from "/Images/Visa.svg";
import MasterCard from "/Images/mastercard.svg";
import MasterCard2 from "/Images/mastercard2.svg";
import Amex from "/Images/Amex.svg";
import Jcb from "/Images/jcb.svg";
import UnionPay from "/Images/UnionPay.svg";
import Delta from "/Images/delta.svg";
import Applepay from "/Images/applePay.svg";
import Kalma from "/Images/klarna.svg";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          setCart([]);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  );

  // ✅ Remove item from cart
  const handleRemove = async (itemId) => {
    try {
      const token = authService.getToken();
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("❌ Error removing item:", error);
    }
  };

  // ✅ Move item to wishlist
  const handleMoveToWishlist = async (itemId) => {
    try {
      const token = authService.getToken();
      await axios.post(
        `http://localhost:5000/api/cart/move-to-wishlist/${itemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(cart.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("❌ Error moving to wishlist:", error);
    }
  };

  return (
    <div className="cart-container description">
      <h2 className="cart-title">Shopping Bag</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-grid">
          {/* LEFT SIDE */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={item.product.images[0]}
                  alt={item.product.dress}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h5 className="cart-item-name">{item.product.dress}</h5>
                  <p className="cart-item-meta">
                    {item.product.type} <br />
                    Size: {item.size || "N/A"} <br />
                    Qty: {item.quantity}
                  </p>
                  <p className="cart-item-price">€{item.priceAtAdd}</p>
                  <div className="cart-item-actions">
                    <button
                      className="cart-link"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove from Bag
                    </button>
                    <button
                      className="cart-link"
                      onClick={() => handleMoveToWishlist(item._id)}
                    >
                      Move to Wish List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="cart-summary">
            <h4 className="summary-title">ORDER SUMMARY</h4>
            <div className="summary-row">
              <span>Item subtotal</span>
              <span>€{subtotal}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>€{subtotal}</span>
            </div>
            <p className="summary-note">
              This purchase will bring you closer to the next Reward tier
            </p>

            <div className="promo">
              <label>Add a promo code</label>
              <div className="promo-input">
                <input type="text" placeholder="Enter code" />
                <button>Apply</button>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Continue to checkout
            </button>

            {/* Payment Icons */}
            <div className="payment-icons">
              <div className="payment-icon">
                <img src={Paypal} alt="PayPal" />
              </div>
              <div className="payment-icon">
                <img src={Visa} alt="Visa" />
              </div>
              <div className="payment-icon">
                <img src={MasterCard} alt="Mastercard" />
              </div>
              <div className="payment-icon">
                <img src={MasterCard2} alt="Maestro" />
              </div>
              <div className="payment-icon">
                <img src={Amex} alt="American Express" />
              </div>
              <div className="payment-icon">
                <img src={Jcb} alt="JCB" />
              </div>
              <div className="payment-icon">
                <img src={UnionPay} alt="Union Pay" />
              </div>
              <div className="payment-icon">
                <img src={Delta} alt="Delta" />
              </div>
              <div className="payment-icon">
                <img src={Applepay} alt="Apple Pay" />
              </div>
              <div className="payment-icon">
                <img src={Kalma} alt="Klarna" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
