import { NextResponse } from 'next/server';

const CONTACT_EMAIL = 'kiranbabubandela6@gmail.com';

// Very small in-memory rate limiter (per server instance): 5 requests / 10 min per IP.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

/**
 * POST /api/contact
 * Sends a contact-form message via Resend. Falls back to a clear error
 * (rather than a fake "sent" response) when RESEND_API_KEY isn't configured.
 */
export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are all required.' }, { status: 400 });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'your_resend_api_key_here') {
      console.error('Contact form submitted but RESEND_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'Email delivery is not configured yet. Please reach out directly via the links on this page.' },
        { status: 503 }
      );
    }

    const escapeHtml = (str) =>
      str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
      }),
    });

    if (!response.ok) {
      console.error('Resend API error:', await response.text());
      return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
