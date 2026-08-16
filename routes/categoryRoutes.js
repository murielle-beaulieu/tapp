import express from 'express';
import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { Router } from 'express';

import {getActiveCategories, getDeletedCategories, getCategoryByID, createCategory, updateCategory, deleteCategory} from "../controllers/categoryController.js";

const router = Router();

router.route("/")
.get(getActiveCategories)
.post(createCategory);

router.route("/:id")
.get(getCategoryByID)
.put(updateCategory)

router.route("delete/:id")
.put(deleteCategory);

router.route("/deleted")
.get(getDeletedCategories);

export default router;