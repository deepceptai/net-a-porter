// routes/cartRoutes.js
import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";
import { getUserFromToken, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",protect, getUserFromToken, addToCart); // add item
router.get("/",protect ,getCart); // get cart

export default router;
