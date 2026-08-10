import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    user_id: {
      // this will be in relation to a different schema - user who post the task
      type: Number,
      required: true,
    },
    task_name: {
      type: String,
      required: true,
    },
    task_note: {
      type: String,
      required: false,
    },
    category: {
      // this will be in relation to a different schema - the category assigned
      type: String,
      required: false,
    },
    due_date: {
      type: Date,
      required: false,
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

export const Task = mongoose.model("Task", TaskSchema);