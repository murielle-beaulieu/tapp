import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "general" // general or admin
    },
    isDeleted: {
      // soft delete
      type: Boolean,
      default: false
    },
  },
  {
    timestamp: true,
  },
);

export const User = mongoose.model("User", UserSchema);
