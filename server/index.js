import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import ClotherRoutes from './routes/ClothesRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors({ origin: "https://net-a-porter.netlify.app/" || "http://localhost:5173/" }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/api/clothes", ClotherRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/wishlist",protect, wishlistRoutes);
app.use("/api/cart",protect, cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`app now listening at ${PORT}`)
    console.log(`app now running on http://localhost:${PORT}`);
});