import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_API_KEY) {
  console.error('GOOGLE_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req) {
  try {
    const { theme, mood, starter } = await req.json();

    if (!theme || !mood) {
      return NextResponse.json(
        { error: 'Theme and mood are required' },
        { status: 400 }
      );
    }

    const prompt = `You are a skilled song lyricist. Write 8-12 lines of original song lyrics with the following:
Theme: ${theme}
Mood: ${mood}
Starter line: ${starter || 'None'}
Keep it creative with strong rhymes and punchlines.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lyrics = response.text();

    return NextResponse.json({ lyrics });
  } catch (error) {
    console.error('Error generating lyrics:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Failed to generate lyrics', details: error.message },
      { status: 500 }
    );
  }
} 