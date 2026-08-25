import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// get all users - admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// get all active users - admin only
export const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// get all deleted users - admin only
export const getAllDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true }).sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update user information - not pw
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "No match found" });
    }
    const updatedUser = await User.findById(id);
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// update user password - rehash pw
export const updatePassword = async (req, res) => {
  const { id, newPassword } = req.body;
  let updatedPassword;
  try {
    updatedPassword = await bcrypt.hash(newPassword, 10);
  } catch {
    console.log(err);
  }
  console.log(updatePassword);
  try {
    const user = await User.findByIdAndUpdate(id, {
      password: updatedPassword,
    });

    if (!user) {
    return res.status(404).json({ message: "No match found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isDeleted: true });

    if (!user) {
      return res.status(404).json({ message: "No match found" });
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};
