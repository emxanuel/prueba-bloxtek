import { UnauthorizedError } from "@/core/errors";
import { NextFunction, Request, Response } from "express";
import logoutService from "../services/logout.service";

export async function logoutController(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    const { message } = await logoutService(token);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
}