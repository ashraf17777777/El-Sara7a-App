//          ---------------------4th File------------------------------

import mongoose from "mongoose";
import { Types } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true, // 👈 مسؤولة عن حذف المسافات الفاضية تلقائياً
    },
    sender: {
      type: Types.ObjectId,
      required: true,
      ref: "User", // 👈 هذا الحقل مرتبط بجدول المستخدمين
    },
    receiver: {
      type: Types.ObjectId,
      required: true,
      ref: "User", // 👈 هذا الحقل مرتبط بجدول المستخدمين
    },
  },
  {
    timestamps: true,
  },
);

export const messageModel = mongoose.model("Message", messageSchema);
