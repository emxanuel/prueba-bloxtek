import { Request, Response, NextFunction } from "express";
import loginService from "../services/login.service";
import { loginSchema } from "../schemas/login.schema";

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { user, token } = await loginService(email, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
} 