import "dotenv/config";
import User from "../modal/user.modal.js";
import Post from "../modal/post.modal.js";
import Comment from "../modal/comment.modal.js";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import config from "../helper/firebase.config.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

//Intializing
const storage = getStorage(
  initializeApp(config.firebaseConfig),
  process.env.STORAGE_URL
);

//Upload Post
export const uploadPost = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};
