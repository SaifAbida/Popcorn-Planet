import { NextFunction, Request, Response } from "express";

export class HomePageMiddleware {
  static homePageMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    req.query.sort = "-ratings";
    (req.query.limit as any) = 12;
    next();
  }
}
