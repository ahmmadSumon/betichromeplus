import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: {
      type: String,
      default: "user", // admin | user
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
