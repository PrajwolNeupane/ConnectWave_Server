import express from "express";
import {
  createUser,
  getUserInfo,
  loginUser,
} from "../controller/auth.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/me", authenticateUser, getUserInfo);
router.post("/signup", createUser);
router.post("/login", loginUser);

export default router;
