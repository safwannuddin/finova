import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { userData } = await request.json();

    if (!userData) {
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      );
    }

    const prompt = `
      Based on the following financial profile, generate 3 specific investment recommendations.
      Each recommendation should include a title, description, expected return, risk level, and reasoning.
      Make them specific, diverse, and appropriate for this investor's profile:
      
      - Monthly Income: $${userData.monthlyIncome}
      - Age: ${userData.age}
      - Risk Appetite: ${userData.riskAppetite}
      - Current Investments: ${userData.investments.join(', ')}
      
      Format your response as a JSON object with an array of recommendations.
      Each recommendation should have the properties: id, title, description, expectedReturn, risk (low, moderate, or high), and reasoning.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an investment advisor. Respond only with valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      return NextResponse.json(
        { error: 'Failed to generate recommendations' },
        { status: 500 }
      );
    }
    
    try {
      const parsedResponse = JSON.parse(response);
      return NextResponse.json({ 
        recommendations: parsedResponse.recommendations || [] 
      });
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 