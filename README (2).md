# 🤖 Generative AI Chatbot with Voice and Image Integration

## 📌 Project Overview

This project is a **Generative AI Chatbot Web Application** that allows
users to interact with an AI assistant using **text, voice, and image
inputs**.\
The chatbot uses **Transformer-based language models** to generate
intelligent responses and integrates **speech processing and image
understanding** for a multimodal AI experience.

The application is built using **Python, Streamlit, HuggingFace
Transformers, and PyTorch**.

------------------------------------------------------------------------

## 🚀 Features

### 💬 Text Chat

Users can ask questions through text input and receive AI-generated
responses.

### 🎤 Voice Interaction

-   Upload voice input (WAV/MP3)
-   Speech is converted into text
-   AI processes the query
-   Response is converted back to speech

### 🖼 Image Understanding

Users can upload images and the AI will analyze the image using a **CLIP
vision-language model** to provide a description.

### 🌐 Interactive Web Interface

A simple and interactive web application built with **Streamlit**.

------------------------------------------------------------------------

## 🧠 Technologies Used

-   Python
-   Streamlit
-   HuggingFace Transformers
-   GPT-based Language Models
-   CLIP (Vision-Language Model)
-   PyTorch
-   SpeechRecognition
-   gTTS (Google Text to Speech)
-   PIL (Python Imaging Library)

------------------------------------------------------------------------

## 📂 Project Structure

Generative-Chatbot/ │ ├── app.py ├── chat_logic.py ├──
voice_processing.py ├── image_processing.py │ ├── requirements.txt └──
README.md

------------------------------------------------------------------------

## ⚙️ Installation

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/generative-chatbot.git cd
generative-chatbot

### 2️⃣ Create Virtual Environment

python -m venv venv

Activate the environment:

Windows: venv`\Scripts`{=tex}`\activate`{=tex}

Linux / Mac: source venv/bin/activate

### 3️⃣ Install Dependencies

pip install -r requirements.txt

------------------------------------------------------------------------

## ▶️ Run the Application

streamlit run app.py

Open in browser: http://localhost:8501

------------------------------------------------------------------------

## 💡 Use Cases

-   AI Virtual Assistant
-   Customer Support Chatbot
-   Voice-based AI Assistant
-   Image Question Answering
-   Educational AI Tutor

------------------------------------------------------------------------

## 🔮 Future Improvements

-   Integrate advanced models like GPT-4, LLaMA, or Mistral
-   Add conversation memory
-   Implement Retrieval Augmented Generation (RAG)
-   Enable real-time microphone input
-   Improve image reasoning with vision-language models

------------------------------------------------------------------------

## 👨‍💻 Author

**Kiran Prince**\
AI / Machine Learning Developer\
Focused on Generative AI, NLP, Deep Learning, and AI Applications

------------------------------------------------------------------------

⭐ If you like this project, please consider starring the repository.
