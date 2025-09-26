import mongoose from "mongoose";

const clothesSchema =  new mongoose.Schema(
    {
        category:{
            type: String,
            require: true
        },
        size:{
            type: String,
            require: true
        },
        manufacturer:{
            type: String,
            require: true
        },
        manufacturedAt:{
            type: Date,
            require: true
        },
        price :{
            type: Number,
            require: true
        },
        imageUrl:{
            type: String,
            require: true
        }
    },
    {timestamps: true}
);

const Clothes = mongoose.model("Clothes", clothesSchema);

export default Clothes;