import express from "express";
import multer from "multer";
import { Upload, filterClothes, getClothes, getClothesOption, getFilterOption, getSingleClothe, getUserClothes } from "../controllers/ClothesController.js";
import { getUserFromToken, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// use memory storage so we can directly stream to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// route for uploading clothes (with multiple images)
router.post("/upload", upload.array("images", 10),protect, getUserFromToken, Upload);

// route for fetching clothes
router.get("/",protect ,getClothes);
router.get("/filters", filterClothes);
router.get("/filter/options", getFilterOption);
router.get("/options",protect ,getClothesOption);
router.get("/user/:userId",protect ,getUserFromToken, getUserClothes);    
router.get("/:id", protect, getSingleClothe);

export default router;
