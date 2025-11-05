import { GoogleGenAI } from "@google/genai";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt, type } = await request.json();

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: "API Key not configured." }, { status: 500 });
  }
  if (!prompt || !type) {
    return NextResponse.json({ error: "Missing prompt or type in request body." }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    let systemInstruction = "";
    if (type === 'chatbot') {
        systemInstruction = "You are FeedlyBot, a friendly and helpful AI assistant for the FeedlyBot application. FeedlyBot is a customer feedback platform. Keep your answers concise and helpful.";
    } else if (type === 'email') {
        systemInstruction = "You are an expert marketing copywriter for FeedlyBot. Your tone is engaging, professional, and customer-focused. Create a complete email including a subject line and body. Format the output as plain text, with the subject line first, like 'Subject: Your Subject Here'.";
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction }
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return NextResponse.json({ error: `Error generating content: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred while contacting the AI service." }, { status: 500 });
  }
}
