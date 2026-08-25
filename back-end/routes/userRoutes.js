import { Router } from 'express';

import { getAllUsers, getAllActiveUsers, getAllDeletedUsers, getUserByID, updateUser, deleteUser, updatePassword } from '../controllers/userController.js';

const router = Router();

router.route("/")
.get(getAllUsers)

router.route("/deleted")
.get(getAllDeletedUsers)

router.route("/active")
.get(getAllActiveUsers)

router.route("/password")
.put(updatePassword)

router.route("/:id")
.get(getUserByID)
.put(updateUser)
.delete(deleteUser)

export default router;