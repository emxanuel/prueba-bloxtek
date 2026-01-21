import { Router } from "express";
import authRouter from "@/features/auth/routes/auth.router";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World");
});

router.use("/auth", authRouter);

export default router;