import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

export const signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        let exitUser=await User.findOne({email})
        if(exitUser){
            return res.status(400).json({message:"User alerady exits"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"please provide a valid email"})
        }
        const hashPassword=await bcrypt.hash(password,10);
           const user=await User.create({
            name,
            email,
            password:hashPassword,
            role
        })
        const token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })
        res.status(201).json({message:"User created successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password"})
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
       const token= await genToken(user._id)
       res.cookie("token",token,{
        httpOnly:true,
        secure:false,    
        sameSite:"lax",
        maxAge:7*24*60*60*1000
       })
 res.status(200).json({ 
    message: "Login successful", 
    user: user 
});
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout=async(req,res)=>{
    try{
       res.cookie("token", "", {
  httpOnly: true,
  expires: new Date(0),
});
        res.status(200).json({message:"Logout successful"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log("STEP 2");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("STEP 3");
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    console.log("STEP 4");
    await sendMail(email, otp); 
    console.log("STEP 5");
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("FINAL ERROR ❌", error);
    return res.status(500).json({ message: "Send OTP error" });
  }
};

export const VerifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; 
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Password reset failed" });
  }
};

export const googleAth=async(req,res)=>{
  try {
    const {email,name,role}=req.body;
    const user=await User.findOne({email});
    if(!user){
user=await User.create({
  name,
  email,
  role
})
    }
    const token=await genToken(user.id)
    res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"Lax",
      maxAge:7*24*60*60*1000
    })
    return res.status(200).json({
      message: "Google Authentication successful",
      user: user
    });
  } catch (error) {
    return res.status(401).json({message:"googleUthentication error"})
  }
}