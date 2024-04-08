import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import movieRouter from "./routes/movieRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//// APP ROUTERS :
app.use("/movies", movieRouter);
app.use("/user", userRouter);

//DATA BASE CONNECTION :
mongoose
  .connect("mongodb://localhost:27017/movies")
  .then((): void => {
    app.listen(process.env.PORT, (): void => {
      console.log("Database is connect and server is running");
    });
  })
  .catch((error): void => {
    console.log(error);
  });
