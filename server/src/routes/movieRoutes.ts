import express from "express";
import { GetAllMovies,GetOneMovie,CreateMovie,UpdateMovie,DeletedMovie,GetAllMoviesFiltered } from "../ClassControlers.ts/movieClassControlers";
import { HomePageMiddleware } from "../ClassMiddlewares.ts/HomePageMiddleware";
import { VerifyLogin } from "../ClassMiddlewares.ts/VerfiyLogin";
import { AdminVerification } from "../ClassMiddlewares.ts/AdminVerification";
import {movieValidators} from "../validators/movieValidators";
import { ValidationHandler } from "../ClassMiddlewares.ts/ValidationHandler";

const router = express.Router()

router.get("/",GetAllMovies.getAllmovies);
router.get("/filter",GetAllMoviesFiltered.getAllMoviesFiltered);
router.get("/home",HomePageMiddleware.homePageMiddleware,GetAllMovies.getAllmovies);
router.get("/:id",GetOneMovie.getOneMovie);

// ADMIN USAGE ONLY :

router.post("/create",VerifyLogin.verifyLogin,AdminVerification.adminVerification,movieValidators,ValidationHandler.validationHandler,CreateMovie.createMovie);
router.put("/update/:id",VerifyLogin.verifyLogin,AdminVerification.adminVerification,UpdateMovie.updateMovie);
router.patch("/update/:id",VerifyLogin.verifyLogin,AdminVerification.adminVerification,UpdateMovie.updateMovie);
router.delete("/delete/:id",VerifyLogin.verifyLogin,AdminVerification.adminVerification,DeletedMovie.deleteMovie);

export default router