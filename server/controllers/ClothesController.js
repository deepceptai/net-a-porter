// controllers/ClothesController.js
import Clothes from "../models/Clothes.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ================== HELPER ==================
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "clothes" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ================== UPLOAD (CREATE) ==================
export const Upload = async (req, res) => {
  try {
    const {
      category,
      dress,
      type,
      size,
      color,
      designer,
      manufacturedAt,
      price,
      editorNotes,
      sizeAndFit,
    } = req.body;

    if (
      !category ||
      !dress ||
      !type ||
      !size ||
      !color ||
      !designer ||
      !manufacturedAt ||
      !price ||
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields and at least one image are required",
      });
    }

    // Upload multiple images to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Parse arrays
    const parsedSize = typeof size === "string" ? JSON.parse(size) : size;
    const parsedColor = typeof color === "string" ? JSON.parse(color) : color;

    // Parse sizeAndFit (if sent as JSON)
    let parsedSizeAndFit = {};
    if (sizeAndFit) {
      try {
        parsedSizeAndFit =
          typeof sizeAndFit === "string" ? JSON.parse(sizeAndFit) : sizeAndFit;
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "sizeAndFit must be valid JSON",
        });
      }
    }

    const newClothes = new Clothes({
      user: req.user._id, // <-- assign logged-in user
      category,
      dress,
      type,
      size: parsedSize,
      color: parsedColor,
      designer,
      manufacturedAt,
      price,
      editorNotes: editorNotes || "",
      sizeAndFit: parsedSizeAndFit,
      images: imageUrls,
    });

    await newClothes.save();

    return res.status(201).json({
      success: true,
      message: "Successfully added new item",
      data: newClothes,
    });
  } catch (error) {
    console.error("Error uploading the item:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading the item",
    });
  }
};

// ================== GET ALL CLOTHES ==================
export const getClothes = async (req, res) => {
  try {
    const clothes = await Clothes.find()
      .populate("user", "firstName lastName email") // bring basic user info
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    console.error("Error fetching clothes:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching clothes",
    });
  }
};

// ================== FILTER CLOTHES ==================
export const filterClothes = async (req, res) => {
  try {
    const { category, dress, type, size, color, designer, minPrice, maxPrice, userId } =
      req.query;

    let filter = {};

    if (category) filter.category = category;
    if (dress) filter.dress = dress;
    if (type) filter.type = type;
    if (size) filter.size = { $in: [size] };  // ✅ fix for arrays
    if (color) filter.color = { $in: [color] }; // ✅ fix for arrays
    if (designer) filter.designer = designer;
    if (userId) filter.user = userId;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const clothes = await Clothes.find(filter)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    console.error("Error filtering the clothes", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================== FILTER OPTIONS ==================
export const getFilterOption = async (req, res) => {
  try {
    const category = await Clothes.distinct("category");
    const dresses = await Clothes.distinct("dress");
    const types = await Clothes.distinct("type");
    const size = await Clothes.distinct("size");
    const colors = await Clothes.distinct("color");
    const designers = await Clothes.distinct("designer");

    return res.status(200).json({
      success: true,
      filters: {
        category,
        dresses,
        types,
        size,
        colors,
        designers,
      },
    });
  } catch (error) {
    console.error("Error in fetching the filters", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error: Error while fetching filter options",
    });
  }
};

// ================== GET SINGLE CLOTHE ==================
export const getSingleClothe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Clothes.findById(id).populate(
      "user",
      "firstName lastName email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Couldn't find the product",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================== GET CLOTHES OPTIONS (dress & type) ==================
export const getClothesOption = async (req, res) => {
  try {
    const dresses = await Clothes.distinct("dress");
    const types = await Clothes.distinct("type");

    return res.status(200).json({
      success: true,
      data: { dresses, types },
    });
  } catch (error) {
    console.error("Error in fetching the dress and its type", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================== GET USER’S CLOTHES ==================
export const getUserClothes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const clothes = await Clothes.find({ user: userId })
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: clothes.length,
      data: clothes,
    });
  } catch (error) {
    console.error("Error fetching user clothes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
