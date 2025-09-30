import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO); // no need for extra options
    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
