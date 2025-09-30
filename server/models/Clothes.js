import mongoose from "mongoose";

const allowedDressTypes = {
   clothes: {
    pants: ["denim", "cargo", "chinos", "joggers", "trousers", "leggings"],
    shirts: ["tshirt", "formal", "polo", "casual", "kurta"],
    jackets: ["leather", "bomber", "hoodie", "denim", "puffer"],
    dresses: ["maxi", "midi", "mini", "gown", "saree"],
    skirts: ["pencil", "pleated", "mini", "maxi"],
    shorts: ["denim", "cargo", "chino"],
    sweaters: ["crewneck", "vneck", "cardigan", "turtleneck", "coat"],
  },
  bags: {
    handbags: ["tote", "clutch", "sling", "hobo"],
    backpacks: ["laptop", "travel", "school", "hiking"],
    wallets: ["bi-fold", "tri-fold", "zipper"],
    luggage: ["suitcase", "duffel", "trolley"],
  },
};

const clothesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["clothes", "bags", "footwear", "accessories"],
      required: true,
    },
    dress: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return (
            allowedDressTypes[this.category]?.[this.dress]?.includes(value)
          );
        },
        message: (props) =>
          `${props.value} is not a valid type for ${props.instance.dress} in category ${props.instance.category}`,
      },
    },
    size: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one size is required",
      },
    },
    color: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one color is required"
      }
    },
    designer: {
      type: String,
      required: true,
    },
    manufacturedAt: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // multiple images
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image is required",
      },
    },
    editorNotes:{
      type: String,
      required: false
    },
    sizeAndFit:{
      description:{
        type: [String]
      },
      fitTips: {
        type: [String]
      },
      fabricDetails: {
        type: [String]
      },
       modelInfo: {
        height: { type: String }, 
        wearingSize: { type: String }, 
        measurements: {
          bust: { type: String },
          waist: { type: String },
          hip: { type: String },
        },
      },
    }
  },
  { timestamps: true }
);

const Clothes = mongoose.model("Clothes", clothesSchema);

export default Clothes;
