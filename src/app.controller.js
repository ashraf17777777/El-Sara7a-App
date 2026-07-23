import connectDB  from "./DB/connection.js";
import userRouter from "./Modules/User Module/user.controller.js";
import messageRouter from "./Modules/Message Module/message.controller.js";

export const bootstrap = (express, app) => {
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/message", messageRouter);


  await connectDB();

  app.use((req, res) => {
    res.status(404).json({ message: "Not Found!" });
  });
};
