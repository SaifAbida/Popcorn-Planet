import { body } from "express-validator";

export const passwordResetValidators = [
  body("password").isString().withMessage("the password should be text"),
  body("password").notEmpty().withMessage("the password should not be empty"),
  body("password").trim(),
  body("password").isLength({ min: 5 }).withMessage("the password should contain atleast 5 characters"),
];


