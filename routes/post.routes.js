import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import multer from "multer";
import { uploadPost } from "../controller/post.controller.js";

const upload = multer().array("files");

const router = express.Router();

router.post(
  "/upload",
  [authenticateUser, upload],
  uploadPost
);

export default router;
