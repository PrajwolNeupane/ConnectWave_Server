import mongoose from "mongoose";
import Joi from "joi";

const CommentModal = new mongoose.model({
  comment: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment =
  mongoose.models.CommentModal || mongoose.model("Comment", CommentModal);
export default Comment;
