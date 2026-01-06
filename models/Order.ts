import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: String, // User ID from session
  userEmail: String, // For linking orders to logged-in users
  customerInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: String,
    address: { type: String, required: true },
    apartment: String,
    city: { type: String, required: true },
    district: { type: String, required: true },
    postcode: String,
    phone: { type: String, required: true },
    email: String,
    notes: String,
  },
  items: [{
    _id: String,
    title: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  subtotal: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Database indexes for better performance
OrderSchema.index({ orderId: 1 }); // Order lookup
OrderSchema.index({ userEmail: 1, createdAt: -1 }); // User orders
OrderSchema.index({ userId: 1, createdAt: -1 }); // User orders by ID
OrderSchema.index({ status: 1, createdAt: -1 }); // Admin order management
OrderSchema.index({ createdAt: -1 }); // Latest orders

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);