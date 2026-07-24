import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { filename } = await req.json();

    const pdfPath = path.join(process.cwd(), filename);

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json({ error: "PDF source file not found." }, { status: 404 });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert JEE exam writer. Parse the attached PDF source document and generate 5 practice questions for JEE Main/Advanced.
    Output STRICTLY a JSON object matching this schema:
    {
      "questions": [
        {
          "id": 1,
          "question": "Question text with LaTeX formatting",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0,
          "explanation": "Step-by-step LaTeX solution"
        }
      ]
    }`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: pdfBase64,
          mimeType: "application/pdf"
        }
      }
    ]);

    const cleanJson = result.response.text().replace(/```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(cleanJson));

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate test." }, { status: 500 });
  }
}
