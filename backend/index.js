import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRouter.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT=process.env.PORT || 8000
const app=express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/api/auth',authRouter)
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
