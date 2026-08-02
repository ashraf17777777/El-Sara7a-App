import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendEmail = async (destEmail, userName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const token = jwt.sign({ email: destEmail }, process.env.JWT_SECRET_KEY);
  const link = `http://localhost:3000/user/activate/${token}`;

  console.log("=== ACTIVATION LINK ===");
  console.log(link);
  console.log("=======================");

  const info = await transporter.sendMail({
    from: "'Ashraf Dya' <ashrafdya663@gmail.com>",
    to: destEmail,
    subject: "Account Activation",
    text: `Hello ${userName}, please activate your account!`,
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 20px;">
        <h2>Hello ${userName}! 👋</h2>
        <p>Welcome to Saraha App. Please click the button below to activate your account:</p>
        <br/>
        <a href="${link}" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Activate Account</a>
        <br/><br/>
        <small>If the button doesn't work, copy this link: ${link}</small>
      </div>
    `,
  });
  console.log(info);
  return info;
};
