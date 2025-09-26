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
    const { category, size, manufacturer, manufacturedAt ,price} = req.body;

    if (!category || !size || !manufacturedAt || !manufacturer || !req.file) {
      return res.status(400).json({
        success: false,
        message: "all the fields are required",
      });
    }

    // upload directly from buffer
    const result = await uploadToCloudinary(req.file.buffer);
    const newClothes = new Clothes({
      category,
      size,
      manufacturer,
      manufacturedAt,
      price: price,
      imageUrl: result.secure_url,
    });

    await newClothes.save();

    return res.status(201).json({
      success: true,
      message: "successfully added",
      data: newClothes,
    });
  } catch (error) {
    console.error("Error uploading the image", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading the new schema",
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
    console.error("Error fetching the clothes", error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
