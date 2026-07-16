import express from "express";

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";

import { checkIn } from "./attendance.controller.js";

const router = express.Router();

router.post(
    "/check-in",
    protect,
    authorize("admin", "organizer"),
    checkIn
);

export default router;