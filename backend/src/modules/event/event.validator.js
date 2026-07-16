import { body, validationResult } from "express-validator";

export const createEventValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("venue").notEmpty().withMessage("Venue is required"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  body("price").optional().isFloat({ min: 0 }),
  body("startDateTime").isISO8601(),
  body("endDateTime").isISO8601(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};