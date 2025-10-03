import express from "express";
import { 
  addToWishlist, 
  getWishlist, 
  removeFromWishlist,
  moveToCart 
} from "../controllers/wishlistController.js";
import { getUserFromToken, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to wishlist
router.post("/add", protect, getUserFromToken, addToWishlist);

// Get wishlist
router.get("/", protect, getWishlist);

// Remove from wishlist (accepts size as query param)
router.delete("/remove/:productId", protect, removeFromWishlist);

// Move from wishlist to cart
router.post("/move-to-cart", protect, getUserFromToken, moveToCart);

export default router;