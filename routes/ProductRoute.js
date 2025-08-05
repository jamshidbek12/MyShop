import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/Product.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get("/all", getAllProducts);

router.get("/:id", getProductById);

router.post("/add", protectRoute, addProduct);

router.put("/update/:id", protectRoute, updateProduct);

router.delete("/delete/:id", protectRoute, deleteProduct);

export default router;
