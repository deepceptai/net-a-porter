import express from 'express';
import { signup, login } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

export default router;