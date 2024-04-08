import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: [true, "Movie with this name already exist"],
  },
  genre: { type: [String], required: [true, "The genre is required"] },
  price: { type: Number, required: [true, "The genre is required"] },
  releaseYear: {
    type: Number,
    required: [true, "The release year is required"],
  },
  rating: { type: Number, required: [true, "The rating is required"] },
  image: String,
});

export const Movie = mongoose.model("Movie", movieSchema);

