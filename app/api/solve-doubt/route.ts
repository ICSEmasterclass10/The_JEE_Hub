import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const question = formData.get("question") as string;
    const image = formData.get("image") as File | null;

    if (!question && !image) {
      return NextResponse.json(
        { error: "Please provide a question or image" },
        { status: 400 }
      );
    }

    let prompt = `You are an expert JEE physics, chemistry, and mathematics tutor. 
Solve the following doubt step-by-step with clear explanations and use LaTeX format for mathematical expressions (wrap in $$...$$).

Student's Question: ${question || "See attached image"}

Provide:
1. Understanding of the concept
2. Step-by-step solution
3. Key insights
4. Common mistakes to avoid
5. Similar problem-solving approach

Use LaTeX for all mathematical expressions.`;

    let generationConfig: any = {
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 2048,
    };

    // If image is provided, add it to the request
    if (image) {
      const imageBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      
      generationConfig = {
        model: google("gemini-1.5-flash"),
        messages: [
          {
            role: "user" as const,
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image",
                image: {
                  url: `data:${image.type};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        temperature: 0.7,
        maxTokens: 2048,
      };
    }

    const { text } = await generateText(generationConfig);

    return NextResponse.json({
      solution: text,
      success: true,
    });
  } catch (error) {
    console.error("Doubt solver error:", error);
    return NextResponse.json(
      { error: "Failed to solve doubt" },
      { status: 500 }
    );
  }
}
