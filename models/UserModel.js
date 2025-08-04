import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Optional: Limit the length of the user name
      minlength: 3, // Optional: Ensure the name is not empty
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      trim: true,
    },
    bio: {
      type: String,
      default: "", // Optional: Default to an empty string
      trim: true, // Optional: Allow empty bio
      maxlength: 500, // Optional: Limit the length of the bio
    },
    profileImg: {
      type: String,
      default: "", // Optional: Default to an empty string
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const User = model("User", userSchema);
export default User;
