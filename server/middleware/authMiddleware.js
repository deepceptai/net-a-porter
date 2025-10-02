import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

/**
 * Middleware to protect routes (token required)
 */
export const protect = (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // temporary { id, email, roles }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * Middleware to fetch the full user object from DB
 */
export const getUserFromToken = async (req, res, next) => {
  try {
    // If no decoded user from protect(), block
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found in token",
      });
    }

    // Fetch user from DB
    const user = await User.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // attach full user object
    next();
  } catch (error) {
    console.error("Error in getUserFromToken middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    });
  }
};
