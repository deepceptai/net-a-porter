// ==============================================
// File: utils/userHelpers.js (Helper Functions)
// ==============================================

import User from "../models/User.js";
import crypto from "crypto";

// User creation helper
export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      throw new Error(`${field} already exists`);
    }
    throw error;
  }
};

// User authentication helper
export const authenticateUser = async (email, password) => {
  try {
    // Find user with password field
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      isAccountActive: true 
    }).select('+password');
    
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Check if account is locked
    if (user.isLocked) {
      return { success: false, message: 'Account is temporarily locked due to too many failed attempts' };
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      await user.incLoginAttempts();
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Reset login attempts and update last login
    await user.resetLoginAttempts();
    user.lastLogin = new Date();
    await user.save();
    
    return { success: true, user };
  } catch (error) {
    throw error;
  }
};

// Email verification helper
export const verifyEmail = async (token) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ emailVerificationToken: hashedToken });
    
    if (!user) {
      throw new Error('Invalid or expired verification token');
    }
    
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Password reset helper
export const resetPassword = async (token, newPassword) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }
    
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Referral system helper
export const processReferral = async (newUserId, referralCode) => {
  try {
    if (!referralCode) return;
    
    const referrer = await User.findByReferralCode(referralCode);
    if (!referrer) return;
    
    // Update new user with referrer
    await User.findByIdAndUpdate(newUserId, {
      referredBy: referrer._id
    });
    
    // Update referrer's count
    referrer.referralCount += 1;
    await referrer.save();
    
    return referrer;
  } catch (error) {
    console.error('Error processing referral:', error);
    // Don't throw error to avoid breaking user registration
  }
};

// Search users helper
export const searchUsers = async (searchTerm, filters = {}, options = {}) => {
  try {
    const searchQuery = {
      $text: { $search: searchTerm },
      isAccountActive: true,
      accountStatus: 'active',
      ...filters
    };
    
    return await User.find(searchQuery, { score: { $meta: "textScore" } }, options)
      .sort({ score: { $meta: "textScore" } });
  } catch (error) {
    throw error;
  }
};

// User analytics helper
export const getUserAnalytics = async (userId, timeRange = 30) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    const startDate = new Date(Date.now() - timeRange * 24 * 60 * 60 * 1000);
    
    const analytics = {
      profile: {
        joinDate: user.createdAt,
        lastActive: user.lastActiveAt,
        totalOrders: user.orderHistory.length,
        cartValue: user.cartTotalPrice,
        wishlistCount: user.wishlistCount,
      },
      activity: {
        loginFrequency: await calculateLoginFrequency(userId, startDate),
        deviceCount: user.deviceInfo.length,
        preferredDevice: getMostUsedDevice(user.deviceInfo),
      }
    };
    
    if (user.isSeller && user.sellerProfile) {
      analytics.seller = {
        storeName: user.sellerProfile.storeName,
        totalProducts: user.listedProducts.length,
        rating: user.sellerProfile.rating,
        totalSales: user.sellerProfile.totalSales,
        performanceScore: user.sellerProfile.performanceScore,
      };
    }
    
    return analytics;
  } catch (error) {
    throw error;
  }
};

// Helper function to calculate login frequency
const calculateLoginFrequency = async (userId, startDate) => {
  // This would typically involve analyzing login logs
  // For now, return a mock value
  return 'daily'; // daily, weekly, monthly, rarely
};

// Helper function to get most used device
const getMostUsedDevice = (deviceInfo) => {
  if (deviceInfo.length === 0) return null;
  
  return deviceInfo.reduce((prev, current) => 
    (prev.lastUsed > current.lastUsed) ? prev : current
  );
};