import Clothes from "../models/Clothes.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// helper to stream file buffer to Cloudinary
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

// ---------------- UPLOAD (CREATE) ----------------
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

    // validation
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

    // upload multiple images
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // parse size
    let parsedSize = size;
    if (typeof size === "string") {
      try {
        parsedSize = JSON.parse(size);
      } catch {
        parsedSize = [size];
      }
    }

    // parse color
    let parsedColor = color;
    if (typeof color === "string") {
      try {
        parsedColor = JSON.parse(color);
      } catch {
        parsedColor = [color];
      }
    }

    // parse sizeAndFit
    let parsedSizeAndFit = {};
    if (sizeAndFit) {
      try {
        parsedSizeAndFit = JSON.parse(sizeAndFit);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "sizeAndFit must be valid JSON",
        });
      }
    }

    const newClothes = new Clothes({
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
      reviews: [], // initialize empty
      averageRating: 0,
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

// ---------------- GET ALL CLOTHES ----------------
export const getClothes = async (req, res) => {
  try {
  
    const clothes = await Clothes.find({ category: "clothes" })
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

// ---------------- FILTER CLOTHES ----------------
export const filterClothes = async (req, res) => {
  try {
    const { category, dress, type, size, color, designer, minPrice, maxPrice } =
      req.query;

    let filter = {};

    if (category) filter.category = category;
    if (dress) filter.dress = dress;
    if (type) filter.type = type;
    if (size) filter.size = size;
    if (color) filter.color = color;
    if (designer) filter.designer = designer;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const clothes = await Clothes.find(filter).sort({ createdAt: -1 });

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

// ---------------- FILTER OPTIONS ----------------
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

// ---------------- GET SINGLE CLOTHE ----------------
export const getSingleClothe = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Clothes.findById(id);

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
  } catch (error) {
    console.error("Error in fetching the product", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};