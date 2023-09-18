import User, { UserSchema, UserLoginSchema } from "../modal/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import photoGenerator from "../helper/photoGenerator.js";
import "dotenv/config";

//Get User
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.token.id)
      .select(["-password", "-__v"])
      .populate("posts", "-creater");
    res.send({
      message: "User Authenticate",
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

//Create User
export const createUser = async (req, res) => {
  const { error, value } = UserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    var user = await User.findOne({ email: value.email });
    if (user) {
      return res
        .status(400)
        .json({ success: "false", message: "Email already taken" });
    }
    user = await User.findOne({ username: value.username });
    if (user) {
      return res
        .status(400)
        .json({ sucess: "false", message: "Username not avaiable" });
    }
    var photourl = photoGenerator(value.firstname, value.lastname);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);
    req.body.password = hashedPassword;
    user = new User({ ...req.body, photourl });
    user = await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 9000000,
    });
    return res.send({
      message: "User Created",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
  const { error } = UserLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        message: "Invalid Credentials",
        sucess: false,
      });
    }
    const validity = await bcrypt.compare(req.body.password, user.password);
    if (!validity) {
      return res.status(401).send({
        message: "Invalid Credentials",
        sucess: false,
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 9000000,
      });
      return res.status(200).json({ message: "User Logged In", success: true });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};

//Logout
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    req.token = null;
    return res.send({
      message: "User Logout",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
      sucess: false,
    });
  }
};
