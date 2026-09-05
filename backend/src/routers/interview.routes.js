const express=require("express")
const authMiddlware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const interviewRouter=express.Router()
const upload = require("../middlewares/file.middleware")
// Generate an interview report from the description, resume PDF, and job description.


//get/api/interview/:interviewId
//get interview report by id
interviewRouter.get("/report/:interviewId", authMiddlware.authUser,interviewController.getInterviewReportByIdController)

interviewRouter.post("/",authMiddlware.authUser,upload.uploadResume,interviewController.generateInterviewReportController)


//get/api/interview/
//get all interview report of login user
interviewRouter.get("/", authMiddlware.authUser,interviewController.getAllInterviewReportController)

//get /api/interview/resume/pdf

interviewRouter.post("/resume/pdf/:interviewReportId", authMiddlware.authUser,interviewController.generateResumePdfController)

module.exports=interviewRouter;