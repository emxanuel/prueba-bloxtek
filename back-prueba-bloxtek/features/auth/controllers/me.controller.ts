import meService from "../services/me.service";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@/core/errors";

export const meController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];
    
    if (!token || token.trim().length === 0) {
      throw new UnauthorizedError("Token is required");
    }

    const user = await meService(token);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};