import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);
router.use('/users', userRoutes);

export default router;