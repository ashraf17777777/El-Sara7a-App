import jwt from "jsonwebtoken";
import User from "../DB/Models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized, No token provided", status: "failed" });
    }
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "failed" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message + "Invalid or expired token",
      stack: error.stack,
      status: "failed",
    });
  }
};
