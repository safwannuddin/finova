// Simple mock data generators for the dashboard

/**
 * Generates financial insights based on user profile
 */
export function generateFinancialInsights(userData: any) {
  // Mock health score between 0-100
  const healthScore = Math.floor(Math.random() * 100);
  
  // Mock health metrics
  const healthMetrics = [
    {
      id: "1",
      name: "Debt Management",
      value: Math.floor(Math.random() * 100),
      description: "Your debt-to-income ratio and repayment efficiency",
      status: Math.random() > 0.6 ? "good" : Math.random() > 0.3 ? "warning" : "poor"
    },
    {
      id: "2",
      name: "Emergency Readiness",
      value: Math.floor(Math.random() * 100),
      description: "Your capacity to handle unexpected financial emergencies",
      status: Math.random() > 0.6 ? "good" : Math.random() > 0.3 ? "warning" : "poor"
    },
    {
      id: "3",
      name: "Retirement Planning",
      value: Math.floor(Math.random() * 100),
      description: "Your progress toward retirement goals based on age and income",
      status: Math.random() > 0.6 ? "good" : Math.random() > 0.3 ? "warning" : "poor"
    }
  ];
  
  // Mock market insights
  const marketInsights = [
    {
      title: "Market Volatility Increasing",
      description: "Recent economic indicators suggest increased market volatility in the coming months. Consider reviewing your portfolio diversification.",
      source: "Bloomberg",
      date: "2 days ago"
    },
    {
      title: "Tech Sector Performance",
      description: "Technology stocks have outperformed the broader market by 12% year-to-date, with AI-focused companies leading gains.",
      source: "Financial Times",
      date: "1 week ago"
    },
    {
      title: "Interest Rate Outlook",
      description: "Analysts expect the Federal Reserve to maintain current interest rates through Q3, potentially affecting bond yields.",
      source: "Wall Street Journal",
      date: "3 days ago"
    }
  ];
  
  // Mock recommendations
  const recommendations = [
    {
      id: "1",
      title: "Increase emergency fund",
      description: "Your emergency fund could cover expenses for about 2 months. Consider increasing it to 6 months.",
      category: "saving",
      actionable: true,
      impact: "high",
      relevantGoals: ["EmergencyFund"],
      minExperienceLevel: "Beginner"
    },
    {
      id: "2",
      title: "Optimize retirement contributions",
      description: "Increasing your 401(k) contribution by 2% could significantly improve your retirement outlook.",
      category: "investment",
      actionable: true,
      impact: "medium",
      relevantGoals: ["Retirement"],
      minExperienceLevel: "Beginner"
    },
    {
      id: "3",
      title: "Diversify investment portfolio",
      description: "Your portfolio is heavily weighted in technology stocks. Consider diversifying to reduce sector risk.",
      category: "investment",
      actionable: true,
      impact: "medium",
      relevantGoals: [],
      minExperienceLevel: "Intermediate"
    }
  ];
  
  return {
    healthScore,
    healthMetrics,
    marketInsights,
    recommendations
  };
} 