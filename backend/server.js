require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// const generateInterviewReport = require("./src/services/ai.services");

// const {
//     resume,
//     jobDescription,
//     selfDescription,
// } = require("./src/services/temp");

// // Generate interview report
// generateInterviewReport({
//     resume,
//     jobDescription,
//     selfDescription,
// })
//     .then((report) => {
//         console.log("Interview Report:");
//         console.log(JSON.stringify(report, null, 2));
//     })
//     .catch((error) => {
//         console.error("Interview Report Error:", error);
//     });

// Connect MongoDB
connectToDB();

// Start server
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});