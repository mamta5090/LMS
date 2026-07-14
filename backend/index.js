import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./route/auth.router.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./route/user.router.js"
import courseRouter from "./route/courseRouter.js"
import paymentRouter from "./route/paymentRoute.js"
import aiRouter from "./route/aiRoute.js"
import reviewRouter from "./route/reviewRoute.js"
dotenv.config()

let port = process.env.PORT
let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)


app.get("/" , (req,res)=>{
    res.send("Hello From Server")
})

app.listen(port , ()=>{
    console.log("Server Started")
    connectDb()
})

