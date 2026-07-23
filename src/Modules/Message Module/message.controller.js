import { Router } from "express";
import { authMiddleware } from "../../Middlewares/auth.middleware";

const messageRouter = Router();

messageRouter.get("/get-message/:id", authMiddleware, authroization(userRole.user), messageService.getSingleMessage);

messageRouter.post("/add-message", authMiddleware, authorization(userRole.user),validation(messageSchema.sendMessage),messageService.sendMessage)

export default messageRouter;

