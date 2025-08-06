import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import ProductRoutes from "./routes/ProductRoute.js";
import AuthRoutes from "./routes/AuthRoute.js";
import CommentRoutes from "./routes/CommentRoute.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/products", ProductRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/comments", CommentRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
