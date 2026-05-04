export const projectsInfo = [
    {
        title: 'AI-enabled Smart Blood Donation System',
        readme: `# 🩸 AI-Powered Blood Donation & Matching System

An intelligent platform that connects **blood donors, recipients, and hospitals** using **Artificial Intelligence and geolocation services**. The system predicts optimal donor-recipient matches based on **blood type, medical compatibility, and location**, helping hospitals respond faster during emergencies.

---

## 📌 Problem Statement

Blood donation systems often face challenges such as:

- Difficulty finding compatible donors quickly
- Lack of real-time donor availability
- Inefficient communication between hospitals and donors
- Delays during emergency blood requirements

This project addresses these issues by integrating **Machine Learning, geolocation APIs, and a modern web architecture** to improve blood donation efficiency.

---

## 💡 Solution

The AI-Powered Blood Donation System provides:

- Intelligent donor-recipient matching
- Real-time hospital blood requests
- Location-based donor discovery
- Secure donor registration
- Transparent blood donation records

---

## 🧠 Machine Learning Model

The project uses a **Random Forest Classifier** to predict the best donor-recipient matches based on:

- Blood type compatibility
- Donor medical history
- Donor availability
- Distance between donor and hospital

---

## ⚙️ Technology Stack

### Frontend
- React.js
- HTML, CSS, JavaScript

### Backend
- FastAPI, Flask

### Machine Learning
- Python, Scikit-learn, Random Forest, Pandas, NumPy

### APIs
- Positionstack API (Geolocation)

### Security
- Blockchain for secure and transparent donation records`,
        demoLink: '#'
    },
    {
        title: 'Generative AI Chatbot',
        readme: `# 🤖 Generative AI Chatbot with Voice and Image Integration

## 📌 Project Overview

This project is a **Generative AI Chatbot Web Application** that allows users to interact with an AI assistant using **text, voice, and image inputs**.
The chatbot uses **Transformer-based language models** to generate intelligent responses and integrates **speech processing and image understanding** for a multimodal AI experience.

The application is built using **Python, Streamlit, HuggingFace Transformers, and PyTorch**.

---

## 🚀 Features

### 💬 Text Chat
Users can ask questions through text input and receive AI-generated responses.

### 🎤 Voice Interaction
- Upload voice input (WAV/MP3)
- Speech to text conversion
- AI processes the query
- Response converted back to speech

### 🖼 Image Understanding
Users can upload images and the AI will analyze them using a **CLIP vision-language model**.

---

## 🧠 Technologies Used
- Python, Streamlit
- HuggingFace Transformers
- GPT, CLIP, PyTorch
- SpeechRecognition, gTTS`,
        demoLink: '#'
    },
    {
        title: 'FinPilot: Autonomous Finance System',
        readme: `# FinPilot

FinPilot is a full-stack autonomous finance system with:
- A **FastAPI backend** that runs a multi-agent financial decision cycle.
- A **Next.js frontend** that handles auth, setup, run execution, replay, dashboard, and investment views.

---

## 1) Architecture (High-Level)

### Backend (\`backend/\`)
- API server: \`backend/app/main.py\`
- Core orchestration graph: \`backend/app/orchestrator/graph.py\`
- Agent nodes and logic: \`backend/app/agents/\`
- Persistence: SQLite via SQLAlchemy (\`backend/app/db/\`)
- Auth: JWT + optional Google OAuth (\`backend/app/auth/\`)

### Frontend (\`frontend/\`)
- Framework: Next.js App Router
- API client: \`frontend/services/api.ts\`
- Auth/session context: \`frontend/context/AuthContext.tsx\`
- Core pages: landing (\`/\`), auth (\`/auth\`), setup (\`/setup\`), dashboard (\`/dashboard\`), runs/replay/investments/logs/settings

---

## 2) Prerequisites

- **Python** 3.11.x
- **Node.js** 20+ (recommended)
- **npm** (comes with Node)
- OS: Windows/macOS/Linux (commands below include Windows PowerShell examples)

---

## 3) Environment Variables

## Backend env (\`.env\` in repo root)

Create \`.env\` at project root (you can start from \`example.env\`):

\`\`\`env
OPENROUTER_API_KEY=
JWT_SECRET_KEY=replace_with_long_random_secret
JWT_EXPIRE_HOURS=24
GOOGLE_CLIENT_ID=
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ENV=local
\`\`\`

Notes:
- \`JWT_SECRET_KEY\` is required for auth token creation/validation.
- \`OPENROUTER_API_KEY\` is optional (LLM advice gracefully falls back when missing).
- \`GOOGLE_CLIENT_ID\` is required only if you want Google sign-in.

---

## 4) Step-by-Step Run (Local Development)

Use **two terminals**.

## Step A — Install Python dependencies

From project root:

\`\`\`powershell
python -m venv venv
& .\\venv\\Scripts\\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
\`\`\`

## Step B — Start backend (Terminal 1)

\`\`\`powershell
& .\\venv\\Scripts\\Activate.ps1
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

## Step C — Install frontend dependencies

In another terminal:

\`\`\`powershell
cd frontend
npm install
\`\`\`

## Step D — Start frontend (Terminal 2)

\`\`\`powershell
cd frontend
npm run dev
\`\`\`

---

## 5) Typical User Flow

1. Open \`http://localhost:3000\`
2. Register/login in \`/auth\`
3. Go to \`/setup\` and provide financial profile (manual or sandbox bank flow)
4. Run autonomy cycle
5. Review:
	 - \`/dashboard\` for summary
	 - \`/runs\` and \`/replay/{runId}\` for run history and replay
	 - \`/investments\` for holdings/performance
	 - \`/logs\` for ledger-oriented traces`,
        demoLink: '#'
    },
    {
        title: 'PROACT-SAFE: Intelligent Firearm Threat Monitoring',
        readme: `# PROACT-SAFE: Intelligent Firearm Threat Monitoring

PROACT-SAFE is a real-time autonomous security system designed for smart cities. It uses computer vision (YOLOv8) to detect firearms in video streams and provides immediate, context-aware threat assessments via a premium React dashboard.

---

## 🚀 Features

- **Real-Time Detection**: CPU-optimized YOLOv8n inference (<50ms latency).
- **Intelligent Scoring**: Weighs confidence, zone (Crowd/Restricted), and persistence.
- **Premium V2 Dashboard**:
  - **Command Center Layout**: 2x2 Grid for maximum situational awareness.
  - **Analytics**: Interactive charts for threat trends.
  - **Multi-View**: 4-Camera matrix simulation.
  - **Snapshot Gallery**: Review forensic evidence instantly.
- **Robust Backend**: FastAPI with WebSockets and MJPEG streaming.

---

## 🛠️ Installation

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
\`\`\`bash
cd backend
# Create virtual environment (Recommended)
python -m venv .venv
# Activate: .venv\\Scripts\\activate (Windows) or source .venv/bin/activate (Linux)

# Install dependencies
pip install -r requirements.txt
# Ensure FastAPI/Uvicorn are installed
pip install fastapi uvicorn python-multipart websockets

# Run Server
python api_server.py
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd frontend
# Install dependencies
npm install
# Run Dev Server
npm run dev
\`\`\`

---

## 🖥️ Usage

1. Start both Backend and Frontend servers.
2. Open Browser at \`http://localhost:5173\`.
3. **Landing Page**: Click "Launch System".
4. **Dashboard**:
    - Show a handgun/rifle (or image of one) to the webcam.
    - Observe the **Threat Level** rise to **HIGH**.
    - Check **Alert Log** and **Snapshot Gallery** for the captured event.
    - Visit **Analytics** via the Sidebar to see stats.`,
        demoLink: '#'
    }
];
