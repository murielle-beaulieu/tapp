import { User } from '../models/User.js';

// get all users - admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get all active users - admin only
export const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find({isDeleted: false}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get all deleted users - admin only
export const getAllDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({isDeleted: true}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get user by id
export const getUserByID = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// create user
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user){
            res.status(404).json({ message: "No match found" });
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch {
        res.status(500).json({message: err.message});
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const {id } = req.params;
        const user = await User.findByIdAndUpdate(id, {isDeleted: true});

         if(!user){
            res.status(404).json({ message: "No match found" });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({message: err.message});
    }
}