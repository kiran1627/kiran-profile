import { NextResponse } from 'next/server';
import { knowledgeBase, retrieveContext } from '../../../src/data/knowledgeBase';

const SYSTEM_PROMPT = `You are Kiran Babu Bandela's AI assistant on his portfolio website. Kiran is a GenAI/RAG Engineer transitioning toward AI Architect roles. You represent Kiran and answer questions from recruiters, hiring managers, and visitors.

RULES:
- Answer in first person as if you ARE Kiran (e.g., "I specialize in..." not "Kiran specializes in...")
- Be professional, friendly, and concise
- Keep responses under 150 words for conversational flow
- Only answer based on the provided context — don't make up information
- If asked something not in the context, say "I'd love to tell you more about that! Feel free to reach out to me directly at kiranbabubandela6@gmail.com"
- Highlight relevant skills and experiences naturally
- Be enthusiastic about AI/ML topics`;

/**
 * POST /api/chat
 * RAG-powered chat endpoint using Google Gemini.
 */
export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Retrieve relevant context
    const relevantDocs = retrieveContext(message, 4);
    const context = relevantDocs
      .map((doc) => `[${doc.category.toUpperCase()}] ${doc.title}:\n${doc.content}`)
      .join('\n\n---\n\n');

    // Build the prompt
    const augmentedPrompt = `${SYSTEM_PROMPT}

CONTEXT FROM KIRAN'S PROFILE:
${context || 'No specific context found. Answer based on general knowledge about Kiran as an AI/ML engineer.'}

CONVERSATION HISTORY:
${history.slice(-6).map((h) => `${h.role}: ${h.content}`).join('\n')}

USER'S QUESTION: ${message}

YOUR RESPONSE (as Kiran):`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Fallback: generate response from knowledge base directly
      return NextResponse.json({
        response: generateFallbackResponse(message, relevantDocs),
        source: 'fallback',
      });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: augmentedPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return NextResponse.json({
        response: generateFallbackResponse(message, relevantDocs),
        source: 'fallback',
      });
    }

    const data = await response.json();
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || generateFallbackResponse(message, relevantDocs);

    return NextResponse.json({
      response: aiResponse,
      source: 'gemini',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', response: "Sorry, I'm having trouble right now. Please try again!" },
      { status: 500 }
    );
  }
}

/**
 * Generate a response from the knowledge base when no LLM is available.
 */
function generateFallbackResponse(query, docs) {
  if (docs.length === 0) {
    return "Thanks for your interest! I'd love to chat more about that. Feel free to reach out to me at kiranbabubandela6@gmail.com or connect on LinkedIn at linkedin.com/in/kiranbabu18!";
  }

  const queryLower = query.toLowerCase();

  if (queryLower.includes('skill') || queryLower.includes('tech') || queryLower.includes('stack')) {
    return "I work on hybrid RAG pipelines (BM25 + Qdrant, RRF fusion, BGE reranking), LangChain/LangGraph orchestration, and serving self-hosted LLMs like Qwen3-8B. On the infra side: FastAPI, Docker, MLflow, WebSockets, and AWS. Core ML: PyTorch, TensorFlow, and Hugging Face.";
  }

  if (queryLower.includes('project') || queryLower.includes('work') || queryLower.includes('built')) {
    return "I've built some exciting projects! My highlights include FinPilot (an autonomous finance system with multi-agent AI), PROACT-SAFE (real-time firearm detection using YOLOv8), an AI-powered Blood Donation matching system, and a multimodal Generative AI Chatbot. Check out the Projects section for demos and details!";
  }

  if (queryLower.includes('contact') || queryLower.includes('hire') || queryLower.includes('reach')) {
    return "I'd love to connect! You can reach me at kiranbabubandela6@gmail.com, find me on LinkedIn at linkedin.com/in/kiranbabu18, or check out my code on GitHub at github.com/kiran1627. I'm currently open to new opportunities!";
  }

  if (queryLower.includes('experience') || queryLower.includes('education') || queryLower.includes('background')) {
    return "I'm finishing my B.Tech in AI & ML at JNTUH (May 2026). As an IT Intern at IKCON Digital IT Services, I own the AI microservice behind SurakshaGrid, a public-safety platform live across 5 Telangana government departments — hybrid RAG pipeline serving a self-hosted Qwen3-8B. Before that, I was an AI Intern at Placemantra tuning PyTorch/TensorFlow models. I'm also Oracle certified in Generative AI and Data Science.";
  }

  // Default: use the most relevant doc
  const topDoc = docs[0];
  return topDoc.content.length > 200
    ? topDoc.content.substring(0, 200) + '...'
    : topDoc.content;
}
