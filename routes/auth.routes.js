import express from "express";
import {
  createUser,
  getCertainUserInfo,
  getUserInfo,
  logOut,
  loginUser,
} from "../controller/auth.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();
router.get("/me", authenticateUser, getUserInfo);
router.get("/:id", getCertainUserInfo);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/logout", authenticateUser, logOut);

export default router;
