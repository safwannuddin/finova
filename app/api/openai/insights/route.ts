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
      Based on the following financial profile, generate 3 personalized financial insights. 
      Each insight should include a title, description, and type (opportunity, warning, or tip).
      Make them specific, actionable, and tailored to this profile:
      
      - Monthly Income: $${userData.monthlyIncome}
      - Age: ${userData.age}
      - Risk Appetite: ${userData.riskAppetite}
      - Current Investments: ${userData.investments.join(', ')}
      - Budget Allocation: Necessities (${userData.budgetAllocation.necessities}%), 
        Wants (${userData.budgetAllocation.wants}%), 
        Savings (${userData.budgetAllocation.savings}%)
      
      Format your response as a JSON object with an array of insights. 
      Each insight should have the properties: id, type, title, description, and impact (low, medium, or high).
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a financial insights generator. Respond only with valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      return NextResponse.json(
        { error: 'Failed to generate insights' },
        { status: 500 }
      );
    }
    
    try {
      const parsedResponse = JSON.parse(response);
      return NextResponse.json({ 
        insights: parsedResponse.insights || [] 
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