import "dotenv/config";
import User from "../modal/user.modal.js";
import Post from "../modal/post.modal.js";
// import Comment from "../modal/comment.modal.js";
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
    req.body.creater = req.token.id;
    var post = new Post(req.body);
    post = await post.save();
    post = await post.populate("creater", [
      "_id",
      "photourl",
      "username",
      "email",
    ]);
    await User.findOneAndUpdate(
      { _id: req.token.id },
      {
        $push: { posts: post._id },
      }
    );
    res.send({
      message: "Post successfully added",
      success: true,
      post,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};
