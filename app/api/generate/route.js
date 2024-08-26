import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const systemPrompt = "You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards. Both front and back should be one sentence long. Make sure the response is in json format and only the json array nothing else. do not use any backslash n just plain json " +
`{
  "flashcards":[
    {
      "front": "string",
      "back": "string",
    }
    {
      "front": "string",
      "back": "string",
    }
    {
      "front": "string",
      "back": "string",
    }
  ]
}`
+ "make sure to follow above json object structure";
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

export async function POST(req) {
  try {
    // Extract text from the request
    const data = await req.text();

    // Generate content using the Gemini-Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(systemPrompt + data); 
    const generatedText = result.response.text(); 

    const flashcards = { flashcards: generatedText }; 
    console.log("Route hit: ",flashcards);
    
    // Return the generated content as a JSON response
    return NextResponse.json(flashcards);
  } catch {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}


