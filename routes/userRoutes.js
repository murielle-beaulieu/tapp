import { Router } from 'express';

import { getAllUsers,getAllActiveUsers, getAllDeletedUsers, getUserByID, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.route("/")
.get(getAllUsers)
.post(createUser)

router.route("/deleted")
.get(getAllDeletedUsers)

router.route("/active")
.get(getAllActiveUsers)

router.route("/:id")
.get(getUserByID)
.put(updateUser)
.delete(deleteUser)

export default router;