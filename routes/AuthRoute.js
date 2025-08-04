import { Router } from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectRoute, getMe);

export default router;
