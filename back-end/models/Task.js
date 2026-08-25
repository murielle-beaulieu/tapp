import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId, 
      ref: "User",
      required: false, // while working out some things, usually should be true
    },
    taskName: {
      type: String,
      required: true,
    },
    taskNote: {
      type: String,
      required: false,
    },
    Category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model("Task", TaskSchema);