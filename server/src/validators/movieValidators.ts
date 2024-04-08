import {body} from "express-validator"

const currentYear = new Date().getFullYear();

export const movieValidators = [
  body("name").trim(),
  body("name").isString().withMessage("The name should be text"),
  body("name").notEmpty().withMessage("The name should not be empty"),
  body("genre").trim(),
  body("genre")
    .isArray({ min: 0 })
    .withMessage("the movie should atleast have one genre"),
  body("price").trim(),
  body("price").isNumeric().withMessage("the price should be a number"),
  body("price").notEmpty().withMessage("the price should not be empty"),
  body("releaseYear").trim(),
  body("releaseYear")
    .isFloat({ min: 0, max: currentYear })
    .withMessage("the release year should be a date"),
  body("rating").trim(),
  body("rating").notEmpty().withMessage("the rating should not be empty"),
  body("rating")
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating should be between 1 and 10"),
  body("image").trim(),
  body("image").isString().withMessage("The image should be text"),
];

