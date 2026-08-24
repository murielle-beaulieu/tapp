import { Category } from "../models/Category.js";

// all methods below are returning categories for the specified user

export const getActiveCategories = async (req, res) => {
  const { currentUser } = await req.body;
  try {
    const activeCategories = await Category.find({
      isDeleted: false,
      user: currentUser,
    }).sort({ createdAt: -1 });
    return res.status(200).json(activeCategories);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDeletedCategories = async (req, res) => {
  const { currentUser } = await req.body;
  try {
    const deletedCategories = await Category.find({
      isDeleted: true,
      user: currentUser,
    });
    return res.status(200).json(deletedCategories);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(200).json(newCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      return res.status(404).json({ message: "No match found" });
    }

    const updatedCategory = await Category.findById(id);
    return res.status(200).json(updatedCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// soft delete
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return res.status(200).json(deletedCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
