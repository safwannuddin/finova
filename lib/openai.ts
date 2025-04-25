export const categories = [
  "Investment Strategy",
  "Portfolio Analysis",
  "Risk Management",
  "Market Insights",
  "Financial Planning",
  "Tax Strategy"
];

interface ChatQuestion {
  id: string;
  category: string;
  question: string;
}

export const chatQuestions: ChatQuestion[] = [
  {
    id: "1",
    category: "Investment Strategy",
    question: "How should I diversify my investment portfolio?"
  },
  {
    id: "2",
    category: "Investment Strategy",
    question: "What are the best long-term investment options?"
  },
  {
    id: "3",
    category: "Portfolio Analysis",
    question: "How is my current portfolio performing?"
  },
  {
    id: "4",
    category: "Portfolio Analysis",
    question: "What is my portfolio's risk level?"
  },
  {
    id: "5",
    category: "Risk Management",
    question: "How can I reduce my investment risk?"
  },
  {
    id: "6",
    category: "Risk Management",
    question: "What hedging strategies should I consider?"
  },
  {
    id: "7",
    category: "Market Insights",
    question: "What are the current market trends?"
  },
  {
    id: "8",
    category: "Market Insights",
    question: "How might economic changes affect my investments?"
  },
  {
    id: "9",
    category: "Financial Planning",
    question: "How can I plan for retirement?"
  },
  {
    id: "10",
    category: "Financial Planning",
    question: "What should my savings goals be?"
  },
  {
    id: "11",
    category: "Tax Strategy",
    question: "How can I optimize my tax efficiency?"
  },
  {
    id: "12",
    category: "Tax Strategy",
    question: "What tax-advantaged accounts should I use?"
  }
];

export const getQuestionsByCategory = (category: string): ChatQuestion[] => {
  return chatQuestions.filter(q => q.category === category);
};

export const getAnswer = (question: string): string => {
  // Mock answers based on question keywords
  if (question.toLowerCase().includes("diversify")) {
    return "To diversify your portfolio, consider spreading investments across different asset classes (stocks, bonds, real estate), sectors, and geographic regions. A common strategy is the 60/40 portfolio split between stocks and bonds, adjusted based on your risk tolerance and time horizon.";
  }
  
  if (question.toLowerCase().includes("long-term")) {
    return "For long-term investments, consider index funds, blue-chip stocks, and real estate investment trusts (REITs). These typically offer steady growth and lower risk over extended periods. Remember to regularly rebalance your portfolio and reinvest dividends.";
  }
  
  if (question.toLowerCase().includes("risk")) {
    return "To manage risk, implement diversification, set stop-loss orders, and maintain an emergency fund. Consider your time horizon and use dollar-cost averaging to reduce market timing risk. Regular portfolio rebalancing helps maintain your desired risk level.";
  }
  
  if (question.toLowerCase().includes("market trends")) {
    return "Current market trends show increasing focus on sustainable investments, digital assets, and AI-driven technologies. However, it's important to maintain a long-term perspective and not chase short-term trends without careful consideration.";
  }
  
  if (question.toLowerCase().includes("retirement")) {
    return "Retirement planning should start early. Consider maximizing contributions to tax-advantaged accounts like 401(k)s and IRAs. Aim to save 15-20% of your income, adjust for inflation, and regularly review your investment strategy as you near retirement.";
  }
  
  if (question.toLowerCase().includes("tax")) {
    return "To optimize tax efficiency, consider using tax-advantaged accounts (401(k), IRA, HSA), tax-loss harvesting, and municipal bonds. Long-term investments receive preferential tax treatment. Consult with a tax professional for personalized advice.";
  }
  
  // Default response for other questions
  return "That's an interesting question. While I can provide general guidance, I recommend consulting with a financial advisor for personalized advice based on your specific situation.";
};

/**
 * Generate personalized financial insights based on user data
 * @param userData User's financial profile
 * @returns Array of financial insights
 */
export async function generatePersonalizedInsights(userData: any): Promise<any[]> {
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