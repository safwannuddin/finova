import OpenAI from 'openai';

// Direct client usage is only for development/demo
// In production, all OpenAI calls should go through our API routes
const useDirectClientCall = !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Initialize the OpenAI client (only used in development/demo mode)
const openai = useDirectClientCall ? new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // For client-side usage
}) : null;

/**
 * Generate AI response for the financial assistant
 * @param message User's message
 * @param financialProfile User's financial profile data
 * @returns AI-generated response
 */
export async function getFinancialAdvice(message: string, financialProfile: any): Promise<string> {
  try {
    if (useDirectClientCall && openai) {
      // Direct client usage (development/demo only)
      const SYSTEM_PROMPT = `You are Finova's AI Financial Advisor, an expert in personal finance, investments, and financial planning.
      Help users understand their portfolio, make investment decisions, and optimize their financial health.
      Base your advice on the user's financial profile, portfolio data, and best practices in financial management.
      Be concise, actionable, and personalized in your responses.`;

      // Create a context-aware message that includes the user's financial data
      const contextMessage = `
        Financial Profile Context:
        - Monthly Income: $${financialProfile.monthlyIncome}
        - Age: ${financialProfile.age}
        - Risk Appetite: ${financialProfile.riskAppetite}
        - Current Investments: ${financialProfile.investments.join(', ')}
        - Budget Allocation: Necessities (${financialProfile.budgetAllocation.necessities}%), 
          Wants (${financialProfile.budgetAllocation.wants}%), 
          Savings (${financialProfile.budgetAllocation.savings}%)
        
        User Question: ${message}
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: contextMessage }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response at the moment.";
    } else {
      // API route usage (preferred for production)
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          financialProfile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API call failed');
      }

      const data = await response.json();
      return data.response || "I'm sorry, I couldn't generate a response at the moment.";
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
}

/**
 * Generate personalized financial insights based on user data
 * @param userData User's financial profile
 * @returns Array of AI-generated financial insights
 */
export async function generatePersonalizedInsights(userData: any): Promise<any[]> {
  try {
    if (useDirectClientCall && openai) {
      // Direct client usage (development/demo only)
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
        
        Format each insight as a JSON object with the properties: id, type, title, description, and impact.
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
      if (!response) return [];
      
      try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse.insights || [];
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        return [];
      }
    } else {
      // API route usage (preferred for production)
      const response = await fetch('/api/openai/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      return data.insights || [];
    }
  } catch (error) {
    console.error('Error generating insights:', error);
    return [];
  }
}

/**
 * Generate investment recommendations based on user's profile
 * @param userData User's financial profile
 * @returns Array of AI-generated investment recommendations
 */
export async function generateInvestmentRecommendations(userData: any): Promise<any[]> {
  try {
    if (useDirectClientCall && openai) {
      // Direct client usage (development/demo only)
      const prompt = `
        Based on the following financial profile, generate 3 specific investment recommendations.
        Each recommendation should include a title, description, expected return, risk level, and reasoning.
        Make them specific, diverse, and appropriate for this investor's profile:
        
        - Monthly Income: $${userData.monthlyIncome}
        - Age: ${userData.age}
        - Risk Appetite: ${userData.riskAppetite}
        - Current Investments: ${userData.investments.join(', ')}
        
        Format as a JSON array of objects with properties: id, title, description, expectedReturn, risk, and reasoning.
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
      if (!response) return [];
      
      try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse.recommendations || [];
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        return [];
      }
    } else {
      // API route usage (preferred for production)
      const response = await fetch('/api/openai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recommendations');
      }

      const data = await response.json();
      return data.recommendations || [];
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
} 