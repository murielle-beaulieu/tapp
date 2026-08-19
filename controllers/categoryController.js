import { Category } from "../models/Category.js";

// get all active categories -> not currently specifying the user
export const getActiveCategories = async (req, res) => {
  try {
    const activeCategories = await Category.find({
      isDeleted: false,
    }).sort({ createdAt: -1 });
    res.status(200).json(activeCategories);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// get all deleted categories
export const getDeletedCategories = async (req, res) => {
  try {
    const deletedCategories = await Category.find({
      isDeleted: true
    });
    res.status(200).json(deletedCategories);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// get category by id
export const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create category
export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      res.status(404).json({ message: "No match found" });
    }

    const updatedCategory = await Category.findById(id);
    res.status(200).json(updatedCategory);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
