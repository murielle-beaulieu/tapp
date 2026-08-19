import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;