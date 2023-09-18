import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {
  editUserProfile,
  updateCoverPhoto,
  updatePassword,
  updateProfilePhoto,
} from "../controller/user.controller.js";
import multer from "multer";

const upload = multer().single("image");

const router = express.Router();

router.post("/edit", authenticateUser, editUserProfile);
router.post("/edit/password", authenticateUser, updatePassword);
router.post("/edit/dp", [authenticateUser, upload], updateProfilePhoto);
router.post("/edit/coverphoto", [authenticateUser, upload], updateCoverPhoto);

export default router;
