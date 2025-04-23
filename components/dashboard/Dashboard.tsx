'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { generateMockPortfolio, Portfolio } from '@/lib/mockData';
import Header from '@/components/dashboard/Header';
import NetWorthCard from '@/components/dashboard/NetWorthCard';
import PortfolioAllocationCard from '@/components/dashboard/PortfolioAllocationCard';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import SpendingBreakdownCard from '@/components/dashboard/SpendingBreakdownCard';
import FinancialGoalsCard from '@/components/dashboard/FinancialGoalsCard';
import TransactionsCard from '@/components/dashboard/TransactionsCard';
import InsightsCard from '@/components/dashboard/InsightsCard';
import InvestmentRecommendations from '@/components/dashboard/InvestmentRecommendations';
import ChatbotButton from '@/components/ai/ChatbotButton';

export default function Dashboard() {
  const { user } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      // Simulate API call to fetch portfolio data
      setTimeout(() => {
        const mockPortfolio = generateMockPortfolio(
          user.monthlyIncome,
          user.age,
          user.riskAppetite,
          user.investments
        );
        setPortfolio(mockPortfolio);
        setLoading(false);
      }, 800);
    }
  }, [user]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="inline-block relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Generating your financial dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!portfolio) return null;

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
          Welcome to Your <span className="text-primary">AI-Powered</span> Financial Hub
        </h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <NetWorthCard netWorth={portfolio.netWorth} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <InsightsCard insights={portfolio.insights} />
          </motion.div>
          
          <motion.div
            className="lg:col-span-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <InvestmentRecommendations />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <PortfolioAllocationCard assets={portfolio.assets} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SpendingBreakdownCard categories={portfolio.spendingBreakdown} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FinancialGoalsCard goals={portfolio.financialGoals} />
          </motion.div>
          
          <motion.div
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <PerformanceCard history={portfolio.performanceHistory} />
          </motion.div>
          
          <motion.div
            className="lg:col-span-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <TransactionsCard transactions={portfolio.monthlyTransactions} />
          </motion.div>
        </div>
      </main>
      
      <ChatbotButton />
    </motion.div>
  );
}