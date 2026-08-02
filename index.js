// --------------------------- First File ----------------------------------------------

import express from "express";
import { bootstrap } from "./src/app.controller.js";
import dotenv from "dotenv";
import { globalErrorHandler } from "./src/Middlewares/globalErrorHandler.js";
// 1st step
dotenv.config();

// 2nd step
const app = express();
const port = 3000;

// 3rd step
await bootstrap(express, app);
app.get("/", (req, res) => res.send("Welcome to Saraha App!"));
app.use(globalErrorHandler);
app.listen(port, () => console.log(`Saraha App is running on port ${port}`));
