// routes/wishlistRoutes.js
import express from "express";
import { addToWishlist, getWishlist } from "../controllers/wishlistController.js";
import { getUserFromToken, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",protect ,getUserFromToken ,addToWishlist);
router.get("/" ,protect, getWishlist);

export default router;
