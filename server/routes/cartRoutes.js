import express from "express";
import { addToCart, getCart, removeFromCart, moveToWishlist } from "../controllers/cartController.js";
import { getUserFromToken, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, getUserFromToken, addToCart); // add item
router.get("/", protect, getUserFromToken, getCart); // get cart
router.delete("/:itemId", protect, getUserFromToken, removeFromCart); // remove item
router.post("/move-to-wishlist/:itemId", protect, getUserFromToken, moveToWishlist); // move item

export default router;
