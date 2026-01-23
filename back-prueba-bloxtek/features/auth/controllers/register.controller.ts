import registerService from "../services/register.service";
import { Request, Response, NextFunction } from "express";

export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerService(name, email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};