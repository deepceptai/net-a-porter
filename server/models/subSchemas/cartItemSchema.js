import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clothes",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    max: [10, "Maximum 10 items per product"],
    default: 1,
  },
  size: {
    type: String,
    enum: {
      values: ["XS", "S", "M", "L", "XL", "XXL"],
      message: "Size must be one of: XS, S, M, L, XL, XXL"
    },
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot exceed 100%"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  // For tracking price changes
  priceAtAdd: {
    type: Number,
    required: true,
  },
}, {
  _id: true,
});

// Virtual for final price after discount
cartItemSchema.virtual('finalPrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

// Virtual for total price for this item
cartItemSchema.virtual('totalPrice').get(function() {
  return this.finalPrice * this.quantity;
});

export default cartItemSchema;