import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import addressSchema from "./subSchemas/addressSchema.js";
import cartItemSchema from "./subSchemas/cartItemSchema.js";
import sellerProfileSchema from "./subSchemas/sellerProfileSchema.js";

const userSchema = new mongoose.Schema(
  {
    // Basic User Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password in queries by default
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function(phone) {
          return /^[6-9]\d{9}$/.test(phone); // Indian mobile number format
        },
        message: "Please provide a valid Indian mobile number",
      },
    },

    // Personal Information
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function(dob) {
          const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
          return age >= 13 && dob < new Date(); // Minimum age 13
        },
        message: "You must be at least 13 years old",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other", "prefer-not-to-say"],
        message: "Gender must be one of: male, female, other, prefer-not-to-say"
      },
    },
    avatar: {
      type: String, // URL to profile image
      validate: {
        validator: function(url) {
          if (!url) return true;
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        },
        message: "Avatar must be a valid image URL",
      },
    },

    // User Roles
    roles: {
      type: [String],
      enum: {
        values: ["buyer", "seller", "admin"],
        message: "Role must be one of: buyer, seller, admin"
      },
      default: ["buyer"],
      validate: {
        validator: function(roles) {
          return roles.length > 0 && new Set(roles).size === roles.length;
        },
        message: "User must have at least one unique role",
      },
    },

    // Buyer-specific Fields
    wishlist: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothes",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    
    cart: [cartItemSchema],
    addresses: [addressSchema],
    
    orderHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }],

    // Seller-specific Fields
    sellerProfile: {
      type: sellerProfileSchema,
      validate: {
        validator: function(profile) {
          return !this.roles.includes('seller') || (profile && profile.storeName);
        },
        message: "Seller profile is required for users with seller role",
      },
    },

    listedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothes",
    }],

    // Account Status and Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isAccountActive: {
      type: Boolean,
      default: true,
    },
    accountStatus: {
      type: String,
      enum: {
        values: ["active", "suspended", "banned", "pending", "deactivated"],
        message: "Invalid account status"
      },
      default: "active",
    },

    // Verification Tokens
    emailVerificationToken: String,
    phoneVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Security and Login Tracking
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
      max: [5, "Too many login attempts"],
    },
    lockUntil: Date,
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // Privacy Settings
    privacySettings: {
      showEmail: {
        type: Boolean,
        default: false,
      },
      showPhone: {
        type: Boolean,
        default: false,
      },
      allowPromotionalEmails: {
        type: Boolean,
        default: true,
      },
      allowPushNotifications: {
        type: Boolean,
        default: true,
      },
      profileVisibility: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "private",
      },
    },

    // User Preferences
    preferences: {
      language: {
        type: String,
        default: "en",
        enum: ["en", "hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "or"],
      },
      currency: {
        type: String,
        default: "INR",
        enum: ["INR", "USD", "EUR"],
      },
      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
      notifications: {
        email: {
          orderUpdates: { type: Boolean, default: true },
          promotions: { type: Boolean, default: true },
          newsletters: { type: Boolean, default: false },
        },
        sms: {
          orderUpdates: { type: Boolean, default: true },
          promotions: { type: Boolean, default: false },
          security: { type: Boolean, default: true },
        },
        push: {
          orderUpdates: { type: Boolean, default: true },
          promotions: { type: Boolean, default: true },
          chat: { type: Boolean, default: true },
        },
      },
    },

    // Analytics and Tracking
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    deviceInfo: [{
      deviceId: String,
      deviceType: {
        type: String,
        enum: ["mobile", "tablet", "desktop"],
      },
      browser: String,
      os: String,
      lastUsed: {
        type: Date,
        default: Date.now,
      },
    }],

    // Social Features (for future expansion)
    socialProfiles: {
      facebook: String,
      instagram: String,
      twitter: String,
    },

    // Referral System
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referralCount: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.password;
        delete ret.emailVerificationToken;
        delete ret.phoneVerificationToken;
        delete ret.passwordResetToken;
        return ret;
      }
    },
    toObject: { virtuals: true },
  }
);

export default userSchema;