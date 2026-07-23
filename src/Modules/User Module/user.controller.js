import { Router } from "express";
import * as userService from "./user.service.js";
import { authMiddleware } from "../../Middlewares/auth.middleware.js";

const userRouter = Router();
userRouter.post("/register", userService.registerLogic);
userRouter.get("/activate/:token", userService.activate);
userRouter.post("/login", userService.loginLogic);
userRouter.get("/profile", authMiddleware, userService.profile);

export default userRouter;
