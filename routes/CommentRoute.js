import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addComment,
  getCommentsByProductId,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/:productId", protectRoute, addComment);
router.get("/:productId", getCommentsByProductId);

export default router;
