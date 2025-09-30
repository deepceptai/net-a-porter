// ==============================================
// File: models/User.js (Main User Model File)
// ==============================================

import mongoose from "mongoose";
import userSchema from "./userSchema.js";



// Add indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ roles: 1 });
userSchema.index({ "sellerProfile.storeName": 1 });
userSchema.index({ isAccountActive: 1, accountStatus: 1 });
userSchema.index({ lastActiveAt: -1 });

// Compound indexes for better query performance
userSchema.index({ roles: 1, isAccountActive: 1 });
userSchema.index({ "sellerProfile.isActive": 1, "sellerProfile.verified": 1 });
userSchema.index({ email: 1, isEmailVerified: 1 });
userSchema.index({ phone: 1, isPhoneVerified: 1 });

// Text index for search functionality
userSchema.index({
  firstName: "text",
  lastName: "text",
  email: "text",
  "sellerProfile.storeName": "text",
  "sellerProfile.storeDescription": "text"
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;