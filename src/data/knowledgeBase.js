/**
 * Knowledge base for the AI Assistant RAG system.
 * Contains structured data about Kiran's profile, skills, projects, etc.
 * Each entry has a category, title, and content for semantic matching.
 */
export const knowledgeBase = [
  // ─── PERSONAL INFO ───────────────────────────────────────────
  {
    category: 'personal',
    title: 'About Kiran Babu Bandela',
    content: `Kiran Babu Bandela is an AI/ML Engineer and Full Stack Developer based in India. He is currently pursuing a Bachelor of Technology (B.Tech) in Computer Science specializing in AI & ML (2022-2026). He is passionate about building intelligent solutions using modern AI frameworks and is dedicated to continuous learning and solving complex problems through data-driven approaches. He specializes in Generative AI, Large Language Models (LLMs), and Computer Vision.`,
  },
  {
    category: 'personal',
    title: 'Contact Information',
    content: `Email: kiranbabubandela6@gmail.com. GitHub: github.com/kiran1627. LinkedIn: linkedin.com/in/kiranbabu18. WhatsApp: +91 9381342247. Open to new opportunities in AI/ML Engineering, Full Stack Development, and related roles.`,
  },

  // ─── SKILLS ──────────────────────────────────────────────────
  {
    category: 'skills',
    title: 'Programming & Core AI Skills',
    content: `Core Languages: Python (expert level for AI scripting, automation, and ML model development). AI/ML Frameworks: PyTorch (training deep learning models, GANs, custom LLMs), TensorFlow (end-to-end deep learning workflows), Hugging Face Transformers (tokenization, fine-tuning, deployment), OpenAI API (GPT-4, DALL-E integrations), Google Gemini (multimodal AI applications). Specializations: LLM Fine-tuning (LoRA, QLoRA, instruction tuning), Vector Databases (Pinecone, ChromaDB, Milvus), LangChain (complex AI agents, tools, RAG pipelines), RAG Pipelines (semantic search, chunking strategies, retrieval grounding), AI Agents (autonomous agents using CrewAI, AutoGen), Computer Vision (YOLOv10, OpenCV, vision transformers), Prompt Engineering (Chain-of-Thought, Few-shot prompting), MLOps (CI/CD for ML, model monitoring).`,
  },
  {
    category: 'skills',
    title: 'Web Development & Cloud Skills',
    content: `Web Development: React.js (modern interactive UIs), Node.js (scalable backend development), FastAPI (high-performance ML model serving), Streamlit (rapid AI/ML prototyping). Databases: PostgreSQL, MySQL, MongoDB. Cloud Platforms: Azure Cloud (AI services deployment), AWS Cloud (Bedrock, enterprise infrastructure), Google Cloud Platform (Vertex AI, cloud scaling). Tools: GitHub (collaborative development), Power BI (data visualization and BI reporting).`,
  },

  // ─── PROJECTS ────────────────────────────────────────────────
  {
    category: 'projects',
    title: 'AI-enabled Smart Blood Donation System',
    content: `An intelligent platform connecting blood donors, recipients, and hospitals using AI and geolocation services. Uses a Random Forest Classifier to predict optimal donor-recipient matches based on blood type, medical compatibility, distance, and availability. Tech stack: React.js frontend, FastAPI/Flask backend, Python/Scikit-learn/Pandas/NumPy for ML, Positionstack API for geolocation, Blockchain for secure donation records. Impact: Optimizes blood donation process, improves success rates, and reduces emergency response times.`,
  },
  {
    category: 'projects',
    title: 'Generative AI Chatbot',
    content: `A multimodal Generative AI Chatbot web application supporting text, voice, and image inputs. Features text chat with AI-generated responses, voice interaction (speech-to-text and text-to-speech), and image understanding using CLIP vision-language model. Built with Python, Streamlit, HuggingFace Transformers, GPT, CLIP, PyTorch, SpeechRecognition, and gTTS. Provides real-time customer support, task automation, and scalable conversation flow.`,
  },
  {
    category: 'projects',
    title: 'FinPilot: Autonomous Finance System',
    content: `A full-stack autonomous finance platform with a FastAPI backend running a multi-agent financial decision cycle and a Next.js frontend. Features: Auth (JWT + Google OAuth), financial profile setup, autonomous investment cycle, real-time dashboard, run replay, investment tracking, and detailed logging. Uses SQLite via SQLAlchemy for persistence, OpenRouter API for LLM advice, and multi-agent orchestration via LangGraph-style architecture. Automates financial decision-making with AI agent collaboration.`,
  },
  {
    category: 'projects',
    title: 'PROACT-SAFE: Intelligent Firearm Threat Monitoring',
    content: `A real-time autonomous security system for smart cities using YOLOv8 computer vision to detect firearms in video streams. Features: CPU-optimized YOLOv8n inference (<50ms latency), intelligent threat scoring (weighs confidence, zone type, persistence), premium command center dashboard with 2x2 grid, analytics charts, 4-camera matrix simulation, snapshot gallery. Built with Python, YOLOv8, FastAPI, React, WebSockets, MJPEG streaming. Provides immediate threat assessments and situational awareness.`,
  },

  // ─── SERVICES ────────────────────────────────────────────────
  {
    category: 'services',
    title: 'Services Offered',
    content: `Kiran offers the following services: 1) LLM Fine-tuning - Specialized in fine-tuning Large Language Models for domain-specific tasks and performance optimization. 2) RAG Development - Building robust Retrieval-Augmented Generation pipelines for intelligent document search and Q&A. 3) AI Agents - Designing autonomous AI agents capable of complex task execution and tool interaction. 4) MLOps - Implementing end-to-end Machine Learning pipelines, from data preprocessing to model deployment. 5) Prompt Engineering - Crafting advanced prompt strategies to enhance LLM reliability and output quality. 6) Data Analytics - Leveraging AI/ML to uncover insights and drive data-informed decision making.`,
  },

  // ─── ACHIEVEMENTS ────────────────────────────────────────────
  {
    category: 'achievements',
    title: 'Achievements and Milestones',
    content: `Innovation Marathon Finalist: Selected as one of the top finalists in the Innovation Marathon organized by TASK in partnership with Code Unnati, Edunet Foundation, and SAP. Has 20+ open source contributions, 15+ projects completed, 500+ coding problems solved, and 10+ certifications.`,
  },

  // ─── EDUCATION ───────────────────────────────────────────────
  {
    category: 'education',
    title: 'Education',
    content: `Bachelor of Technology (B.Tech) in Computer Science, specializing in Artificial Intelligence & Machine Learning. Duration: 2022-2026. Focused on Generative AI, LLMs, Deep Learning, Computer Vision, and Data Science.`,
  },

  // ─── AVAILABILITY ────────────────────────────────────────────
  {
    category: 'availability',
    title: 'Work Availability',
    content: `Kiran is currently looking for new opportunities in AI/ML Engineering, Generative AI, Full Stack Development, and related roles. He is open to full-time positions, internships, freelance work, and collaboration opportunities. Best way to reach him is via email at kiranbabubandela6@gmail.com or LinkedIn at linkedin.com/in/kiranbabu18.`,
  },
];

/**
 * Simple keyword-based retrieval for RAG context.
 * Returns the most relevant knowledge entries for a given query.
 */
export function retrieveContext(query, topK = 5) {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeBase.map((entry) => {
    const contentLower = (entry.title + ' ' + entry.content + ' ' + entry.category).toLowerCase();

    let score = 0;
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 1;
        // Boost for title matches
        if (entry.title.toLowerCase().includes(word)) score += 2;
        // Boost for category matches
        if (entry.category.toLowerCase().includes(word)) score += 1.5;
      }
    }

    // Exact phrase match bonus
    if (contentLower.includes(queryLower)) score += 5;

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.entry);
}
