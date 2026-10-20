import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { AppError } from "../lib/errors.js";

type TokenPayload = { sub: string; role: Role; email: string };

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : undefined;
  const token = req.cookies.accessToken ?? bearer;
  if (!token) return next(new AppError(401, "Please sign in to continue."));
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as TokenPayload;
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch {
    next(new AppError(401, "Your session is invalid or has expired."));
  }
}

export const authorize = (...roles: Role[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new AppError(403, "You do not have access to this action."));
  next();
};
