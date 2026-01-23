import cors from "cors";


import express from "express";
import morgan from "morgan";
import router from "./router";
import { CustomError } from "./errors";


const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(router);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;