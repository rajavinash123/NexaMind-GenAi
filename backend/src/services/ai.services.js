// Install Gemini AI
// npm install @google/genai zod zod-to-json-schema

// Search Google Gemini AI documentation:
// https://ai.google.dev/gemini-api/docs

const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

// ======================================================
// INTERVIEW REPORT SCHEMA
// ======================================================

// Zod schema define karta hai ki Gemini se humein
// kis format mein interview report chahiye.

const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .describe(
            "A score between 0 and 100 indicating how well the candidate profile matches the job description"
        ),

    technicalQuestion: z.array(
        z.object({
            question: z
                .string()
                .describe(
                    "The technical question that can be asked in the interview"
                ),

            intention: z
                .string()
                .describe(
                    "The intention of the interviewer behind asking this question"
                ),

            answer: z
                .string()
                .describe(
                    "How to answer this question, what points to cover and what approach to take"
                ),
        })
    ).min(5),

    behaviourQuestion: z.array(
        z.object({
            question: z
                .string()
                .describe(
                    "The behavioral question that can be asked in the interview"
                ),

            intention: z
                .string()
                .describe(
                    "The intention of the interviewer behind asking this question"
                ),

            answer: z
                .string()
                .describe(
                    "How to answer this question, what points to cover and what approach to take"
                ),
        })
    ).min(5),

    skillGap: z.array(
        z.object({
            skill: z
                .string()
                .describe(
                    "The skill which the candidate is lacking"
                ),

            severity: z
                .enum(["low", "medium", "high"])
                .describe(
                    "The severity of the skill gap"
                ),
        })
    ).min(1),

    preparationPlan: z.array(
        z.object({
            day: z
                .number()
                .describe(
                    "The day number in the preparation plan starting from 1"
                ),

            focus: z
                .string()
                .describe(
                    "The main focus of this day, for example data structures"
                ),

            tasks: z
                .array(z.string())
                .describe(
                    "List of tasks to be completed on this day"
                )
        })
    ).min(5),

    title: z
        .string()
        .describe("Title of the job for which the interview report is generated"),
});

const interviewReportResponseSchema = {
    type: "object",
    properties: {
        matchScore: { type: "number", minimum: 0, maximum: 100 },
        technicalQuestion: {
            type: "array",
            minItems: 5,
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behaviourQuestion: {
            type: "array",
            minItems: 5,
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    severity: { type: "string", enum: ["low", "medium", "high"] }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            minItems: 5,
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: { type: "array", items: { type: "string" } }
                },
                required: ["day", "focus", "tasks"]
            }
        },
        title: { type: "string" }
    },
    required: [
        "matchScore",
        "technicalQuestion",
        "behaviourQuestion",
        "skillGap",
        "preparationPlan",
        "title"
    ]
};

// ======================================================
// GEMINI AI INSTANCE
// ======================================================

// Gemini AI ka instance create kar rahe hain.
// API key .env file se aa rahi hai.

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ======================================================
// TEST GEMINI AI
// ======================================================

// Ye function check karne ke liye hai ki Gemini AI
// properly work kar raha hai ya nahi.

// async function invokeGeminiAi() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",

//         contents: "Hello Gemini! Explain what is an interview?",
//     });

//     console.log(response.text);
// }

// ======================================================
// GENERATE INTERVIEW REPORT
// ======================================================

// Resume, job description aur self description ke basis par
// AI interview report generate karega.

async function generateInterviewReport({
    resume,
    jobDescription,
    selfDescription,
}) {
    // Gemini ko complete candidate information provide kar rahe hain.

    const prompt = `
You are an expert technical interviewer.

Generate a complete interview preparation report based on the candidate's
resume, job description and self description.

Candidate Resume:
${resume}

Job Description:
${jobDescription}

Candidate Self Description:
${selfDescription}

Generate:

1. A match score between 0 and 100 indicating how well the candidate
   matches the job description.

2. Generate at least 5 technical interview questions.
   For every technical question:
   - Provide the interview question.
   - Explain the interviewer's intention.
   - Explain how the candidate should answer.
   - Mention important points that should be covered.

3. Generate at least 5 behavioral interview questions.
   For every behavioral question:
   - Provide the interview question.
   - Explain the interviewer's intention.
   - Explain how the candidate should answer.
   - Mention important points that should be covered.

4. Identify at least 1 candidate skill gap. If the candidate is strong in
every listed skill, identify a reasonable improvement area instead.
   For every skill gap:
   - Mention the missing skill.
   - Assign severity as low, medium, or high.

5. Create a day-wise preparation plan with at least 5 days.
   For every day:
   - Provide the day number.
   - Provide the main focus.
   - Provide a list of tasks.

Return only the requested JSON structure.
`;

    // Gemini ko request bhej rahe hain.

    const requestConfig = {
        contents: prompt,

        config: {
            responseMimeType: "application/json",

            responseSchema: interviewReportResponseSchema,
        },
    };

    let response;

    try {
        response = await ai.models.generateContent({
            ...requestConfig,
            model: "gemini-3.6-flash",
        });
    } catch (error) {
        const errorMessage = error.message || "";
        const isTemporaryModelError =
            errorMessage.includes('"code":503') ||
            errorMessage.includes("UNAVAILABLE");

        if (!isTemporaryModelError) {
            throw error;
        }

        response = await ai.models.generateContent({
            ...requestConfig,
            model: "gemini-3.6-flash",
        });
    }

    // Gemini ka JSON response receive karna.

    const report = JSON.parse(response.text);

    // Generated interview report return karna.

    return report;
}

// ======================================================
// EXPORT
// ======================================================

module.exports =  generateInterviewReport
