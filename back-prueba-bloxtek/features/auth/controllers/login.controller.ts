import { Request, Response } from "express";
import loginService from "../services/login.service";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await loginService(email, password);
  res.json({ user, token });
};