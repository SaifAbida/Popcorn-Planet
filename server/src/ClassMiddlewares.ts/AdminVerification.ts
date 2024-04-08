import { NextFunction, Response } from "express";
import { User } from "../modules/userModule";
import { AuthenticatedRequest } from "../request/AuthenticatedRequest";
import { ForbiddenError } from "../errors/badRequestError";

export class AdminVerification {
  static async adminVerification(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (user.role !== "admin") {
        throw new ForbiddenError(`${user.username} is not an admin`);
      }
      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        res.status(error.status).send(error.message);
      } else {
        res.status(500).send("Unexpected Error");
      }
      console.error(error);
    }
  }
}
