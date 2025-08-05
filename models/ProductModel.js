import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Optional: Limit the length of the product name
      minlength: 3, // Optional: Ensure the name is not empty
    },
    price: {
      type: Number,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Product = model("Product", productSchema);

export default Product;
