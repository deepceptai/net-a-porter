import express from "express";
import multer from "multer";
import { Upload, getClothes } from "../controllers/ClothesController.js";

const router = express.Router();

// use memory storage so we can directly stream to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// route for uploading clothes (with multiple images)
router.post("/upload", upload.array("images", 10), Upload);

// route for fetching clothes
router.get("/", getClothes);

export default router;
