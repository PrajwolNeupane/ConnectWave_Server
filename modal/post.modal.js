import mongoose from "mongoose";

const PostModal = new mongoose.Schema(
  {
    creater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: [
      {
        url: {
          type: String,
        },
      },
    ],
    videoUrl: [
      {
        url: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.models.PostModal || mongoose.model("Post", PostModal);
export default Post;
