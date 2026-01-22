import registerService from "../services/register.service";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { user, token } = await registerService(name, email, password);
  res.status(201).json({ user, token });
};