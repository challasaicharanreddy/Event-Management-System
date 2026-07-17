import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";

import { getDashboard } from "./dashboard.controller.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("admin"),
  getDashboard
);

export default router;