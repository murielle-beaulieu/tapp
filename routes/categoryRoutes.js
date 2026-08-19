import { Router } from 'express';

import {getActiveCategories, getDeletedCategories, getCategoryByID, createCategory, updateCategory, deleteCategory} from "../controllers/categoryController.js";

const router = Router();

router.route("/")
.get(getActiveCategories)
.post(createCategory);

router.route("/deleted")
.get(getDeletedCategories);

router.route("/:id")
.get(getCategoryByID)
.put(updateCategory)
.delete(deleteCategory)

export default router;