// controllers/wishlistController.js
import User from "../models/User.js";
import Clothes from "../models/Clothes.js";

// Add to wishlist
export const addToWishlist = async (req, res) => {
  try {

    const userId = req.user.id;
    const {productId } = req.body;

    const product = await Clothes.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product already exists in wishlist
    const alreadyInWishlist = user.wishlist.some(
      (item) => item.product.toString() === productId
    );
    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push({ product: productId });
    await user.save();

    res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId  = req.user.id;
    const user = await User.findById(userId).populate("wishlist.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
