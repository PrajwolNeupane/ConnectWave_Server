import "dotenv/config";
import User from "../modal/user.modal.js";
import Post from "../modal/post.modal.js";
// import Comment from "../modal/comment.modal.js";
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

//Get Post
export const getPost = async (req, res) => {
  try {
    var post = await Post.find().limit(10);
    res.send({
      message: "Feeding Post",
      sucess: true,
      post: post,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Upload Post
export const uploadPost = async (req, res) => {
  const storage = getStorage();
  var imagesUrl = [];
  var videosUrl = [];
  try {
    if (req.files?.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].mimetype.includes("image")) {
          if (req.files[i].size > 200 * 1024) {
            return res.status(400).send({
              message: "File size exceeds the limit of 200KB",
              success: false,
            });
          }
          const fileRef = ref(
            storage,
            "post/" +
              req.token.id +
              "-" +
              Date.now() +
              Math.floor(Math.random() * 100) +
              "-postimage.png"
          );
          const metadata = {
            contentType: req.files[i].mimetype,
            date: Date.now(),
          };
          const snapshot = await uploadBytesResumable(
            fileRef,
            req.files[i].buffer,
            metadata
          );
          var photoURL = await getDownloadURL(snapshot.ref);
          imagesUrl.push({ url: photoURL });
        } else if (req.files[i].mimetype.includes("video")) {
          if (req.files[i].size > 9000 * 1024) {
            return res.status(400).send({
              message: "File size exceeds the limit of 9MB",
              success: false,
            });
          }
          const fileRef = ref(
            storage,
            "post/" +
              req.token.id +
              "-" +
              Date.now() +
              Math.floor(Math.random() * 100) +
              "-postvideo.mp4"
          );
          const metadata = {
            contentType: req.files[i].mimetype,
            date: Date.now(),
          };
          const snapshot = await uploadBytesResumable(
            fileRef,
            req.files[i].buffer,
            metadata
          );
          var videoURL = await getDownloadURL(snapshot.ref);
          videosUrl.push({ url: videoURL });
        }
      }
    }
    req.body.creater = req.token.id;
    req.body.imageUrl = imagesUrl;
    req.body.videoUrl = videosUrl;
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
