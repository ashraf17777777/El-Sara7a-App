import jwt from "jsonwebtoken";
import User from "../DB/Models/user.model.js";
import { asyncHandler } from "../Services/asyncHandler.js```````````";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  // 1st step
  const { authorization } = req.headers;
  // 2nd step
  if (!authorization?.startsWith("Bearer ")) {
    const error = new Error("Unauthorized, No token provided");
    error.statusCode = 401;
    return next(error); // 👈 بيبعت للـ Global Error Handler أوتوماتيك
  }

  // 3rd step
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 4th step
  const user = await User.findById(id).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  // 5th step
  req.user = user;
  next();
});
