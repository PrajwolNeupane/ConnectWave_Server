import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {
  editUserProfile,
  updatePassword,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/edit", authenticateUser, editUserProfile);
router.post("/edit/password", authenticateUser, updatePassword);

export default router;
