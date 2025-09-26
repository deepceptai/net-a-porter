// routes/cartRoutes.js
import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart); // add item
router.get("/", getCart); // get cart

export default router;
