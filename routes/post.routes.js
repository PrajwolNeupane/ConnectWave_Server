import express from "express";
import authenticateUser from "../middleware/authenticateUser";
import multer from "multer";

const upload = multer().single("image");

const router = express.Router();

router.post("/upload", [authenticateUser, upload]);

export default router;
