import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { registerController } from "../controllers/register.controller";
import { meController } from "../controllers/me.controller";
import { logoutController } from "../controllers/logout.controller";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.get("/me", meController);
authRouter.post("/logout", logoutController);

export default authRouter;