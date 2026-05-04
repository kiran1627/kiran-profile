# 🩸 AI-Powered Blood Donation & Matching System

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

The system improves the efficiency of blood donation networks and helps hospitals respond quickly to emergency cases.

---

## 🧠 Machine Learning Model

The project uses a **Random Forest Classifier** to predict the best donor-recipient matches based on:

- Blood type compatibility
- Donor medical history
- Donor availability
- Distance between donor and hospital

This AI-based approach improves donor selection and speeds up emergency response.

---

## 🏗 System Architecture

```text
Users (Donors / Hospitals / Admin)
            │
            ▼
        React.js Frontend
            │
            ▼
        FastAPI Backend
      (API & Data Processing)
            │
            ▼
        Flask ML Service
     (Machine Learning Model)
            │
            ▼
    Random Forest Prediction
            │
            ▼
        Data Storage (CSV)
```

---

## ⚙️ Technology Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- FastAPI
- Flask

### Machine Learning
- Python
- Scikit-learn
- Random Forest
- Pandas
- NumPy

### APIs
- Positionstack API (Geolocation)

### Security
- Blockchain for secure and transparent donation records

---

## ✨ Key Features

### 👨‍⚕️ Donor Registration
Users can register as blood donors and provide necessary health details.

### 🏥 Hospital Dashboard
Hospitals can:
- Request blood units
- View available donors nearby
- Track blood donation requests

### 🤖 AI-Based Donor Matching
Machine learning predicts the **most suitable donors** based on compatibility and distance.

### 📍 Location-Based Matching
The **Positionstack API** identifies nearby donors and hospitals to ensure faster blood transfers.

### 🔐 Secure Records
Blockchain integration ensures **tamper-proof and transparent donation records**.

### 📊 Admin Monitoring
Administrators can monitor:

- Blood availability
- Donor registrations
- Hospital requests

---

## 📁 Project Structure

```text
AI-Blood-Donation-System
│
├── frontend
│   ├── components
│   ├── pages
│   └── dashboard
│
├── backend
│   ├── fastapi_app
│   │   ├── routes
│   │   └── main.py
│   │
│   └── flask_ml
│       ├── model
│       ├── predict.py
│       └── train_model.py
│
├── datasets
│   └── donor_data.csv
│
├── models
│   └── random_forest_model.pkl
│
└── README.md
```

---

## 📊 Expected Outcomes

- Faster donor-recipient matching
- Improved hospital response time
- Efficient donor discovery based on location
- Transparent blood donation tracking

---

## 🔮 Future Enhancements

- Mobile application for donors
- Real-time emergency alerts
- Integration with national blood bank systems
- Advanced deep learning models for improved prediction

---

## 👨‍💻 Author

**Kiran Prince**

AI / Machine Learning Developer  
Passionate about building **AI solutions for healthcare and social impact**
