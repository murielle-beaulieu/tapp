import mongoose from "mongoose";

const TestSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: false
    },
    deleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Test = mongoose.model("Test", TestSchema);