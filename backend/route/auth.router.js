import express from 'express';
import { login, logout, sendOtp, signup,resetPassword,VerifyOtp,googleAth } from '../controller/authController.js';

const authRouter=express.Router();

authRouter.post('/signup',signup);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post("/sendotp",sendOtp);
authRouter.post("/verifyotp",VerifyOtp);
authRouter.post("/resetpassword",resetPassword);
authRouter.post("/googleauth",googleAth)
export default authRouter;