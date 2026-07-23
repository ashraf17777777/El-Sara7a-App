import express from "express";
import { bootsrap } from "./src/app.controllerler.js";
import dotenv from "dotenv";
import { globalErrorHandler } from "./src/Middlewares/globalErrorHandler.js";
dotenv.config();

const app = express();

await bootstrap(express, app);
app.get("/", (req, res) => res.send("Welcome to Saraha App!"));
app.use(globalErrorHandler);
app.listen(3000, () => console.log(`Saraha App is running on port ${port}`));
