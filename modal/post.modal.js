import mongoose from "mongoose";
import Joi from "joi";

const PostModal = new mongoose.Schema(
  {
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
