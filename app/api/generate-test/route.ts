import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject, mode, questionCount } = await req.json();

    const prompt = `You are an expert JEE ${subject.toUpperCase()} question generator. Generate ${questionCount} multiple choice questions in ${mode.toUpperCase()} mode.

For PRACTICE mode: Generate conceptual and application-based questions covering key topics.
For NTA mode: Generate questions matching the official NTA JEE Main/Advanced pattern and difficulty.

Each question should be challenging but fair. Use LaTeX format for all mathematical expressions (wrap in $$...$$).

Output STRICTLY a JSON array with this exact format:
[
  {
    "id": 1,
    "question": "Question text with $$mathematical expressions$$",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "solution": "Step-by-step solution with $$math$$",
    "difficulty": "Medium"
  }
]

Difficulty must be: Easy, Medium, or Hard.
Correct must be index 0-3 (not letter).`;

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.8,
    });

    // Extract JSON from response
    let questions = [];
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.error("Failed to parse JSON response:", err);
    }

    return NextResponse.json({
      subject,
      mode,
      questions: questions.slice(0, questionCount),
    });
  } catch (error) {
    console.error("Test generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate test" },
      { status: 500 }
    );
  }
}
