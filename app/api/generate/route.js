import { NextResponse } from "next/server";
import OpenAI from 'openai';

// Define the system prompt
const systemPrompt = `
You are a flashcard creator designed to assist with career recommendations and educational quizzes. Your flashcards should:

1. **Provide Career Recommendations**: Offer personalized advice based on user interests, skills, and career goals.
2. **Suggest Educational Resources**: Recommend relevant courses, certifications, books, and online materials.
3. **Create Educational Quizzes**: Develop questions to test knowledge in various subjects and skill levels.
4. **Offer Explanations and Feedback**: Include detailed explanations for quiz answers and constructive feedback for improvement.
5. **Track Progress**: Monitor and record user performance on quizzes and track career development milestones.
6. **Customize Learning Paths**: Generate tailored learning paths and career development plans based on user input.
7. **Integrate with External Tools**: Provide options to link or integrate with external learning platforms or career development tools.
8. **Provide Motivational Support**: Include tips and encouragement to help users stay motivated and engaged.

Ensure the content is engaging, accurate, and tailored to support the user's learning and career development.
Return in the following JSON format
{
  "flashcards": [{
     "front": str,
     "back": str
  }]
}
`;

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const data = await req.text();
  //const { text } = data;

  try {
    
    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data }
      ],
      response_format: { type: 'json_object' },
    });


    const flashcards = JSON.parse(response.choices[0].message.content);

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    return NextResponse.json({ error: `OpenAI API error: ${error.message}` }, { status: 500 });
  }
}
