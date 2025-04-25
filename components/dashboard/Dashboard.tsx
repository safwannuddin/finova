'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { generateMockPortfolio, generateMarketIndices, Portfolio, MarketIndex } from '@/lib/mockData';
import Header from '@/components/dashboard/Header';
import NetWorthCard from '@/components/dashboard/NetWorthCard';
import PortfolioAllocationCard from '@/components/dashboard/PortfolioAllocationCard';
import { BudgetCard } from '@/components/dashboard/BudgetCard';
import { FinancialHealthCard } from '@/components/dashboard/FinancialHealthCard';
import InsightsCard from '@/components/dashboard/InsightsCard';
import StockMarketIndicesCard from '@/components/dashboard/StockMarketIndicesCard';
import { GoalsProgressCard } from '@/components/dashboard/GoalsProgressCard';
import ExpensesBreakdownCard from '@/components/dashboard/ExpensesBreakdownCard';
import ChatbotButton from '@/components/ai/ChatbotButton';
import { generateFinancialInsights } from '@/lib/mockDataGenerators';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  description: string;
  status: "good" | "warning" | "poor";
}

interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  actionable: boolean;
  impact: string;
  relevantGoals: string[];
  minExperienceLevel: string;
}

interface Asset {
  name: string;
  value: number;
  allocation: number;
  performance: number;
  riskLevel: string;
  style?: string;
}

interface Goal {
  id: string;
  title: string;
  type: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: number;
  timeHorizon: string;
}

interface FinancialInsights {
  healthScore: number;
  healthMetrics: HealthMetric[];
  marketInsights: Array<{
    title: string;
    description: string;
    source: string;
    date: string;
  }>;
  recommendations: FinancialInsight[];
}

export default function Dashboard() {
  const { user } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [insights, setInsights] = useState<FinancialInsights | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      // Simulate API call to fetch portfolio data
      setTimeout(() => {
        const mockPortfolio = generateMockPortfolio(
          user.monthlyIncome || 5000,
          user.age || 30,
          user.riskAppetite || 'Medium',
          user.investments || ['Stocks', 'Bonds', 'ETFs']
        );
        const mockInsights = generateFinancialInsights(user);
        setPortfolio(mockPortfolio);
        setInsights(mockInsights as FinancialInsights);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="inline-block relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s check your portfolio&apos;s performance
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Net Worth Card - Spans 2 columns */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NetWorthCard 
              netWorth={portfolio.netWorth.total} 
              monthlyChange={portfolio.netWorth.total * 0.03} 
            />
          </motion.div>

          {/* Financial Health Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FinancialHealthCard 
              score={insights?.healthScore} 
              metrics={insights?.healthMetrics}
              debtAmount={user?.debtAmount}
              creditScore={user?.creditScore}
            />
          </motion.div>

          {/* Portfolio Allocation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PortfolioAllocationCard 
              allocations={portfolio.assets.map(asset => ({
                name: asset.name,
                value: asset.value,
                color: '#10B981' // Default color for all assets
              }))}
            />
          </motion.div>

          {/* Market Indices */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StockMarketIndicesCard indices={generateMarketIndices()} />
          </motion.div>

          {/* Budget Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BudgetCard 
              budget={user?.budgetAllocation}
              monthlyIncome={user?.monthlyIncome}
            />
          </motion.div>

          {/* Goals Progress - Spans 2 columns */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GoalsProgressCard goals={portfolio.financialGoals} />
          </motion.div>

          {/* Expenses Breakdown */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ExpensesBreakdownCard 
              expenses={portfolio.spendingBreakdown}
              totalExpenses={portfolio.monthlyExpenses}
            />
          </motion.div>

          {/* AI Insights Card - Spans full width */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <InsightsCard insights={portfolio.insights} />
          </motion.div>
        </div>
      </main>

      {/* AI Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}