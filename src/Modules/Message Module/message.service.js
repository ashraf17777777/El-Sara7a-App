import { messageModel } from "../../DB/models/message.model.js";
import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../../Services/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { body, receiver } = req.body;

  const user = await User.findById(receiver);
  if (!user) return next(new Error("User not found", { cause: 404 }));

  await messageModel.create({
    body,
    sender: req.user._id,
    receiver,
  });

  return res
    .status(201)
    .json({ success: true, message: "Message sent successfully" });
});

export const getSingleMessage = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const message = await messageModel.findById(req.params.id);

  if (!message) return next(new Error("Message not found", { cause: 404 }));

  const isReceiver = message.receiver.toString() === user._id.toString();
  const isSender = message.sender
    ? message.sender.toString() === user._id.toString()
    : false;

  if (!isReceiver && !isSender) {
    return next(
      new Error("You are not authorized to access this message", {
        cause: 403,
      }),
    );
  }

  return res.status(200).json({ success: true, message });
});

// المرة الأولى: بنسأل السيرفر: "هل اليوزر اللي فتح الرسالة حالياً هو الـ Receiver (المُستلِم)؟"

// المرة الثانية: بنسأل السيرفر: "هل اليوزر اللي فتح الرسالة حالياً هو الـ Sender (الراسل)؟"
