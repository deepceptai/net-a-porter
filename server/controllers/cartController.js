// controllers/cartController.js
import User from "../models/User.js";
import Clothes from "../models/Clothes.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, size } = req.body;

    // 1️⃣ Check if product exists
    const product = await Clothes.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Check if product already in cart (same product + size)
    const cartItem = user.cart.find(
      (item) =>
        item.product.toString() === productId && item.size === size
    );

    if (cartItem) {
      // If already there → increase quantity
      cartItem.quantity += quantity;
    } else {
      // If new → push item
      user.cart.push({
        product: productId,
        quantity,
        size,
        price: product.price,
        discount: 0, // optional for later
        priceAtAdd: product.price,
      });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
    await user.save();

    res.json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move item from cart to wishlist
export const moveToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find item in cart
    const cartItem = user.cart.find((item) => item._id.toString() === itemId);
    if (!cartItem) return res.status(404).json({ message: "Item not found in cart" });

    // Push to wishlist
    user.wishlist.push({
      product: cartItem.product._id,
      size: cartItem.size,
      addedAt: new Date(),
    });

    // Remove from cart
    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);

    await user.save();

    res.json({ message: "Item moved to wishlist", wishlist: user.wishlist, cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
