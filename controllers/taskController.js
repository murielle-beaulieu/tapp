import { Task } from "../models/Task.js";

// all methods below are returning tasks for the specified user

export const getActiveTasks = async (req, res) => {
  const { currentUser } = await req.body;
  try {
    const activeTasks = await Task.find({
      isDeleted: false,
      isCompleted: false,
      taskUser: currentUser,
    }).sort({ createdAt: -1 });
    res.status(200).json(activeTasks);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompletedTasks = async (req, res) => {
  const { currentUser } = await req.body;
  try {
    const completedTasks = await Task.find({
      isCompleted: true,
      taskUser: currentUser,
    }).sort({ createdAt: -1 });
    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const getDeletedTasks = async (req, res) => {
  const { currentUser } = await req.body;
  try {
    const deletedTask = await Task.find({
      isDeleted: true,
      taskUser: currentUser,
    }).sort({ createdAt: -1 });
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);

    if (!task) {
      res.status(404).json({ message: "No match found" });
    }

    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// soft delete
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDeleted = await Task.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json(taskDeleted);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
