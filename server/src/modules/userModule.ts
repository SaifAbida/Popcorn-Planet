import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
        unique: [true, "This user is not available"],
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: [true, "This email is not available"],
    },
    password: {
        type: String,
        required: [true, "The password is required"],
        unique: [true, "This password is not valid"],
    },
    favouriteMovies: { type: [String], default: [] },
    role: { type: String, default: "user" },
});

export const User = mongoose.model("User", userSchema);

