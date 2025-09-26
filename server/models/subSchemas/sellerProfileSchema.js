import mongoose from "mongoose";
import addressSchema from "./addressSchema.js";

const sellerProfileSchema = new mongoose.Schema({
  // Store Information
  storeName: {
    type: String,
    required: [true, "Store name is required"],
    trim: true,
    minlength: [2, "Store name must be at least 2 characters"],
    maxlength: [100, "Store name cannot exceed 100 characters"],
  },
  storeDescription: {
    type: String,
    maxlength: [1000, "Store description cannot exceed 1000 characters"],
    trim: true,
  },
  storeCategory: {
    type: [String],
    enum: ["clothes", "bags", "footwear", "accessories"],
    validate: {
      validator: function(categories) {
        return categories.length > 0;
      },
      message: "At least one store category is required",
    },
  },
  storeLogo: {
    type: String, // URL to store logo
  },
  storeBanner: {
    type: String, // URL to store banner
  },

  // Business Information
  businessType: {
    type: String,
    enum: {
      values: ["individual", "proprietorship", "partnership", "company", "llp"],
      message: "Invalid business type"
    },
    required: [true, "Business type is required"],
  },
  businessRegistrationNumber: {
    type: String,
    trim: true,
  },
  
  // Tax Information
  gstNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(value) {
        if (!value) return true; // GST is optional for small businesses
        return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
      },
      message: "Invalid GST number format",
    },
  },
  panNumber: {
    type: String,
    required: [true, "PAN number is required"],
    uppercase: true,
    validate: {
      validator: function(value) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
      },
      message: "Invalid PAN number format (e.g., ABCDE1234F)",
    },
  },

  // Bank Details
  bankDetails: {
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      trim: true,
    },
    ifscCode: {
      type: String,
      required: [true, "IFSC code is required"],
      uppercase: true,
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"],
    },
    accountHolderName: {
      type: String,
      required: [true, "Account holder name is required"],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["savings", "current"],
      default: "savings",
    },
  },

  // Store Address
  storeAddress: {
    type: addressSchema,
    required: [true, "Store address is required"],
  },

  // Verification and Status
  verified: {
    type: Boolean,
    default: false,
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "under_review", "approved", "rejected"],
    default: "pending",
  },
  verificationDocuments: [{
    type: {
      type: String,
      enum: ["aadhar", "pan", "gst", "business_license", "bank_statement", "store_photo"],
    },
    url: {
      type: String,
      required: true,
    },
    fileName: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    rejectionReason: String,
  }],

  // Performance Metrics
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    count: {
      type: Number,
      default: 0,
      min: [0, "Rating count cannot be negative"],
    },
  },
  
  // Financial
  commissionRate: {
    type: Number,
    default: 15, // Platform commission percentage
    min: [0, "Commission rate cannot be negative"],
    max: [100, "Commission rate cannot exceed 100%"],
  },
  totalSales: {
    type: Number,
    default: 0,
    min: [0, "Total sales cannot be negative"],
  },
  totalOrders: {
    type: Number,
    default: 0,
    min: [0, "Total orders cannot be negative"],
  },

  // Status
  isActive: {
    type: Boolean,
    default: false,
  },
  suspensionReason: {
    type: String,
    trim: true,
  },
  suspendedAt: Date,
  activatedAt: Date,

  // Store Policies
  returnPolicy: {
    type: String,
    maxlength: [500, "Return policy cannot exceed 500 characters"],
  },
  shippingPolicy: {
    type: String,
    maxlength: [500, "Shipping policy cannot exceed 500 characters"],
  },
  
  // Contact Information
  customerServicePhone: {
    type: String,
    validate: {
      validator: function(phone) {
        if (!phone) return true;
        return /^[6-9]\d{9}$/.test(phone);
      },
      message: "Invalid phone number format",
    },
  },
  customerServiceEmail: {
    type: String,
    lowercase: true,
    validate: {
      validator: function(email) {
        if (!email) return true;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format",
    },
  },

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for verification completion percentage
sellerProfileSchema.virtual('verificationProgress').get(function() {
  const requiredDocs = ['pan', 'aadhar', 'bank_statement'];
  const uploadedDocs = this.verificationDocuments.map(doc => doc.type);
  const completed = requiredDocs.filter(doc => uploadedDocs.includes(doc)).length;
  return Math.round((completed / requiredDocs.length) * 100);
});

// Virtual for store performance score
sellerProfileSchema.virtual('performanceScore').get(function() {
  if (this.totalOrders === 0) return 0;
  
  const ratingScore = (this.rating.average / 5) * 40; // 40% weight
  const orderScore = Math.min(this.totalOrders / 100, 1) * 30; // 30% weight
  const salesScore = Math.min(this.totalSales / 100000, 1) * 30; // 30% weight
  
  return Math.round(ratingScore + orderScore + salesScore);
});

export default sellerProfileSchema;