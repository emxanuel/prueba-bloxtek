import { Request, Response, NextFunction } from "express";
import loginService from "../services/login.service";

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}