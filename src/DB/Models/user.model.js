import mongoose from "mongoose";

export const gender = {
  male: "male",
  female: "female",
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: Object.values(gender),
        message:
          "{VALUE} is not a valid option, please choose either 'male' or 'female'",
      },
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
