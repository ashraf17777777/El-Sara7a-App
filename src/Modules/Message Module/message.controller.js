import { Router } from "express";
import { authMiddleware } from "../../Middlewares/auth.middleware.js";
import authorization from "../../Middlewares/authorization.js";
import * as messageService from "../Message Module/message.service.js";
import { sendMessageSchema } from "../Message Module/message.schema.js";
import validation from "../../Middlewares/validation.middleware.js";
import { userRole } from "../../Services/roles.js";

const messageRouter = Router();

messageRouter.get(
  "/get-message/:id",
  authMiddleware,
  messageService.getSingleMessage,
);
//   authorization(userRole.USER),

messageRouter.post(
  "/add-message",
  authMiddleware,
  validation(sendMessageSchema),
  messageService.sendMessage,
);
console.log("IMPORTED SCHEMA IS:", sendMessageSchema);
//   authorization(userRole.USER),
export default messageRouter;
