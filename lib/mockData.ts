export interface Portfolio {
  totalValue: number;
  cashBalance: number;
  assets: Asset[];
  monthlyIncome: number;
  monthlyExpenses: number;
  netWorth: NetWorth;
  spendingBreakdown: SpendingCategory[];
  monthlyTransactions: Transaction[];
  performanceHistory: PerformancePoint[];
  financialGoals: FinancialGoal[];
  insights: Insight[];
}

export interface Asset {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'crypto' | 'real_estate' | 'mutual_fund' | 'etf' | 'cash';
  value: number;
  allocation: number;
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  history: PerformancePoint[];
}

export interface NetWorth {
  total: number;
  assets: number;
  liabilities: number;
  history: PerformancePoint[];
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface PerformancePoint {
  date: string;
  value: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'tip';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

// Generate mock data based on user inputs
export const generateMockPortfolio = (
  monthlyIncome: number,
  age: number,
  riskAppetite: 'Low' | 'Medium' | 'High',
  selectedInvestments: string[]
): Portfolio => {
  // Calculate an annual salary as 12 times the monthly income
  const annualSalary = monthlyIncome * 12;
  
  // Adjust net worth based on age and income
  const netWorthMultiplier = Math.min(age / 10, 5);
  const totalNetWorth = annualSalary * netWorthMultiplier;
  
  // Set asset allocation based on risk appetite
  let stockAllocation = 0;
  let bondAllocation = 0;
  let cashAllocation = 0;
  let realEstateAllocation = 0;
  let cryptoAllocation = 0;
  
  switch (riskAppetite) {
    case 'Low':
      stockAllocation = 0.3;
      bondAllocation = 0.4;
      cashAllocation = 0.2;
      realEstateAllocation = 0.1;
      cryptoAllocation = 0;
      break;
    case 'Medium':
      stockAllocation = 0.5;
      bondAllocation = 0.25;
      cashAllocation = 0.1;
      realEstateAllocation = 0.1;
      cryptoAllocation = 0.05;
      break;
    case 'High':
      stockAllocation = 0.6;
      bondAllocation = 0.1;
      cashAllocation = 0.05;
      realEstateAllocation = 0.15;
      cryptoAllocation = 0.1;
      break;
  }
  
  // Calculate expenses (roughly 70% of monthly income)
  const monthlyExpenses = monthlyIncome * 0.7;
  
  // Create assets based on selected investments
  const assets: Asset[] = [];
  
  // Add stock assets if selected
  if (selectedInvestments.includes('Stocks')) {
    assets.push({
      id: 'stock-1',
      name: 'Tech Growth Fund',
      type: 'stock',
      value: totalNetWorth * stockAllocation * 0.4,
      allocation: stockAllocation * 0.4,
      performance: {
        daily: getRandomPerformance(riskAppetite, 'daily'),
        weekly: getRandomPerformance(riskAppetite, 'weekly'),
        monthly: getRandomPerformance(riskAppetite, 'monthly'),
        yearly: getRandomPerformance(riskAppetite, 'yearly'),
      },
      history: generatePerformanceHistory(24, riskAppetite),
    });
    
    assets.push({
      id: 'stock-2',
      name: 'Blue Chip Portfolio',
      type: 'stock',
      value: totalNetWorth * stockAllocation * 0.6,
      allocation: stockAllocation * 0.6,
      performance: {
        daily: getRandomPerformance(riskAppetite, 'daily'),
        weekly: getRandomPerformance(riskAppetite, 'weekly'),
        monthly: getRandomPerformance(riskAppetite, 'monthly'),
        yearly: getRandomPerformance(riskAppetite, 'yearly'),
      },
      history: generatePerformanceHistory(24, riskAppetite),
    });
  }
  
  // Add bond assets if selected
  if (selectedInvestments.includes('Bonds')) {
    assets.push({
      id: 'bond-1',
      name: 'Government Bonds',
      type: 'bond',
      value: totalNetWorth * bondAllocation * 0.7,
      allocation: bondAllocation * 0.7,
      performance: {
        daily: getRandomPerformance('Low', 'daily'),
        weekly: getRandomPerformance('Low', 'weekly'),
        monthly: getRandomPerformance('Low', 'monthly'),
        yearly: getRandomPerformance('Low', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'Low'),
    });
    
    assets.push({
      id: 'bond-2',
      name: 'Corporate Bonds',
      type: 'bond',
      value: totalNetWorth * bondAllocation * 0.3,
      allocation: bondAllocation * 0.3,
      performance: {
        daily: getRandomPerformance('Medium', 'daily'),
        weekly: getRandomPerformance('Medium', 'weekly'),
        monthly: getRandomPerformance('Medium', 'monthly'),
        yearly: getRandomPerformance('Medium', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'Medium'),
    });
  }
  
  // Add crypto assets if selected
  if (selectedInvestments.includes('Crypto')) {
    assets.push({
      id: 'crypto-1',
      name: 'Bitcoin',
      type: 'crypto',
      value: totalNetWorth * cryptoAllocation * 0.6,
      allocation: cryptoAllocation * 0.6,
      performance: {
        daily: getRandomPerformance('High', 'daily'),
        weekly: getRandomPerformance('High', 'weekly'),
        monthly: getRandomPerformance('High', 'monthly'),
        yearly: getRandomPerformance('High', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'High'),
    });
    
    assets.push({
      id: 'crypto-2',
      name: 'Ethereum',
      type: 'crypto',
      value: totalNetWorth * cryptoAllocation * 0.4,
      allocation: cryptoAllocation * 0.4,
      performance: {
        daily: getRandomPerformance('High', 'daily'),
        weekly: getRandomPerformance('High', 'weekly'),
        monthly: getRandomPerformance('High', 'monthly'),
        yearly: getRandomPerformance('High', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'High'),
    });
  }
  
  // Add real estate assets if selected
  if (selectedInvestments.includes('RealEstate')) {
    assets.push({
      id: 'realestate-1',
      name: 'Property Investment',
      type: 'real_estate',
      value: totalNetWorth * realEstateAllocation,
      allocation: realEstateAllocation,
      performance: {
        daily: 0,
        weekly: 0,
        monthly: getRandomPerformance('Low', 'monthly') / 2,
        yearly: getRandomPerformance('Medium', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'Low'),
    });
  }
  
  // Add mutual fund assets if selected
  if (selectedInvestments.includes('MutualFunds')) {
    assets.push({
      id: 'mutualfund-1',
      name: 'Balanced Mutual Fund',
      type: 'mutual_fund',
      value: totalNetWorth * 0.15,
      allocation: 0.15,
      performance: {
        daily: getRandomPerformance('Medium', 'daily'),
        weekly: getRandomPerformance('Medium', 'weekly'),
        monthly: getRandomPerformance('Medium', 'monthly'),
        yearly: getRandomPerformance('Medium', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'Medium'),
    });
  }
  
  // Add ETF assets if selected
  if (selectedInvestments.includes('ETFs')) {
    assets.push({
      id: 'etf-1',
      name: 'S&P 500 ETF',
      type: 'etf',
      value: totalNetWorth * 0.1,
      allocation: 0.1,
      performance: {
        daily: getRandomPerformance('Medium', 'daily'),
        weekly: getRandomPerformance('Medium', 'weekly'),
        monthly: getRandomPerformance('Medium', 'monthly'),
        yearly: getRandomPerformance('Medium', 'yearly'),
      },
      history: generatePerformanceHistory(24, 'Medium'),
    });
  }
  
  // Always add cash
  assets.push({
    id: 'cash-1',
    name: 'Cash Savings',
    type: 'cash',
    value: totalNetWorth * cashAllocation,
    allocation: cashAllocation,
    performance: {
      daily: 0,
      weekly: 0,
      monthly: 0.001,
      yearly: 0.015,
    },
    history: generateSteadyPerformanceHistory(24, 0.001),
  });
  
  // Calculate total portfolio value
  const portfolioValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Generate spending breakdown
  const spendingBreakdown: SpendingCategory[] = [
    {
      category: 'Housing',
      amount: monthlyExpenses * 0.35,
      percentage: 35,
      color: 'hsl(var(--chart-1))',
    },
    {
      category: 'Transportation',
      amount: monthlyExpenses * 0.15,
      percentage: 15,
      color: 'hsl(var(--chart-2))',
    },
    {
      category: 'Food',
      amount: monthlyExpenses * 0.2,
      percentage: 20,
      color: 'hsl(var(--chart-3))',
    },
    {
      category: 'Utilities',
      amount: monthlyExpenses * 0.1,
      percentage: 10,
      color: 'hsl(var(--chart-4))',
    },
    {
      category: 'Entertainment',
      amount: monthlyExpenses * 0.12,
      percentage: 12,
      color: 'hsl(var(--chart-5))',
    },
    {
      category: 'Other',
      amount: monthlyExpenses * 0.08,
      percentage: 8,
      color: 'hsl(var(--muted))',
    },
  ];
  
  // Generate financial goals
  const goals: FinancialGoal[] = [
    {
      id: 'goal-1',
      name: 'Emergency Fund',
      targetAmount: monthlyExpenses * 6,
      currentAmount: monthlyExpenses * 3,
      deadline: getRandomFutureDate(6),
      priority: 'high',
    },
    {
      id: 'goal-2',
      name: 'Vacation',
      targetAmount: monthlyIncome * 2,
      currentAmount: monthlyIncome * 0.8,
      deadline: getRandomFutureDate(12),
      priority: 'medium',
    },
    {
      id: 'goal-3',
      name: 'Retirement',
      targetAmount: annualSalary * 10,
      currentAmount: totalNetWorth * 0.3,
      deadline: getRandomFutureDate(120),
      priority: 'high',
    },
  ];
  
  // Generate insights based on user profile
  const insights: Insight[] = generateInsights(riskAppetite, age, selectedInvestments, monthlyIncome, monthlyExpenses);
  
  return {
    totalValue: portfolioValue,
    cashBalance: totalNetWorth * cashAllocation,
    assets: assets,
    monthlyIncome: monthlyIncome,
    monthlyExpenses: monthlyExpenses,
    netWorth: {
      total: totalNetWorth,
      assets: totalNetWorth * 1.2,
      liabilities: totalNetWorth * 0.2,
      history: generateNetWorthHistory(48, monthlyIncome, age),
    },
    spendingBreakdown: spendingBreakdown,
    monthlyTransactions: generateTransactions(monthlyIncome, monthlyExpenses),
    performanceHistory: generatePortfolioPerformanceHistory(24, riskAppetite),
    financialGoals: goals,
    insights: insights,
  };
};

// Helper functions
function getRandomPerformance(risk: string, period: 'daily' | 'weekly' | 'monthly' | 'yearly'): number {
  const baseMultiplier = {
    daily: 0.001,
    weekly: 0.005,
    monthly: 0.02,
    yearly: 0.08,
  };
  
  const riskMultiplier = {
    Low: 0.5,
    Medium: 1,
    High: 2,
  }[risk];
  
  const randomFactor = Math.random() * 2 - 1; // between -1 and 1
  return baseMultiplier[period] * riskMultiplier * randomFactor;
}

function generatePerformanceHistory(months: number, risk: string): PerformancePoint[] {
  const history: PerformancePoint[] = [];
  let value = 100;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    
    const monthlyChange = getRandomPerformance(risk, 'monthly');
    value = value * (1 + monthlyChange);
    
    history.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      value: Math.max(value, 10), // Ensure we don't go below 10
    });
  }
  
  return history;
}

function generateSteadyPerformanceHistory(months: number, rate: number): PerformancePoint[] {
  const history: PerformancePoint[] = [];
  let value = 100;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    
    value = value * (1 + rate);
    
    history.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      value: value,
    });
  }
  
  return history;
}

function generateNetWorthHistory(months: number, monthlyIncome: number, age: number): PerformancePoint[] {
  const history: PerformancePoint[] = [];
  const savingsRate = 0.2; // Assume 20% of income is saved
  
  // Calculate a starting net worth based on age and income
  const yearsWorking = Math.max(0, age - 22);
  let netWorth = monthlyIncome * 12 * yearsWorking * savingsRate * 0.7; // Discount factor
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    
    // Monthly net worth growth: savings + investment returns
    const monthlySavings = monthlyIncome * savingsRate;
    const investmentReturn = netWorth * (0.07 / 12); // Assume 7% annual return
    
    netWorth += monthlySavings + investmentReturn;
    
    // Add some randomness
    const randomFactor = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
    netWorth *= randomFactor;
    
    history.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      value: netWorth,
    });
  }
  
  return history;
}

function generatePortfolioPerformanceHistory(months: number, risk: string): PerformancePoint[] {
  const history: PerformancePoint[] = [];
  let value = 100;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i));
    
    // Portfolio monthly change depends on risk profile
    let monthlyChange;
    switch (risk) {
      case 'Low':
        monthlyChange = 0.003 + (Math.random() * 0.01 - 0.005);
        break;
      case 'Medium':
        monthlyChange = 0.005 + (Math.random() * 0.02 - 0.01);
        break;
      case 'High':
        monthlyChange = 0.008 + (Math.random() * 0.04 - 0.02);
        break;
      default:
        monthlyChange = 0.005 + (Math.random() * 0.02 - 0.01);
    }
    
    value = value * (1 + monthlyChange);
    
    history.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`,
      value: Math.max(value, 50), // Ensure we don't go below 50
    });
  }
  
  return history;
}

function generateTransactions(monthlyIncome: number, monthlyExpenses: number): Transaction[] {
  const transactions: Transaction[] = [];
  const currentDate = new Date();
  const categories = ['Housing', 'Transportation', 'Food', 'Utilities', 'Entertainment', 'Other'];
  
  // Add income transaction
  transactions.push({
    id: `income-${currentDate.getTime()}`,
    date: formatDate(currentDate),
    description: 'Salary Deposit',
    amount: monthlyIncome,
    category: 'Income',
    type: 'income',
  });
  
  // Add expense transactions
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    let amount;
    
    switch (category) {
      case 'Housing':
        amount = monthlyExpenses * 0.35 * (0.9 + Math.random() * 0.2);
        break;
      case 'Transportation':
        amount = (monthlyExpenses * 0.15 / 4) * (0.8 + Math.random() * 0.4);
        break;
      case 'Food':
        amount = (monthlyExpenses * 0.2 / 8) * (0.7 + Math.random() * 0.6);
        break;
      case 'Utilities':
        amount = (monthlyExpenses * 0.1 / 3) * (0.9 + Math.random() * 0.2);
        break;
      case 'Entertainment':
        amount = (monthlyExpenses * 0.12 / 6) * (0.7 + Math.random() * 0.6);
        break;
      default:
        amount = (monthlyExpenses * 0.08 / 5) * (0.6 + Math.random() * 0.8);
    }
    
    transactions.push({
      id: `expense-${date.getTime()}-${i}`,
      date: formatDate(date),
      description: getDescriptionForCategory(category),
      amount: Math.round(amount * 100) / 100,
      category: category,
      type: 'expense',
    });
  }
  
  // Sort transactions by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getDescriptionForCategory(category: string): string {
  const descriptions = {
    Housing: ['Rent Payment', 'Mortgage Payment', 'Home Insurance', 'Property Tax'],
    Transportation: ['Gas Station', 'Car Insurance', 'Public Transit', 'Uber Ride', 'Car Maintenance'],
    Food: ['Grocery Store', 'Restaurant', 'Coffee Shop', 'Food Delivery', 'Bakery'],
    Utilities: ['Electricity Bill', 'Water Bill', 'Internet Service', 'Phone Bill'],
    Entertainment: ['Movie Theater', 'Concert Tickets', 'Streaming Service', 'Book Store', 'Gaming Subscription'],
    Other: ['Shopping', 'Healthcare', 'Education', 'Personal Care', 'Gifts'],
  };
  
  const options = descriptions[category as keyof typeof descriptions] || ['Payment'];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomFutureDate(monthsAhead: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);
  return formatDate(date);
}

function generateInsights(
  riskAppetite: string,
  age: number,
  investments: string[],
  income: number,
  expenses: number
): Insight[] {
  const insights: Insight[] = [];
  
  // Check savings rate
  const savingsRate = (income - expenses) / income;
  if (savingsRate < 0.2) {
    insights.push({
      id: 'insight-1',
      type: 'warning',
      title: 'Increase Your Savings Rate',
      description: `Your current savings rate is ${Math.round(savingsRate * 100)}%. We recommend aiming for at least 20% to build long-term wealth.`,
      impact: 'high',
    });
  } else {
    insights.push({
      id: 'insight-1',
      type: 'tip',
      title: 'Great Savings Rate',
      description: `Your savings rate of ${Math.round(savingsRate * 100)}% is excellent. Consider maximizing tax-advantaged accounts.`,
      impact: 'medium',
    });
  }
  
  // Check diversification
  if (investments.length < 3) {
    insights.push({
      id: 'insight-2',
      type: 'warning',
      title: 'Diversify Your Investments',
      description: 'Your portfolio could benefit from more diversification. Consider adding more asset classes to reduce risk.',
      impact: 'medium',
    });
  }
  
  // Age-based recommendations
  if (age < 30) {
    if (riskAppetite === 'Low') {
      insights.push({
        id: 'insight-3',
        type: 'opportunity',
        title: 'Consider Higher Growth Potential',
        description: 'At your age, you might consider a more aggressive investment approach to maximize long-term growth potential.',
        impact: 'high',
      });
    }
    
    if (!investments.includes('Stocks')) {
      insights.push({
        id: 'insight-4',
        type: 'opportunity',
        title: 'Explore Stock Investments',
        description: 'Adding stocks to your portfolio could provide higher growth potential over the long term.',
        impact: 'medium',
      });
    }
  } else if (age >= 50) {
    if (riskAppetite === 'High') {
      insights.push({
        id: 'insight-3',
        type: 'warning',
        title: 'Consider Your Time Horizon',
        description: 'As you approach retirement, you might want to gradually reduce portfolio risk to protect your capital.',
        impact: 'high',
      });
    }
    
    if (!investments.includes('Bonds')) {
      insights.push({
        id: 'insight-4',
        type: 'tip',
        title: 'Consider Adding Bonds',
        description: 'Bonds can provide stability and income to your portfolio as you approach retirement.',
        impact: 'medium',
      });
    }
  }
  
  // Emergency fund tip
  insights.push({
    id: 'insight-5',
    type: 'tip',
    title: 'Emergency Fund Health',
    description: `Your emergency fund covers approximately ${Math.round((expenses * 3) / expenses)} months of expenses. The recommended amount is 3-6 months.`,
    impact: 'medium',
  });
  
  return insights.slice(0, 3); // Return only top 3 insights
}