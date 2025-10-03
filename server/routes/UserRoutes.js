// routes/userRoutes.js
import express from 'express';
import { signup, login } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Full profile route
router.get("/profile", protect, async (req, res) => {
  try {
    // Fetch user by ID from token
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile data",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

export default router;
