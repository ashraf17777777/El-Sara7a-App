import { joi } from "joi";
import { Types } from "mongoose";

const sendMessageSchema = joi
  .object({
    body: joi.string().required(),
    receiver: joi
      .custom((value, helper) => {
        if (Types.ObjectId.isValid(value)) return true;
        return helper.message("Invalid receiver id");
      })
      .required(),
  })
  .required();
