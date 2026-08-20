import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "general", // general or admin
    },
    isDeleted: {
      // soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  },
);

UserSchema.plugin(uniqueValidator);

export const User = mongoose.model("User", UserSchema);
