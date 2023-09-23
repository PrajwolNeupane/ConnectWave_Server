import mongoose from "mongoose";
import Joi from "joi";

const UserModal = new mongoose.Schema(
  {
    clerkid: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photourl: {
      type: String,
    },
    coverphotourl: {
      type: String,
      default:
        "https://theoheartist.com/wp-content/uploads/sites/2/2015/01/fbdefault.png",
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserSchema = Joi.object({
  clerkid: Joi.string(),
  username: Joi.string().required().min(3),
  firstname: Joi.string().required().min(3).max(30),
  lastname: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmpassword: Joi.ref("password"),
  dob: Joi.string().required(),
  gender: Joi.string().required(),
  photourl: Joi.string(),
  phone: Joi.string(),
  description: Joi.string(),
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const User = mongoose.models.UserModal || mongoose.model("User", UserModal);
export default User;
