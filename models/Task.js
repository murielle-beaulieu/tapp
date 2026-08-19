import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    taskUser: {
      type: mongoose.Types.ObjectId, 
      ref: "TaskUser",
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    taskNote: {
      type: String,
      required: false,
    },
    taskCategory: {
      type: mongoose.Types.ObjectId,
      ref: "TaskCategory",
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