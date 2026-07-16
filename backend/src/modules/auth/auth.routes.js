import express from "express";

import {
  register,
  login,
  getMe,
} from "./auth.controller.js";

import {
  registerValidator,
  loginValidator,
  validate,
} from "./auth.validator.js";

import protect from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get(
  "/me",
  protect,
  getMe
);

export default router;