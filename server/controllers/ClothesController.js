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
export const filterClothes = async (req, res) => {
    try{
        const { category, dress, type, size, color, designer, minPrice, maxPrice } = req.query;

        let filter = {};

        if(category) filter.category = category;
        if(dress) filter.dress = dress;
        if(type) filter.type = type;
        if(size) filter.size = size;
        if(color) filter.color = color;
        if(designer) filter.designer = designer;

        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const clothes = await Clothes.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: clothes.length,
            data: clothes
        });
    } catch (error){
        console.error("Error filtering the clothes", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};
export const getFilterOption = async (req, res) => {
    try{
        const category = await Clothes.distinct("category");
        const dresses = await Clothes.distinct("dress");
        const types = await Clothes.distinct("type");
        const size = await Clothes.distinct("size");
        const colors = await Clothes.distinct("color");
        const designers = await Clothes.distinct("designer");

        return res.status(201).json({
            success: true,
            filers: {
                category,
                dresses,
                types,
                size,
                colors,
                designers
            }
        });
    } catch (error){
        console.error("Error in fetching the filters", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: Error while fetching filter options"
        });
    }
}