import { Router } from "express";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { config } from "../config.js";
import { AppError } from "../lib/errors.js";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/auth.js";

export const authRouter = Router();
const credentials = z.object({ email: z.string().trim().email().transform(v => v.toLowerCase()), password: z.string().min(8).max(72) });
const signupSchema = credentials.extend({ name: z.string().trim().min(2).max(60) });

function issueToken(res: import("express").Response, user: { id: string; email: string; role: Role }) {
  const token = jwt.sign({ role: user.role, email: user.email }, config.JWT_SECRET, { subject: user.id, expiresIn: "7d" });
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
  });
}

authRouter.post("/signup", async (req, res) => {
  const data = signupSchema.parse(req.body);
  const exists = await prisma.user.findUnique({ where: { email: data.email }, select: { id: true } });
  if (exists) throw new AppError(409, "An account with this email already exists.");
  const user = await prisma.user.create({ data: { name: data.name, email: data.email, passwordHash: await bcrypt.hash(data.password, 12) } });
  issueToken(res, user);
  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

authRouter.post("/login", async (req, res) => {
  const data = credentials.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new AppError(401, "Email or password is incorrect.");
  issueToken(res, user);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("accessToken", { path: "/" });
  res.status(204).send();
});

authRouter.get("/me", authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id }, select: { id: true, name: true, email: true, role: true } });
  if (!user) throw new AppError(404, "User not found.");
  res.json({ user });
});
