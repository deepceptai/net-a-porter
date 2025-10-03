// controllers/wishlistController.js
import User from "../models/User.js";
import Clothes from "../models/Clothes.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.body;

    console.log("=== BACKEND WISHLIST DEBUG ===");
    console.log("User ID:", userId);
    console.log("Request body:", req.body);
    console.log("Product ID:", productId);
    console.log("Size:", size);
    console.log("Size type:", typeof size);
    console.log("Size value:", JSON.stringify(size));
    console.log("============================");

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

    // 3️⃣ Check if product already in wishlist (same product + size)
    const wishlistItem = user.wishlist.find(
      (item) =>
        item.product.toString() === productId && item.size === size
    );

    if (wishlistItem) {
      return res.status(400).json({ 
        message: "This item is already in your wishlist" 
      });
    }

    // 4️⃣ Add new item to wishlist
    console.log("Adding to wishlist with size:", size);
    user.wishlist.push({
      product: productId,
      size,
    });

    await user.save();

    res.status(200).json({
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("wishlist.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { size } = req.query; // Get size from query params

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the product from wishlist
    // If size provided, remove specific product+size combo
    // Otherwise, remove all entries of that product
    if (size) {
      user.wishlist = user.wishlist.filter(
        (item) => !(item.product.toString() === productId && item.size === size)
      );
    } else {
      user.wishlist = user.wishlist.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();

    res.status(200).json({ 
      message: "Removed from wishlist", 
      wishlist: user.wishlist 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move item from wishlist to cart
export const moveToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, quantity = 1 } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Clothes.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if item exists in wishlist
    const wishlistIndex = user.wishlist.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (wishlistIndex === -1) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    // Check if already in cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({
        product: productId,
        quantity,
        size,
        price: product.price,
        discount: product.discount || 0,
        priceAtAdd: product.price,
      });
    }

    // Remove from wishlist
    user.wishlist.splice(wishlistIndex, 1);

    await user.save();

    res.status(200).json({
      message: "Moved to cart successfully",
      cart: user.cart,
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error moving to cart:", error);
    res.status(500).json({ message: error.message });
  }
};