import { body } from "express-validator";

export const userValidators = [
  body("username").isString().withMessage("the username should be text"),
  body("username").notEmpty().withMessage("the username should not be empty"),
  body("username").trim(),
  body("email").isEmail().withMessage("Invalid Email"),
  body("email").notEmpty().withMessage("the email should not be empty"),
  body("email").trim(),
  body("password").isString().withMessage("the password should be text"),
  body("password").notEmpty().withMessage("the password should not be empty"),
  body("password").trim(),
  body("password").isLength({ min: 5 }).withMessage("the password should contain atleast 5 characters"),
  body("favouriteMovies").default([]),
  body("role").default("user")
];

