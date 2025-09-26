import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
  },
  country: {
    type: String,
    default: "India",
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  addressType: {
    type: String,
    enum: ["home", "office", "other"],
    default: "home",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, {
  _id: true,
  timestamps: true,
});

// Virtual for complete address
addressSchema.virtual('fullAddress').get(function() {
  const parts = [this.street, this.city, this.state, this.pincode];
  if (this.landmark) parts.splice(1, 0, this.landmark);
  return parts.filter(Boolean).join(', ');
});

export default addressSchema;