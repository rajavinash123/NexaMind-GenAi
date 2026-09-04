# 🤖 AI-Powered Resume & Interview Analysis Platform

An AI-powered full-stack web application that analyzes resumes against job descriptions, extracts candidate skills, detects skill gaps, generates interview reports, and creates ATS-optimized resumes as downloadable PDF files.

---

## 🚀 Features

### 🔐 Secure Authentication

* User registration and login
* Password hashing with `bcryptjs`
* JWT-based authentication
* HTTP-only cookies
* Authentication middleware
* Protected routes
* Secure logout
* JWT token blacklisting

### 📄 Resume Analysis

* Upload resume in PDF format
* Extract resume text
* Analyze candidate skills
* Compare resume with job description
* Identify missing skills
* Generate personalized recommendations

### 🧠 Generative AI Integration

* Google Gemini API integration
* AI-powered resume analysis
* Skill extraction
* Skill-gap detection
* ATS optimization
* Interview report generation
* AI-generated recommendations
* Structured AI responses

### 📊 Interview Reports

* Generate AI-based interview reports
* Store reports in MongoDB
* Retrieve reports by ID
* View previous/recent reports
* User-specific report management

### 📑 ATS Resume Generation

* Generate optimized resume content using AI
* Convert dynamic HTML into PDF
* Puppeteer-based PDF generation
* Downloadable resume

---

# 🏗️ System Architecture

```text
                         ┌──────────────────┐
                         │    React.js      │
                         │    Frontend      │
                         └────────┬─────────┘
                                  │
                                Axios
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   Express.js     │
                         │    REST API      │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
        Controllers          Middleware           Services
              │                   │                   │
              │                   ▼                   ▼
              │             JWT Auth            Gemini AI
              │             Multer              PDF Logic
              │
              ▼
           Mongoose
              │
              ▼
        MongoDB Atlas
```

---

# 🧠 GenAI Workflow

The main AI pipeline works like this:

```text
Resume PDF
    │
    ▼
Resume Parsing
    │
    ▼
Extract Resume Text
    │
    ├───────────────┐
    │               │
    ▼               ▼
Job Description   Self Description
    │               │
    └───────┬───────┘
            ▼
        Gemini AI
            │
            ▼
    AI Analysis
            │
    ┌───────┼────────┐
    │       │        │
    ▼       ▼        ▼
 Skills   Skill    ATS
          Gaps    Analysis
    │       │        │
    └───────┼────────┘
            ▼
    Interview Report
            │
            ▼
   AI Resume Generation
            │
            ▼
      HTML Template
            │
            ▼
        Puppeteer
            │
            ▼
        Resume PDF
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* Context API
* Custom Hooks

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* Zod
* dotenv
* cookie-parser

## Generative AI

* Google Gemini API
* Prompt Engineering
* Structured AI Responses
* AI Skill Extraction
* AI Skill Gap Detection
* AI Resume Generation

## PDF Generation

* Puppeteer
* HTML/CSS Resume Templates

## Development Tools

* Postman
* Git
* GitHub
* VS Code
* MongoDB Atlas

---

# 📦 Backend Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cookies-parser": "^1.2.0",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.9.4",
  "multer": "^2.3.0"
}
```

Additional dependencies such as Zod, Gemini SDK/API client, Puppeteer and Axios are used according to the implementation.

---

# 📁 Project Structure

```text
project-root/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │
│   │   ├── controllers/
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── utils/
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# 🔐 Authentication Flow

## Register

```text
User
 │
 ▼
Register Form
 │
 ▼
POST /auth/register
 │
 ▼
Validate User Data
 │
 ▼
Hash Password
 │
 ▼
Save User → MongoDB
 │
 ▼
Generate JWT
 │
 ▼
HTTP-only Cookie
```

## Login

```text
User
 │
 ▼
Login
 │
 ▼
Find User
 │
 ▼
Compare Password
 │
 ▼
Generate JWT
 │
 ▼
Set Cookie
 │
 ▼
Authenticated User
```

---

# 🚪 JWT Token Blacklisting

JWT tokens are normally stateless. To invalidate a token immediately after logout, this project maintains a blacklist collection.

### Logout

```text
JWT Cookie
    │
    ▼
Logout Request
    │
    ▼
Extract Token
    │
    ▼
Save Token → Blacklist Collection
    │
    ▼
Clear Cookie
```

### Protected Request

```text
Request
   │
   ▼
Extract JWT
   │
   ▼
Verify JWT
   │
   ▼
Check Blacklist
   │
   ├── Token Blacklisted → ❌ Reject
   │
   └── Token Valid → ✅ Continue
```

---

# 🗄️ Database Models

## User Model

```text
User
├── name
├── email
├── password
├── createdAt
└── updatedAt
```

Passwords are securely hashed before storing them in MongoDB.

## Blacklist Model

```text
BlacklistedToken
├── token
├── createdAt
└── updatedAt
```

## Interview Report Model

```text
InterviewReport
├── user
├── resume
├── jobDescription
├── selfDescription
├── extractedSkills
├── matchedSkills
├── missingSkills
├── analysis
├── recommendations
└── createdAt
```

---

# 📄 Resume Processing

The resume processing pipeline uses file upload and PDF parsing.

```text
PDF Resume
    │
    ▼
Multer
    │
    ▼
PDF Buffer
    │
    ▼
PDF Parser
    │
    ▼
Extracted Text
    │
    ▼
Gemini AI
```

---

# 🧠 Skill Gap Detection

The application compares the skills extracted from the candidate's resume with the skills required by the job description.

### Example

**Candidate Skills**

```text
JavaScript
React.js
Node.js
Express.js
MongoDB
```

**Required Skills**

```text
JavaScript
React.js
Node.js
Express.js
MongoDB
Docker
Redis
AWS
```

### Result

```text
Matched Skills:
✓ JavaScript
✓ React.js
✓ Node.js
✓ Express.js
✓ MongoDB

Missing Skills:
✗ Docker
✗ Redis
✗ AWS
```

Gemini can then generate recommendations for improving the candidate's skill set.

---

# 🎯 ATS Optimization

The AI analyzes the resume against the job description and identifies areas that can improve ATS compatibility.

The analysis can include:

* Keyword matching
* Missing job-specific keywords
* Technical skill coverage
* Resume structure
* Experience relevance
* Section completeness
* Job-description alignment
* Resume improvement suggestions

---

# 📊 Interview Report

The application generates a structured AI report based on:

```text
Resume
+
Job Description
+
Self Description
```

The report can contain:

```text
Candidate Summary
Technical Skills
Matched Skills
Missing Skills
Strengths
Weaknesses
Interview Questions
ATS Analysis
Recommendations
Overall Assessment
```

---

# 📑 Resume Generation with Puppeteer

The AI-generated resume content is converted into an HTML template.

```text
AI Resume Data
      │
      ▼
HTML Resume Template
      │
      ▼
Puppeteer
      │
      ▼
PDF Buffer
      │
      ▼
Download Resume
```

Puppeteer allows the backend to generate a consistent PDF from the dynamically generated HTML/CSS resume.

---

# 🔌 API Endpoints

Example API structure:

## Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

## Interview

```http
POST /interview/generate
GET  /interview
GET  /interview/:id
```

## Resume

```http
POST /resume/generate-pdf
```

> Route names can be modified according to the final backend implementation.

---

# ⚙️ Environment Variables

Create a `.env` file in the backend:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

**Never commit your `.env` file or API keys to GitHub.**

Add:

```text
.env
node_modules/
```

to `.gitignore`.

---

# 🚀 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

```bash
cd your-repository
```

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

The application should now be available through your local Vite development server.

---

# 🧪 API Testing

The backend APIs can be tested using **Postman**.

Recommended testing sequence:

```text
1. Register
      ↓
2. Login
      ↓
3. Get Current User
      ↓
4. Upload Resume
      ↓
5. Generate AI Report
      ↓
6. Get Report
      ↓
7. Generate Resume PDF
      ↓
8. Logout
      ↓
9. Verify Token Is Blacklisted
```

---

# 🔒 Security Practices

The application follows several security practices:

* Password hashing using bcrypt
* JWT authentication
* HTTP-only cookies
* JWT token blacklisting
* Protected API routes
* Authentication middleware
* Input validation
* Environment variables
* CORS configuration
* File upload validation
* Separation of controllers and services

---

# 🧩 Architecture Principles

The backend follows a layered architecture:

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Models
  ↓
MongoDB
```

This separation makes the application:

* Easier to maintain
* Easier to test
* Easier to debug
* More scalable
* Easier to extend

---

# 📚 GenAI Concepts Demonstrated

This project demonstrates practical implementation of several Generative AI concepts:

* Large Language Model integration
* Prompt engineering
* Structured AI output
* Context-based AI analysis
* Resume information extraction
* Skill extraction
* Semantic skill comparison
* Skill gap detection
* AI-generated recommendations
* AI-generated resume content
* ATS optimization
* AI-assisted interview preparation

---

# 🔮 Future Improvements

Possible future features:

* AI mock interview
* Voice-based interview
* Real-time interview feedback
* Resume version management
* Multiple resume templates
* Job recommendation engine
* LinkedIn profile analysis
* Learning roadmap generation
* Redis caching
* Background AI processing
* Cloud file storage
* Docker deployment
* CI/CD pipeline
* Rate limiting
* Refresh-token rotation
* Admin dashboard

---

# 👨‍💻 Author

**Avinash Kumar**

B.Tech Computer Science Engineering
Gulzar Group of Institutions

### Technologies

```text
React.js
Node.js
Express.js
MongoDB
JavaScript
Gemini AI
JWT
Puppeteer
Git
Docker
```

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is created for educational, portfolio, and development purposes.
