import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/Product.controller.js";

const router = Router();

router.get("/all", getAllProducts);

router.get("/:id", getProductById);

router.post("/add", addProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;
