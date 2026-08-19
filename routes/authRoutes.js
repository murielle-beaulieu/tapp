import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/authController.js";

const router = Router();

router.route("/login")
.get(userSignIn)

router.route("/signup")
.post(userSignUp)

export default router;