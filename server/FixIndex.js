import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO = process.env.MONGO_URI;

const dropIndex = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    // Drop the duplicate index
    await db.collection("users").dropIndex("referralCode_1");
    console.log("Dropped duplicate referralCode index");

    process.exit(0);
  } catch (error) {
    console.error("Error dropping index:", error.message);
    process.exit(1);
  }
};

dropIndex();
