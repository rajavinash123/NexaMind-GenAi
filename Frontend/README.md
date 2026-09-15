# NexaMind – AI-Powered Interview Preparation Platform

NexaMind is an AI-powered interview preparation platform designed to help candidates prepare for technical and behavioral interviews based on their resume, job description, and self-description.

This repository contains the **frontend application** of NexaMind, built with React and Vite.

## 🚀 Features

- 🔐 User Login & Registration
- 🛡️ Protected Routes
- 👤 Authentication State Management
- 📄 Resume Upload
- 💼 Job Description Input
- 🧑‍💻 Self-Description Input
- 🤖 AI-Powered Interview Preparation
- 📝 Technical Interview Questions
- 💬 Behavioral Interview Questions
- 🗺️ Personalized Preparation Roadmap
- 📊 Resume–Job Match Score
- 🎯 Skill Gap Analysis
- 📑 Interview Reports
- 📥 Resume PDF Download
- 📱 Responsive UI

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

The frontend communicates with a separate Node.js/Express backend for:

- Authentication
- Resume processing
- AI interview generation
- Interview reports
- User data

### AI

- Google Gemini AI

### Database

- MongoDB

## 🏗️ Frontend Architecture

The frontend follows a layered architecture to keep UI, state management, business logic, and API communication separated.

```text
Components / Pages
        ↓
Custom Hooks
        ↓
Context / State Management
        ↓
API Services
        ↓
Backend API
frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   └── Interview.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useInterview.js
│   │
│   ├── services/
│   │   ├── api.auth.js
│   │   └── api.interview.js
│   │
│   ├── context/
│   │   └── auth.context.jsx
│   │
│   ├── routes/
│   │   └── Protected.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
