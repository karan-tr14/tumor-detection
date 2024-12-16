"use server";

import { db } from "@/lib/db";
import { groq } from "@/lib/groq";

export const uploadToDb = async (data: any) => {
  const { url, fileHash, name } = data;
  await db.file.create({
    data: {
      id: fileHash,
      name: name,
      fileUrl: url,
      fileId: fileHash,
    },
  });
};

export const AiAnalysis = async (image: string) => {
  const prompt = `You are a medical imaging expert specializing in ovarian tumor detection.
    Analyze this ultrasound image (provided as base64) and determine if there are any signs of ovarian tumors.
    Provide your analysis in the following JSON format:
    {
      "detected": boolean,
      "confidence": number (0-100),
      "explanation": string
    }
    Base your analysis on visual patterns, tissue density, and common tumor indicators.`;

  const response = await groq.chat.completions.create({
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
  console.log(response.choices[0].message.content);
};
