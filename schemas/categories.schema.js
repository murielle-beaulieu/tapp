import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    deleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true },
);

export const Category = mongoose.model("Category", CategorySchema);
