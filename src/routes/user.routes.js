import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(passport.authenticate("local"), loginUser);
router.route("/logout").post(logoutUser);

export default router;
