import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true },
);

export const Category = mongoose.model("Category", CategorySchema);
