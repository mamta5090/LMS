import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    discription:{
        type:String,
    },
    role:{
        type:String,
        enum:["student","educator"],
        required:true,
        default:"student"
    },
    photoUrl:{
        type:String,
        default:""
    },
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified :{
        type:Boolean,
        default:false
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User;