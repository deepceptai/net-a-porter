import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["clothes", "bags", "footwear", "accessories"],
      required: true,
    },
    dress: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: [String],
      enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one size is required",
      },
    },
    color: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one color is required"
      }
    },
    designer: {
      type: String,
      required: true,
    },
    manufacturedAt: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // multiple images
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image is required",
      },
    },
    editorNotes:{
      type: String,
      required: false
    },
    sizeAndFit:{
      description:{
        type: [String]
      },
      fitTips: {
        type: [String]
      },
      fabricDetails: {
        type: [String]
      },
       modelInfo: {
        height: { type: String }, 
        wearingSize: { type: String }, 
        measurements: {
          bust: { type: String },
          waist: { type: String },
          hip: { type: String },
        },
      },
    }
  },
  { timestamps: true }
);

const Clothes = mongoose.model("Clothes", clothesSchema);

export default Clothes;
