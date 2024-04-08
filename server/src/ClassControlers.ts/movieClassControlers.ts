import { NotFoundError } from "../errors/badRequestError";
import { Movie } from "../modules/movieModule";
import { Request, Response } from "express";

export class GetAllMovies {
  static async getAllmovies(req: Request, res: Response): Promise<void> {
    try {
      const totalElements = await Movie.countDocuments();
      let query = Movie.find();
      // SORTING :
      if (req.query.sort) {
        const sortBy = (req.query.sort as string).split(",").join(" ");
        query = query.sort(sortBy);
      }
      //PAGINATION
      const page = (req.query.page as any) * 1 || 1;
      const limit = (req.query.limit as any) * 1 || 12;
      const totalPages = Math.ceil(totalElements / limit);
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      let movies = await query;
      if (movies.length === 0) {
        throw new NotFoundError("Movies not found");
      }
      res.status(200).json({
        status: "success",
        totalPages,
        length: movies.length,
        data: movies,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
      console.error(error);
    }
  }
}

export class GetAllMoviesFiltered {
  static async getAllMoviesFiltered(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // FILTERING :
      let queryString = JSON.stringify(req.query);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const queryObject = JSON.parse(queryString);
      const movies = await Movie.findOne(queryObject);
      res.status(200).json({
        status: "success",
        data: movies,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

export class GetOneMovie {
  static async getOneMovie(req: Request, res: Response): Promise<void> {
    try {
      const movie = await Movie.findOne({ _id: req.params.id });
      if (!movie) {
        throw new NotFoundError("Movies not found");
      }
      res.status(200).json({
        status: "success",
        data: movie,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
      console.error(error);
    }
  }
}

export class CreateMovie {
  static async createMovie(req: Request, res: Response): Promise<void> {
    try {
      const newMovie = new Movie(req.body);
      const createdMovie = await newMovie.save();
      res.status(200).json({
        status: "success",
        data: createdMovie,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

export class UpdateMovie {
  static async updateMovie(req: Request, res: Response): Promise<void> {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMovie) {
        throw new NotFoundError("Movies not found");
      }
      res.status(200).json({
        status: "success",
        data: updatedMovie,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
      console.error(error);
    }
  }
}

export class DeletedMovie {
  static async deleteMovie(req: Request, res: Response): Promise<void> {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      if (!deletedMovie) {
        throw new NotFoundError("Movies not found");
      }
      res.status(200).json({
        status: "success",
        message: "Movie deleted successfully",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
      console.error(error);
    }
  }
}
