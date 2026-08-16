import express from 'express';
import mongoose from "mongoose";
import { Task } from "../models/Task.js";
import { Router } from 'express';

import {getActiveTasks, getCompletedTasks, getDeletedTasks, getTaskByID, createTask, updateTask, deleteTask} from "../controllers/taskController.js";

const router = Router();

router.route("/")
.get(getActiveTasks)
.post(createTask);

router.route("/completed")
.get(getCompletedTasks);

router.route("/:id")
.get(getTaskByID)
.post(updateTask);

router.route("/delete/:id")
.put(deleteTask);

router.route("/completed")
.get(getCompletedTasks);

router.route("/deleted")
.get(getDeletedTasks);

export default router;