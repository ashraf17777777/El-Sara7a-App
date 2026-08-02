import joi from "joi";
import { Types } from "mongoose";

export const sendMessageSchema = joi
  .object({
    body: joi.string().required(),
    receiver: joi
      .custom((value, helper) => {
        if (Types.ObjectId.isValid(value)) return value;
        return helper.message("Invalid receiver id");
      })
      .required(),
  })
  .required();
