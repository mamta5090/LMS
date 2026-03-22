import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP ERROR ❌", err);
  } else {
    console.log("SMTP READY ✅");
  }
});

const sendMail = async (to, otp) => {
  try {
    console.log("SENDING MAIL TO:", to);
    
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to,
      subject: "Reset your password",
      text: `Your OTP is ${otp}`,
    });

    console.log("EMAIL SENT ✅");
  } catch (error) {
    console.log("MAIL ERROR ❌", error);
    throw error;
  }
};

export default sendMail;