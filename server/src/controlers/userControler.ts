import { User } from "../modules/userModule";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/badRequestError";
import { AuthenticatedRequest } from "../request/AuthenticatedRequest";

// ADMIN HANDLERS :

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      throw new BadRequestError("Unexpected Error");
    }
    console.log(users);
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(error.status).send(error.message);
    }
    console.error(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

export const updateAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

export const deleteAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

export const makeUserAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    user.role = "admin";
    const adminUser = await user.save();
    res.status(200).json({
      status: "success",
      data: adminUser,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

// USER HANDLERS :

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const cryptedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: cryptedPassword,
    });
    const createdUser = await newUser.save();
    res.status(200).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Unexpected Error",
    });
    console.error(error);
  }
};

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
    console.error(error);
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new UnauthorizedError("Unvalid Credentials");
    }
    const verifyPassword = bcrypt.compareSync(password, existingUser.password);
    if (!verifyPassword) {
      throw new UnauthorizedError("Unvalid Credentials");
    }
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "30h" }
    );
    res.status(200).json({
      status: "success",
      message: `Welcome ${existingUser.username}`,
      token: accessToken,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
    console.log(error);
  }
};

export const addToFavorite = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await User.findOne({ _id: req.user.id });
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    updatedUser.favouriteMovies = [
      ...updatedUser.favouriteMovies,
      req.params.movieID,
    ];
    updatedUser.favouriteMovies = [...new Set(updatedUser.favouriteMovies)];
    await updatedUser.save();
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
    console.error(error);
  }
};

export const deleteFromFavorite = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await User.findOne({ _id: req.user.id });
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    const updatedList = updatedUser.favouriteMovies.filter(
      (movie) => movie !== req.params.movieID
    );
    updatedUser.favouriteMovies = updatedList;
    await updatedUser.save();
    res.status(200).json({
      status: "success",
      data: updatedUser,
      message: "movies deleted from favourites",
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status).send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
    console.error(error);
  }
};

export const resetPassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (verifyPassword) {
      throw new BadRequestError("Unexpected Error");
    }
    if (password !== confirmPassword) {
      throw new BadRequestError("Password and confirmation are not matching");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password Changed",
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(error.status).send(error.message);
    }
    console.error(error);
  }
};
