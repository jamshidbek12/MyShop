import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
export default Comment;
