import { Router } from 'express';

import {getActiveTasks, getCompletedTasks, getDeletedTasks, getTaskByID, createTask, updateTask, deleteTask, getActiveTasksByCategory } from "../controllers/taskController.js";

const router = Router();

router.route("/")
.get(getActiveTasks)
.post(createTask);

router.route("/category=:id")
.get(getActiveTasksByCategory)

router.route("/completed")
.get(getCompletedTasks);

router.route("/deleted")
.get(getDeletedTasks);

router.route("/:id")
.get(getTaskByID)
.put(updateTask)
.delete(deleteTask);

export default router;