// routes/wishlistRoutes.js
import express from "express";
import { addToWishlist, getWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/", getWishlist);

export default router;
