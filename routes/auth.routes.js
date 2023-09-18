import express from "express";
import { createUser, getUserInfo } from "../controller/auth.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/me", authenticateUser, getUserInfo);
router.post("/signup", createUser);

export default router;
