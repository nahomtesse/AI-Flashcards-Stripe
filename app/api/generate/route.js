import { NextResponse } from "next/server";
import OpenAI from 'openai';

// Define the system prompt
const systemPrompt = `
You are a flashcard creator designed to assist with career recommendations and educational quizzes. Your flashcards should:


Ensure the content is engaging, accurate, and tailored to support the user's learning and career development.
Return in the following JSON format. Make sure its like this format:
{
  "flashcards": [{
     "front": str,
     "back": str
  }]
}
`;

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  baseURL: "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const data = await req.text();
  //const { text } = data;

  try {  
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data }
      ],
      response_format: { type: 'json_object' },
    });

      const flashcards = JSON.parse(response.choices[0].message.content);
      //console.log('Parsed flashcards:', flashcards);

    return NextResponse.json(flashcards);
  } catch (error) {
    return NextResponse.json({ error: `OpenAI API error: ${error.message}` }, { status: 500 });
  }
}
