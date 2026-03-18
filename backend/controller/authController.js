import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import genToken from "../config/token.js";

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
        if(password.length<8){
            return res.status(400).json({message:"password must be at least 8 characters long"})
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
        res.status(200).json({message:"Login successful"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout=async(req,res)=>{
    try{
        res.cookie("token","",{
      maxAge:0
        })
        res.status(200).json({message:"Logout successful"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}