import mongoose from "mongoose";

const reviewSchema =  new mongoose.Schema(
    {
        clothesId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clothes",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        Comment: {
            type: String,
            required: false,
        },
        reviewImages: {
            type: [String],
            required: false,
            validate: {
                validator: (arr) => Array.isArray(arr),
                message: "review Image must be and array of URLs"
            },
        },
        reviewVideo: {
            type: [String],
            required: false,
            validate: {
                validator: (arr) => Array.isArray(arr),
                message: "review Image must be and array of URLs"
            },
        }
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;