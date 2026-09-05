# NexaMind Backend

Express and MongoDB backend for NexaMind, an AI-powered interview preparation application. The API lets users create accounts, generate interview reports from a resume and job description, retrieve saved reports, and generate a tailored resume PDF.

## Features

- User registration and login
- JWT authentication stored in an HTTP cookie
- Logout with token blacklisting
- Resume PDF text extraction
- AI-generated interview reports using Google Gemini
- Saved interview reports in MongoDB
- AI-generated resume HTML converted to PDF with Puppeteer

## Requirements

- Node.js 18 or newer
- MongoDB database
- Google Gemini API key
- Chromium supported by Puppeteer

## Installation

From this directory:

```bash
npm install
```

The service imports `zod`, so install it if it is not already present in the project dependencies:

```bash
npm install zod
```

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/nexamind
JWT_SECURET=replace-with-a-long-random-secret
GOOGLE_GENAI_API_KEY=your-gemini-api-key
```

`JWT_SECURET` is the variable name currently used by the authentication code. Keep the spelling unchanged unless the application code is updated as well.

## Run the Server

Start the development server with:

```bash
npm start
```

The API is available at:

```text
http://localhost:3000
```

## Authentication

Registering or logging in sets a `token` cookie. Protected endpoints read this cookie automatically, so clients must preserve cookies between requests.

For `curl`, use `-c cookies.txt` when registering or logging in and `-b cookies.txt` on protected requests.

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Create a user account |
| `POST` | `/api/auth/login` | No | Log in and receive an auth cookie |
| `GET` | `/api/auth/logout` | No | Clear and blacklist the current auth cookie |
| `GET` | `/api/auth/get-me` | Yes | Get the currently authenticated user |

#### Register

```bash
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -c cookies.txt ^
  -d "{\"username\":\"Ava\",\"email\":\"ava@example.com\",\"password\":\"password123\"}"
```

#### Login

```bash
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -c cookies.txt ^
  -d "{\"email\":\"ava@example.com\",\"password\":\"password123\"}"
```

### Interview Reports

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/interview` | Yes | Generate and save an interview report |
| `GET` | `/api/interview` | Yes | Get all reports for the logged-in user |
| `GET` | `/api/interview/report/:interviewId` | Yes | Get one report owned by the logged-in user |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Yes | Generate and download a tailored resume PDF |

#### Generate an Interview Report

Send `multipart/form-data` with:

- `resume`: resume PDF file
- `jobDescription`: target job description
- `selfDescription`: optional candidate self-description

```bash
curl -X POST http://localhost:3000/api/interview ^
  -b cookies.txt ^
  -F "resume=@C:\path\to\resume.pdf" ^
  -F "jobDescription=Looking for a Node.js developer with MongoDB experience" ^
  -F "selfDescription=Backend developer building REST APIs with Node.js"
```

Resume uploads are stored in memory and are limited to 5 MB. The endpoint extracts the PDF text, sends the candidate information to Gemini, saves the generated report, and returns the report as JSON.

#### Get Reports

```bash
curl http://localhost:3000/api/interview -b cookies.txt
```

#### Get One Report

```bash
curl http://localhost:3000/api/interview/report/INTERVIEW_REPORT_ID -b cookies.txt
```

#### Download a Tailored Resume PDF

```bash
curl -X POST ^
  http://localhost:3000/api/interview/resume/pdf/INTERVIEW_REPORT_ID ^
  -b cookies.txt ^
  -o tailored-resume.pdf
```

The response has `Content-Type: application/pdf` and an attachment filename based on the report ID.

## Project Structure

```text
backend/
├── server.js                 # Application entry point
├── src/
│   ├── app.js                # Express app and route mounting
│   ├── config/database.js    # MongoDB connection
│   ├── controllers/          # Request handlers
│   ├── middlewares/          # Auth and file-upload middleware
│   ├── models/               # Mongoose models
│   ├── routers/              # API route definitions
│   └── services/             # Gemini and PDF generation services
├── .env                      # Local secrets, not committed
└── package.json
```

## Notes

- Do not commit `.env` or API keys.
- Protected requests require the `token` cookie created during registration or login.
- Gemini response generation requires a valid `GOOGLE_GENAI_API_KEY`.
- Puppeteer may download a browser during installation and needs permission to launch it in the runtime environment.
