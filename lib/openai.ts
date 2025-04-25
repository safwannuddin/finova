export const categories = [
  "Portfolio",
  "Investments",
  "Risk Profile",
  "Savings",
  "Goals",
  "Financial Health"
];

export interface ChatQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const chatQuestions: ChatQuestion[] = [
  {
    id: "portfolio-1",
    category: "Portfolio",
    question: "How should I diversify my investment portfolio?",
    answer: "A well-diversified portfolio typically includes a mix of different asset classes: stocks (40-60%), bonds (20-40%), and alternative investments (0-20%). The exact allocation depends on your risk tolerance and investment timeline. Consider geographic diversification and different sectors to reduce risk."
  },
  {
    id: "portfolio-2",
    category: "Portfolio",
    question: "What's a good portfolio rebalancing strategy?",
    answer: "Regular portfolio rebalancing (every 6-12 months) helps maintain your target asset allocation. If any asset class deviates by more than 5% from your target, consider rebalancing. This helps manage risk and can improve long-term returns through disciplined buying and selling."
  },
  {
    id: "investments-1",
    category: "Investments",
    question: "Should I invest in individual stocks or ETFs?",
    answer: "For most investors, ETFs offer better diversification and lower risk than individual stocks. They provide exposure to many companies, sectors, or markets with lower costs and less research required. However, if you have the time and knowledge for research, a combination of both can be beneficial."
  },
  {
    id: "risk-1",
    category: "Risk Profile",
    question: "How do I determine my risk tolerance?",
    answer: "Your risk tolerance depends on factors like your investment timeline, financial goals, and comfort with market volatility. Consider: How long until you need the money? How much loss can you handle without panic selling? Generally, younger investors can take more risk as they have time to recover from market downturns."
  },
  {
    id: "savings-1",
    category: "Savings",
    question: "How much should I keep in my emergency fund?",
    answer: "A general rule is to maintain 3-6 months of living expenses in easily accessible savings. If your income is variable or you have dependents, consider saving 6-12 months. Keep this money in a high-yield savings account for both safety and some interest earnings."
  },
  {
    id: "goals-1",
    category: "Goals",
    question: "How do I set realistic financial goals?",
    answer: "Use the SMART framework: Specific, Measurable, Achievable, Relevant, and Time-bound. For example, instead of 'save more money,' set a goal like 'save $6,000 for emergency fund in 12 months by setting aside $500 monthly.' Break larger goals into smaller milestones and track progress regularly."
  },
  {
    id: "health-1",
    category: "Financial Health",
    question: "What are key financial health indicators to track?",
    answer: "Monitor these key metrics: 1) Debt-to-income ratio (should be under 36%), 2) Emergency fund coverage (3-6 months), 3) Retirement savings rate (aim for 15-20% of income), 4) Credit score (target 740+), and 5) Net worth growth. Review these monthly or quarterly to stay on track."
  }
];

/**
 * Get questions by category
 * @param category Category to filter by
 * @returns Array of questions for the category
 */
export function getQuestionsByCategory(category: string): ChatQuestion[] {
  return chatQuestions.filter(q => q.category === category);
}

/**
 * Get answer for a specific question ID
 * @param questionId The ID of the question
 * @returns The answer or a default message if not found
 */
export function getAnswer(questionId: string): string {
  const question = chatQuestions.find(q => q.id === questionId);
  return question?.answer || "I'm sorry, I couldn't find an answer to that question.";
}

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