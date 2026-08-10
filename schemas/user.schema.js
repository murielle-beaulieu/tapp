import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    deleted: {
      // soft delete
      type: Boolean,
      required: true,
    },
  },
  {
    timestamp: true,
  },
);

export const User = mongoose.model("User", UserSchema);
