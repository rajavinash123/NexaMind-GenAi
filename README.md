# 🧠 NexaMind – AI-Powered Interview Preparation Platform

NexaMind is an AI-powered interview preparation platform that helps candidates get interview-ready based on their **resume**, **target job description**, and **self-description**. It generates tailored interview reports, technical and behavioral questions, a personalized preparation roadmap, resume–job match scoring, skill gap analysis, and a downloadable tailored resume PDF.

This repository contains **both the frontend (React + Vite) and backend (Node.js + Express + MongoDB)** for NexaMind.

---

## 🚀 Features

- 🔐 User registration & login (JWT auth via HTTP-only cookie)
- 🛡️ Protected routes and authenticated endpoints
- 👤 Authentication state management
- 📄 Resume upload & PDF text extraction
- 💼 Job description input
- 🧑‍💻 Self-description input
- 🤖 AI-powered interview preparation (Google Gemini)
- 📝 Technical interview questions
- 💬 Behavioral interview questions
- 🗺️ Personalized preparation roadmap
- 📊 Resume–job match score
- 🎯 Skill gap analysis
- 📑 Saved interview reports
- 📥 AI-generated, tailored resume PDF download
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript (ES6+)
- Context API
- Custom React Hooks
- Fetch/API Services

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication (HTTP cookie) with logout token blacklisting
- Zod for validation
- Puppeteer (HTML → PDF generation)

### AI
- Google Gemini API

### Database
- MongoDB

---

## 🏗️ Architecture Overview

```text
Components / Pages
        ↓
Custom Hooks
        ↓
Context / State Management
        ↓
API Services
        ↓
Backend API (Express)
        ↓
MongoDB + Google Gemini + Puppeteer
```

---

## 📁 Project Structure

```text
nexamind/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Interview.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useInterview.js
│   │   ├── services/
│   │   │   ├── api.auth.js
│   │   │   └── api.interview.js
│   │   ├── context/
│   │   │   └── auth.context.jsx
│   │   ├── routes/
│   │   │   └── Protected.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── server.js
    ├── src/
    │   ├── app.js
    │   ├── config/database.js
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── routers/
    │   └── services/
    ├── .env
    └── package.json
```

---

## ⚙️ Requirements

- Node.js 18+
- MongoDB database
- Google Gemini API key
- Chromium supported by Puppeteer

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nexamind.git
cd nexamind
```

### 2. Backend setup

```bash
cd backend
npm install
npm install zod
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/nexamind
JWT_SECURET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=your-gemini-api-key
```

> ⚠️ `JWT_SECURET` is the exact variable name used by the auth code — keep the spelling as-is unless you also update the application code.

Start the backend:

```bash
npm start
```

Backend runs at:

```text
http://localhost:3000
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Authentication

Registering or logging in sets a `token` HTTP-only cookie. Protected endpoints read this cookie automatically — clients must preserve cookies between requests.

For `curl`, use `-c cookies.txt` when registering/logging in, and `-b cookies.txt` on protected requests.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | No | Create a user account |
| `POST` | `/api/auth/login` | No | Log in and receive an auth cookie |
| `GET`  | `/api/auth/logout` | No | Clear and blacklist the current auth cookie |
| `GET`  | `/api/auth/get-me` | Yes | Get the currently authenticated user |

**Register**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"Ava","email":"ava@example.com","password":"password123"}'
```

**Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"ava@example.com","password":"password123"}'
```

### Interview Reports

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/interview` | Yes | Generate and save an interview report |
| `GET`  | `/api/interview` | Yes | Get all reports for the logged-in user |
| `GET`  | `/api/interview/report/:interviewId` | Yes | Get one report owned by the logged-in user |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Yes | Generate and download a tailored resume PDF |

**Generate an Interview Report**

Send `multipart/form-data` with:
- `resume` — resume PDF file
- `jobDescription` — target job description
- `selfDescription` — optional candidate self-description

```bash
curl -X POST http://localhost:3000/api/interview \
  -b cookies.txt \
  -F "resume=@/path/to/resume.pdf" \
  -F "jobDescription=Looking for a Node.js developer with MongoDB experience" \
  -F "selfDescription=Backend developer building REST APIs with Node.js"
```

Resume uploads are stored in memory and limited to 5 MB. The endpoint extracts the PDF text, sends candidate info to Gemini, saves the generated report, and returns it as JSON.

**Get All Reports**

```bash
curl http://localhost:3000/api/interview -b cookies.txt
```

**Get One Report**

```bash
curl http://localhost:3000/api/interview/report/INTERVIEW_REPORT_ID -b cookies.txt
```

**Download a Tailored Resume PDF**

```bash
curl -X POST \
  http://localhost:3000/api/interview/resume/pdf/INTERVIEW_REPORT_ID \
  -b cookies.txt \
  -o tailored-resume.pdf
```

Response has `Content-Type: application/pdf` with an attachment filename based on the report ID.

---

## 📝 Notes

- Do not commit `.env` files or API keys.
- Protected requests require the `token` cookie created during registration or login.
- Gemini report generation requires a valid `GOOGLE_GENAI_API_KEY`.
- Puppeteer may download a browser during install and needs permission to launch it at runtime.

---

## 🗺️ Roadmap Ideas

- [ ] Dark mode
- [ ] Multi-language support
- [ ] Interview practice with voice input
- [ ] Team/organization accounts

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a PR or an issue.

---

## 📄 License

This project is licensed under the MIT License.
