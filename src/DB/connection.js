// ----------------------- 3rd File -----------------------

import mongoose from "mongoose";

// One Step
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/saraha-app");
  } catch (error) {
    console.log(error.message + " Database Down!");
  }
};

export default connectDB;
