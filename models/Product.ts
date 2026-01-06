import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    images: [String],
    category: String,
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    sizes: [String],
    colors: [String],
    tags: [String],
  },
  { timestamps: true }
);

// Database indexes for better performance
ProductSchema.index({ title: 'text', description: 'text' }); // Text search
ProductSchema.index({ category: 1, createdAt: -1 }); // Category + date sorting
ProductSchema.index({ price: 1 }); // Price filtering
ProductSchema.index({ createdAt: -1 }); // Latest products

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
