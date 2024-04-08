import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

export class ValidationHandler {
  static validationHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
}
