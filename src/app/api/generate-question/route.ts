import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";
import { SampleTopic } from '../../types';

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

export async function POST(request: NextRequest) {
  let topic: string = '';
  
  try {
    const body = await request.json();
    topic = body.topic;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      // Return fallback data if API key is missing
      return NextResponse.json({
        question: `Explain the internal working of the Event Loop when handling microtasks vs macrotasks in the context of ${topic}.`,
        hint: "Think about the call stack and queue priority.",
        difficulty: 'Senior'
      });
    }

    const prompt = `
      You are the author of a premium Frontend Engineering ebook. 
      Generate a unique, challenging interview question about "${topic}".
      It should be suitable for a Senior Frontend Engineer interview.
      
      Return a JSON object with:
      - question: The technical question text.
      - hint: A subtle hint or key concept to solve it.
      - difficulty: Estimate the difficulty level (Senior or Staff).
    `;

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            hint: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Senior', 'Staff'] }
          },
          required: ['question', 'hint', 'difficulty']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const questionData = JSON.parse(text);

    return NextResponse.json(questionData);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Return fallback data instead of throwing error
    return NextResponse.json({
      question: `Explain the internal working of the Event Loop when handling microtasks vs macrotasks in the context of ${topic || 'the selected topic'}.`,
      hint: "Think about the call stack and queue priority.",
      difficulty: 'Senior'
    });
  }
}

