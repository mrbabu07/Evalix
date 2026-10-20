import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public statusCode: number, message: string, public details?: unknown) {
    super(message);
  }
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;
  if (error instanceof ZodError) {
    res.status(422).json({ message: "Please fix the highlighted fields.", errors: error.flatten().fieldErrors });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    res.status(409).json({ message: "This submission already exists." });
    return;
  }
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message, details: error.details });
    return;
  }
  console.error(error);
  res.status(500).json({ message: "Something went wrong on our side." });
};
