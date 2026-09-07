// this file used only app init

const express = require("express")
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router')

const interviewRouter=require("./routers/interview.routes")
const cors=require("cors")
const app = express();


// Use cookie-parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: /^http:\/\/localhost:\d+$/,
    credentials:true
}))

app.use("/api/auth", authRouter)

app.use("/api/interview",interviewRouter)

module.exports = app;