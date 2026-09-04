const { default: mongoose } = require("mongoose");

// =====================================================
// Technical Question Schema
// =====================================================

const technicalQuestionSchema = new mongoose.Schema(
    {
        // Technical interview question
        question: {
            type: String,
            required: [true, "Technical question is required"]
        },

        // Why this question is important
        intention: {
            type: String,
            required: [true, "Intention is required"]
        },

        // Expected answer
        answer: {
            type: String,
            required: [true, "Answer is required"]
        }
    },
    {
        // Don't create _id for sub-document
        _id: false
    }
);


// =====================================================
// Behaviour Question Schema
// =====================================================

const behaviourQuestionSchema = new mongoose.Schema(
    {
        // Behavioural interview question
        question: {
            type: String,
            required: [true, "Behaviour question is required"]
        },

        // Purpose of asking this question
        intention: {
            type: String,
            required: [true, "Intention is required"]
        },

        // Expected answer
        answer: {
            type: String,
            required: [true, "Answer is required"]
        }
    },
    {
        // Don't create _id for sub-document
        _id: false
    }
);


// =====================================================
// Skill Gap Schema
// =====================================================

const skillGapSchema = new mongoose.Schema(
    {
        // Skill where user has a gap
        skill: {
            type: String,
            required: [true, "Skill is required"]
        },

        // Severity of skill gap
        severity: {
            type: String,

            // Allowed values
            enum: ["low", "medium", "high"],

            required: [true, "Severity is required"]
        }
    },
    {
        // Don't create _id for sub-document
        _id: false
    }
);


// =====================================================
// Preparation Plan Schema
// =====================================================

const preparationSchema = new mongoose.Schema(
    {
        // Preparation day
        day: {
            type: Number,
            required: [true, "Day is required"]
        },

        // Main focus of the day
        focus: {
            type: String,
            required: [true, "Focus is required"]
        },

        // Tasks for that day
        tasks: [
            {
                type: String
            }
        ]
    },
    {
        // Don't create _id for sub-document
        _id: false
    }
);


// =====================================================
// Main Interview Report Schema
// =====================================================

const interviewReportSchema = new mongoose.Schema(
    {
        // Job description provided by user
        jobDescription: {
            type: String,
            required: [true, "Job description is required"]
        },

        // Extracted resume text
        resume: {
            type: String
        },

        // User's self description
        selfDescription: {
            type: String
        },

        // Resume and job matching score
        matchScore: {
            type: Number,
            min: 0,
            max: 100
        },

        // Technical interview questions
        technicalQuestion: [
            technicalQuestionSchema
        ],

        // Behavioural interview questions
        behaviourQuestion: [
behaviourQuestionSchema        ],

        // Skills where user has gaps
        skillGap: [
            skillGapSchema
        ],

        // Preparation plan
        preparationPlan: [
            preparationSchema
        ],

        // User who generated this interview report
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User ID is required"]
        },
        title:{
            type:String,
            required:[true,"title is required"]
        }
    },
    {
        // Automatically add createdAt and updatedAt
        timestamps: true
    }
);


// =====================================================
// Interview Report Model
// =====================================================

const interviewReportModel =
    mongoose.models.interviewReport ||
    mongoose.model("interviewReport", interviewReportSchema);


// =====================================================
// Export Model
// =====================================================

module.exports = interviewReportModel;