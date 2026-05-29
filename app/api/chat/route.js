import { NextResponse } from 'next/server';
import { knowledgeBase, retrieveContext } from '../../../src/data/knowledgeBase';

const SYSTEM_PROMPT = `You are Kiran Babu Bandela's AI assistant on his portfolio website. You represent Kiran and answer questions from recruiters, hiring managers, and visitors.

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
    return "I specialize in Python, PyTorch, TensorFlow, and the Hugging Face ecosystem. I'm particularly passionate about LLM fine-tuning (LoRA, QLoRA), RAG pipelines with LangChain, and building AI agents. On the web side, I work with React, Next.js, FastAPI, and Node.js. For cloud, I have experience with AWS, Azure, and GCP!";
  }

  if (queryLower.includes('project') || queryLower.includes('work') || queryLower.includes('built')) {
    return "I've built some exciting projects! My highlights include FinPilot (an autonomous finance system with multi-agent AI), PROACT-SAFE (real-time firearm detection using YOLOv8), an AI-powered Blood Donation matching system, and a multimodal Generative AI Chatbot. Check out the Projects section for demos and details!";
  }

  if (queryLower.includes('contact') || queryLower.includes('hire') || queryLower.includes('reach')) {
    return "I'd love to connect! You can reach me at kiranbabubandela6@gmail.com, find me on LinkedIn at linkedin.com/in/kiranbabu18, or check out my code on GitHub at github.com/kiran1627. I'm currently open to new opportunities!";
  }

  if (queryLower.includes('experience') || queryLower.includes('education') || queryLower.includes('background')) {
    return "I'm pursuing my B.Tech in Computer Science specializing in AI & ML (2022-2026). I've been actively building AI projects, contributing to open source, and honing my skills in Generative AI and LLMs. I was also selected as a finalist in the Innovation Marathon by TASK/SAP!";
  }

  // Default: use the most relevant doc
  const topDoc = docs[0];
  return topDoc.content.length > 200
    ? topDoc.content.substring(0, 200) + '...'
    : topDoc.content;
}
