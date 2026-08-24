import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

// get all users - admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all active users - admin only
export const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all deleted users - admin only
export const getAllDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update user information - not pw
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404).json({ message: "No match found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user password - rehash pw
export const updatePassword = async (req, res) => {
  const { userID, newPassword } = req.body;
  let updatedPassword;
  try {
    updatedPassword = await bcrypt.hash(newPassword, 10);
  } catch {
    console.log(err);
  }
  console.log(updatePassword);
  try {
    const user = await User.findByIdAndUpdate(userID, {
      userPassword: updatedPassword,
    });

    if (!user) {
      res.status(404).json({ message: "No match found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isDeleted: true });

    if (!user) {
      res.status(404).json({ message: "No match found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
