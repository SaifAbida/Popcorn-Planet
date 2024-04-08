import { body } from "express-validator";

export const updateValidators = [
  body("username").isString().withMessage("the username should be text"),
  body("username").trim(),
  body("email").isEmail().withMessage("Invalid Email"),
  body("email").trim(),
  body("favouriteMovies").default([]),
  body("role").default("user")
];
