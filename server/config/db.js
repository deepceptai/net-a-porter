import mongoose from "mongoose";

const connectDB = async () => {
    const MONGO = process.env.MONGO_URI;

    try{
        const conn = await mongoose.connect(MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`connected to mongoDB: ${conn.connections.host}`);
    } catch(error){
        console.error("Error in connecting to mongoDB");
        process.exit(1);
    }
};

export default connectDB;