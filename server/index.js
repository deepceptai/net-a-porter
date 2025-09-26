import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import ClotherRoutes from './routes/ClothesRoutes.js';
import UserRoutes from './routes/UserRoutes.js';


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));




app.use("/api/clothes", ClotherRoutes);
app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app now listening at ${PORT}`)
    console.log(`app now running on http://localhost:${PORT}`);
});