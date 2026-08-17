import express from 'express';
import mongoose from 'mongoose';
import { User } from "../models/User.js"
import { Router } from 'express';

import { getAllUsers,getAllActiveUsers, getAllDeletedUsers, getUserByID, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.route("/")
.get(getAllUsers)
.post(createUser)

router.route("/:id")
.get(getUserByID)
.put(updateUser)

router.route("/delete/:id")
.put(deleteUser)

router.route("/deleted")
.get(getAllDeletedUsers)

router.route("/active")
.get(getAllActiveUsers)

export default router;