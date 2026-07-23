import mongoose from "mongoose";
import { Types } from "mongoose";
export const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      required: true,
    },
    reciever: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", message);
