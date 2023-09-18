import "dotenv/config";
import User from "../modal/user.modal.js";
import bcrypt from "bcrypt";

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
