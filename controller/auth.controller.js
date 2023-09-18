import User, { UserSchema } from "../modal/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import photoGenerator from "../helper/photoGenerator.js";

export const createUser = async (req, res) => {
  const { error, value } = UserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  var user = await User.findOne({ email: value.email });
  if (user) {
    return res
      .status(400)
      .json({ success: "false", message: "Email already taken" });
  }
  var photourl = photoGenerator(value.firstname, value.lastname);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  req.body.password = hashedPassword;
  user = new User({ ...req.body, photourl });
  user = await user.save();
  res.send({
    message: "User Created",
    success: "true",
    user: user,
  });
  try {
  } catch (e) {
    console.log(e.message);
  }
};
