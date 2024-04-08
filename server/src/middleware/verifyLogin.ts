import { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../request/AuthenticatedRequest";

export const verifyLogin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) {
      return res.status(400).json({
        status: "failed",
        message: "No token provided",
      });
    }
    const token = (authHeader as string).split(" ")[1];
    const decoded = Jwt.verify(token, process.env.TOKEN_SECRET_KEY) as {id:string,iat:number,exp:number};
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
    console.log(error);
  }
};
