import { Request } from "express";
import  Jwt  from "jsonwebtoken";

interface UserID {
  id: string | Jwt.JwtPayload;
}

export interface AuthenticatedRequest extends Request {
  user: UserID;
}
