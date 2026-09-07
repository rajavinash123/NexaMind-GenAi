const { PDFParse } = require("pdf-parse");

const {generateInterviewReport,generateResumePdf} = require("../services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        // Resume is optional when the candidate provides a self description.
        const resumeFile = req.file;

        // Get self description and job description
        const { selfDescription, jobDescription } = req.body;

        // Validate required fields
        if (!jobDescription) {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        if (!resumeFile && !selfDescription?.trim()) {
            return res.status(400).json({
                message: "Upload a resume or provide a self description"
            });
        }

        // Parse PDF buffer and extract text
        let resumeContent = "";
        if (resumeFile) {
            const parser = new PDFParse({ data: resumeFile.buffer });
            const resumeData = await parser.getText();
            await parser.destroy();
            resumeContent = resumeData.text;
        }

        // Generate interview report using AI
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            jobDescription,
            selfDescription
        });

        // Always provide the required report title, even if the AI omits it.
        const title = interviewReportByAi.title || req.body.title ||
            `Interview Report - ${jobDescription.trim().slice(0, 60)}`;

        // Save generated report in MongoDB
        const interviewReport = await interviewReportModel.create({
            resume: resumeContent,
            selfDescription,
            jobDescription,

            // Add AI generated report fields
            ...interviewReportByAi,

            title,

            // Associate report with logged-in user
            user: req.user.id
        });

        // Send successful response
        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Generate interview report error:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

async function getInterviewReportByIdController(req,res){
    const{interviewId}=req.params;
    const interviewReport=await interviewReportModel.findOne({_id:interviewId,user:req.user.id})
    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        });
    }
    return res.status(200).json({
        message: "Interview report retrieved successfully",
        interviewReport
    });
}


async function getAllInterviewReportController(req,res){

const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select("-resume -selfDescription -jobDescription -__v")
    .lean();

return res.status(200).json({   
    message: "Interview reports retrieved successfully",
    interviewReports
});
}

async function generateResumePdfController(req,res){
    const {interviewReportId}=req.params;

    const interviewReport=await interviewReportModel.findOne({
        _id: interviewReportId,
        user: req.user.id
    })
    if(!interviewReport){
        return res.status(404).json({
            message:"interview report not found"
        })
    }

    const {resume,selfDescription,jobDescription}=interviewReport;
    const pdfBuffer=await generateResumePdf({resume,jobDescription,selfDescription})

    res.set({
        'Content-Type':"application/pdf",
        'Content-Disposition':`attachment; filename=resume_${interviewReportId}.pdf`
    })
    // Return the generated PDF as a downloadable binary response.
    return res.send(pdfBuffer)
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportController,
    generateResumePdfController
};
