# PROACT-SAFE: Intelligent Firearm Threat Monitoring

PROACT-SAFE is a real-time autonomous security system designed for smart cities. It uses computer vision (YOLOv8) to detect firearms in video streams and provides immediate, context-aware threat assessments via a premium React dashboard.

## 🚀 Features

- **Real-Time Detection**: CPU-optimized YOLOv8n inference (<50ms latency).
- **Intelligent Scoring**: Weighs confidence, zone (Crowd/Restricted), and persistence.
- **Premium V2 Dashboard**:
  - **Command Center Layout**: 2x2 Grid for maximum situational awareness.
  - **Analytics**: Interactive charts for threat trends.
  - **Multi-View**: 4-Camera matrix simulation.
  - **Snapshot Gallery**: Review forensic evidence instantly.
- **Robust Backend**: FastAPI with WebSockets and MJPEG streaming.

## 🛠️ Installation

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Backend Setup
```bash
cd backend
# Create virtual environment (Recommended)
python -m venv .venv
# Activate: .venv\Scripts\activate (Windows) or source .venv/bin/activate (Linux)

# Install dependencies
pip install -r requirements.txt
# Ensure FastAPI/Uvicorn are installed
pip install fastapi uvicorn python-multipart websockets

# Run Server
python api_server.py
```

### 2. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Run Dev Server
npm run dev
```

## 🖥️ Usage

1.  Start both Backend and Frontend servers.
2.  Open Browser at `http://localhost:5173`.
3.  **Landing Page**: Click "Launch System".
4.  **Dashboard**:
    - Show a handgun/rifle (or image of one) to the webcam.
    - Observe the **Threat Level** rise to **HIGH**.
    - Check **Alert Log** and **Snapshot Gallery** for the captured event.
    - Visit **Analytics** via the Sidebar to see stats.

## 📂 Project Structure

- `backend/`
  - `core/`: Detection, Threat, and Zone engines.
  - `alert_system/`: Snapshot saving and event logging.
  - `api_server.py`: Main API entry point.
- `frontend/`
  - `src/pages/`: Dashboard, Analytics, MultiView.
  - `src/components/`: Reusable UI widgets (LiveCamera, ThreatCard).

## 🛡️ License
MIT
