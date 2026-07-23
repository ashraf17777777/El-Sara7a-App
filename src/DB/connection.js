import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/saraha-app");
  } catch (error) {
    console.log(error.message + " Database Down!");
  }
};

export default connectDB;
