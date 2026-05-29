import { NextResponse } from 'next/server';

/**
 * POST /api/voice
 * Proxies text-to-speech requests to ElevenLabs API.
 * Keeps API key server-side only.
 */
export async function POST(request) {
  try {
    const { text, voiceId = 'pNInz6obpgDQGcFmaJgB' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
      // Return silence indicator when no API key configured
      return NextResponse.json({
        error: 'ElevenLabs API key not configured',
        fallback: true,
      }, { status: 200 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Voice generation failed', fallback: true },
        { status: response.status }
      );
    }

    // Stream the audio back
    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Voice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', fallback: true },
      { status: 500 }
    );
  }
}
