import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothes",
    required: true,
  },
  size: {
    type: String,
    enum: {
      values: ["XS", "S", "M", "L", "XL", "XXL"],
      message: "Size must be one of: XS, S, M, L, XL, XXL"
    },
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  _id: true,
});

export default wishlistItemSchema;