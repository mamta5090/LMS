import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './route/auth.router.js';
import userRouter from './route/user.router.js';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();

const PORT=process.env.PORT || 8000;
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
