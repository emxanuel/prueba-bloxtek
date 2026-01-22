import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import morgan from "morgan";
import router from "./router";


const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;