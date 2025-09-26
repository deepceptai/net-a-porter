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

export const Upload = async (req, res) => {
  try {
    const { category, dress, type, size, color, designer, manufacturedAt, price } = req.body;

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

    const newClothes = new Clothes({
      category,
      dress,
      type,
      size,
      color,
      designer,
      manufacturedAt,
      price,
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

export const getClothes = async (req, res) => {
  try {
    const clothes = await Clothes.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
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
