import { NextFunction, Request, Response } from "express";

export const getHomePage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query.sort = "-ratings";
  (req.query.limit as any) = 12;
  next();
};
