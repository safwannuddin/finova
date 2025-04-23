import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt, financialProfile } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Create context-aware message including user's financial profile
    const contextMessage = `
      Financial Profile Context:
      - Monthly Income: $${financialProfile?.monthlyIncome || 'Not provided'}
      - Age: ${financialProfile?.age || 'Not provided'}
      - Risk Appetite: ${financialProfile?.riskAppetite || 'Not provided'}
      - Current Investments: ${financialProfile?.investments?.join(', ') || 'None'}
      - Budget Allocation: ${
        financialProfile?.budgetAllocation 
          ? `Necessities (${financialProfile.budgetAllocation.necessities}%), 
            Wants (${financialProfile.budgetAllocation.wants}%), 
            Savings (${financialProfile.budgetAllocation.savings}%)`
          : 'Not provided'
      }
      
      User Question: ${prompt}
    `;

    // System prompt for financial advisor role
    const systemPrompt = `You are Finova's AI Financial Advisor, an expert in personal finance, investments, and financial planning.
    Help users understand their portfolio, make investment decisions, and optimize their financial health.
    Base your advice on the user's financial profile, portfolio data, and best practices in financial management.
    Be concise, actionable, and personalized in your responses.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contextMessage }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const response = completion.choices[0].message.content;
    
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Check if the API is configured
  const isConfigured = !!process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    status: isConfigured ? 'operational' : 'not_configured',
    message: isConfigured 
      ? 'OpenAI API is properly configured' 
      : 'OpenAI API key is not configured. Please add it to your environment variables.'
  });
} 