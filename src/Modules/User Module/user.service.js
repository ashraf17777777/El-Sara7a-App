import User from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { sendEmail } from "../../Services/email.service.js";
import { asyncHandler } from "../../Services/asyncHandler.js";

export const registerLogic = asyncHandler(async (req, res, next) => {
  const { email, password, phoneNumber, gender, username, confirmedPassword } =
    req.body;
  if (password !== confirmedPassword) {
    const error = new Error("Password and Confirmed Password do not match");
    error.statusCode = 400;
    return next(error);
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);
  const crypt = CryptoJS.AES.encrypt(
    phoneNumber,
    process.env.SECRET_KEY,
  ).toString();
  const user = await User.create({
    email,
    password: hash,
    phoneNumber: crypt,
    gender,
    username,
  });

  await sendEmail(email, username);

  res
    .status(201)
    .json({ success: true, message: "User registered successfully", user });
});

export const activate = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  user.isActivated = true;
  await user.save();

  res
    .status(200)
    .json({ message: "Account activated successfully", success: true });
});

export const loginLogic = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    return next(error);
  }

  if (!user.isActivated) {
    const error = new Error("Account not activated");
    error.statusCode = 403;
    return next(error);
  }

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY);
  res
    .status(200)
    .json({ success: true, message: "User logged in successfully!", token });
});

export const profile = asyncHandler(async (req, res, next) => {
  let { user } = req;
  user.phoneNumber = CryptoJS.AES.decrypt(
    user.phoneNumber,
    process.env.SECRET_KEY,
  ).toString(CryptoJS.enc.Utf8);
  res
    .status(200)
    .json({ success: true, message: "Profile retrieved successfully", user });
});
