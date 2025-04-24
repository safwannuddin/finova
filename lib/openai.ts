// Predefined Q&A for financial assistance
const predefinedAnswers = {
  "what is my portfolio worth": "You can view your current portfolio value in the Net Worth card on your dashboard.",
  "how do i invest": "Based on your risk profile, we recommend diversifying your investments across stocks, bonds, and ETFs. Check the Investment Recommendations card for personalized suggestions.",
  "what is my risk profile": "Your risk profile is determined during onboarding. You can view and update it in your profile settings.",
  "how do i save more": "Try following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and investments.",
  "what are my financial goals": "You can view and manage your financial goals in the Goals Progress card on your dashboard.",
  "how is my financial health": "Check the Financial Health card on your dashboard for a comprehensive overview of your financial wellbeing.",
  "help": "I can help you with: portfolio value, investment advice, risk profile, savings tips, financial goals, and financial health. Just ask one of these topics!"
};

/**
 * Get a response from the predefined Q&A system
 * @param message User's message
 * @returns AI-generated response
 */
export async function getFinancialAdvice(message: string): Promise<string> {
  const normalizedMessage = message.toLowerCase().trim();
  
  // Check for exact matches first
  if (predefinedAnswers[normalizedMessage]) {
    return predefinedAnswers[normalizedMessage];
  }
  
  // Check for partial matches
  for (const [question, answer] of Object.entries(predefinedAnswers)) {
    if (normalizedMessage.includes(question)) {
      return answer;
    }
  }
  
  // Default response if no match found
  return "I can help you with basic financial questions. Try asking about your portfolio, investments, savings, goals, or financial health. Type 'help' to see all topics I can assist with.";
}

/**
 * Generate personalized financial insights based on user data
 * @param userData User's financial profile
 * @returns Array of financial insights
 */
export async function generatePersonalizedInsights(userData: any): Promise<any[]> {
  // Return static insights
  return [
    {
      title: "Emergency Fund Status",
      description: "Consider building an emergency fund that covers 3-6 months of expenses.",
      type: "tip",
      impact: "high"
    },
    {
      title: "Investment Diversification",
      description: "Your portfolio could benefit from broader diversification across different asset classes.",
      type: "opportunity",
      impact: "medium"
    },
    {
      title: "Savings Rate",
      description: "Your current savings rate is on track with recommended financial planning guidelines.",
      type: "tip",
      impact: "low"
    }
  ];
}

/**
 * Generate investment recommendations based on user's profile
 * @param userData User's financial profile
 * @returns Array of investment recommendations
 */
export async function generateInvestmentRecommendations(userData: any): Promise<any[]> {
  // Return static recommendations
  return [
    {
      id: "1",
      title: "Index Fund Investment",
      description: "Consider allocating a portion of your portfolio to low-cost index funds tracking major market indices.",
      expectedReturn: "7-10% annually",
      risk: "moderate",
      reasoning: "Index funds offer broad market exposure and historically consistent returns."
    },
    {
      id: "2",
      title: "Bond Allocation",
      description: "Include government and corporate bonds for stability and income.",
      expectedReturn: "3-5% annually",
      risk: "low",
      reasoning: "Bonds can provide steady income and help balance portfolio risk."
    },
    {
      id: "3",
      title: "Dividend Stocks",
      description: "Add high-quality dividend-paying stocks to your portfolio.",
      expectedReturn: "4-6% annually",
      risk: "moderate",
      reasoning: "Dividend stocks can provide both income and potential capital appreciation."
    }
  ];
} 