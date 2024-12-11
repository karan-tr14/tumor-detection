import { groq } from "@/lib/groq";
import { NextResponse } from "next/server";
import sharp from "sharp";

async function compressImage(base64Image: string): Promise<string> {
  const buffer = Buffer.from(base64Image, "base64");
  const compressed = await sharp(buffer)
    .resize(800, 800, { fit: "inside" })
    .jpeg({ quality: 80 })
    .toBuffer();
  return compressed.toString("base64");
}

export async function POST(request: Request) {
  try {
    const nonCompressedImage = await request.json();
    const image = await compressImage(nonCompressedImage.image);

    const prompt = `You are a medical imaging expert specializing in ovarian tumor detection. 
    Analyze this ultrasound image (provided as base64) and determine if there are any signs of ovarian tumors.
    Provide your analysis in the following JSON format:
    {
      "detected": boolean,
      "confidence": number (0-100),
      "explanation": string
    }
    Base your analysis on visual patterns, tissue density, and common tumor indicators.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a medical imaging AI expert specializing in ovarian tumor detection.",
        },
        {
          role: "user",
          content: `${prompt}\n\nImage: ${image}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI model");
    }

    try {
      const result = JSON.parse(response);
      return NextResponse.json(result);
    } catch (e) {
      throw new Error("Invalid response format from AI model");
    }
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
