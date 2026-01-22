import authRouter from "@/features/auth/routes/auth.router";
import { Router } from "express";


const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World");
});

router.use("/auth", authRouter);

export default router;