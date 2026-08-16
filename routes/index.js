import {Router} from "express";
import taskRoutes from "./taskRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);

export default router;