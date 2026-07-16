import express from "express";

import protect from "../../middleware/auth.middleware.js";

import {
    registerEvent
} from "./registration.controller.js";

const router = express.Router();

router.post(
    "/:eventId",
    protect,
    registerEvent
);

export default router;