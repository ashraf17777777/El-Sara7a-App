// ------------------------------- 2nd File ----------------------------------

import connectDB from "./DB/connection.js";
import userRouter from "./Modules/User Module/user.controller.js";
import messageRouter from "./Modules/Message Module/message.controller.js";

// 1st step
export const bootstrap = async (express, app) => {
  // 2nd step
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  // 3rd step
  await connectDB();

  // 4th step
  app.use((req, res) => {
    res.status(404).json({ message: "Not Found!" });
  });
};
