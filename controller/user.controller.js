import "dotenv/config";
import User from "../modal/user.modal.js";
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

//Edit Usder Profile
export const editUserProfile = async (req, res) => {
  try {
    var user = await User.findById(req.token.id).select(["-password", "-__v"]);
    if (req.body.email || req.body.password || req.body._id) {
      return res.status(403).send({
        message: "Cannot updated these parameters",
        sucess: false,
      });
    }
    if (req.body.username) {
      var check_user = await User.findOne({
        username: req.body.username,
        _id: { $ne: req.token.id },
      });
      if (check_user) {
        return res
          .status(400)
          .json({ sucess: "false", message: "Username not avaiable" });
      }
    }
    user = await user.updateOne({ ...req.body }, { new: true });
    res.send({
      message: "User Profile Updated",
      success: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Edit user Password
export const updatePassword = async (req, res) => {
  try {
    var user = await User.findById(req.token.id).select(["-__v"]);
    const validity = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!validity) {
      return res.status(401).send({
        message: "Invalid Credentials",
        sucess: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    const updatedUser = await User.findById(req.token.id).select([
      "-password",
      "-__v",
    ]);
    return res.send({
      message: "User Password Updated",
      success: true,
      user: updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Edit User Profile Photo
export const updateProfilePhoto = async (req, res) => {
  const storage = getStorage();
  var photoURL;
  try {
    if (req.file.size > 200 * 1024) {
      return res.status(400).send({
        message: "File size exceeds the limit of 200KB",
        success: false,
      });
    }
    var user = await User.findById(req.token.id).select(["-__v", "-password"]);
    const fileRef = ref(storage, req.token.id + "-profilephoto.png");
    const metadata = {
      contentType: req.file.mimetype,
      photoOf: `${user.firstname} ${user.lastname}`,
      date: Date.now(),
    };
    const snapshot = await uploadBytesResumable(
      fileRef,
      req?.file.buffer,
      metadata
    );
    photoURL = await getDownloadURL(snapshot.ref);
    user.photourl = photoURL;
    await user.save();
    const updatedUser = await User.findById(req.token.id).select([
      "-password",
      "-__v",
    ]);
    res.send({
      message: "User Profile Photo Updated",
      success: true,
      user: updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Edit User Cover Photo
export const updateCoverPhoto = async (req, res) => {
  const storage = getStorage();
  var photoURL;
  try {
    if (req.file.size > 400 * 1024) {
      return res.status(400).send({
        message: "File size exceeds the limit of 400KB",
        success: false,
      });
    }
    var user = await User.findById(req.token.id).select(["-__v", "-password"]);
    const fileRef = ref(storage, req.token.id + "-coverphoto.png");
    const metadata = {
      contentType: req.file.mimetype,
      photoOf: `${user.firstname} ${user.lastname}`,
      date: Date.now(),
    };
    const snapshot = await uploadBytesResumable(
      fileRef,
      req?.file.buffer,
      metadata
    );
    photoURL = await getDownloadURL(snapshot.ref);
    user.coverphotourl = photoURL;
    await user.save();
    const updatedUser = await User.findById(req.token.id).select([
      "-password",
      "-__v",
    ]);
    res.send({
      message: "User Profile Photo Updated",
      success: true,
      user: updatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};
