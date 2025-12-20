import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    category: {
      type: String,
      enum: ["Men", "Women", "Kids", "Winter", "Summer"],
      required: true,
    },

    collections: [String],
    sizes: [String],
    colors: [String],
    tags: [String],

    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },

    images: [String],
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
