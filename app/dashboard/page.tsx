'use client';

import Dashboard from "@/components/dashboard/Dashboard";
import { AdvancedCharts } from "@/components/dashboard/AdvancedCharts";
import { GoalsProgressCard } from "@/components/dashboard/GoalsProgressCard";
import { FinancialHealthCard } from "@/components/dashboard/FinancialHealthCard";
import { BudgetCard } from "@/components/dashboard/BudgetCard";
import StockMarketIndicesCard from "@/components/dashboard/StockMarketIndicesCard";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import ExpensesBreakdownCard from "@/components/dashboard/ExpensesBreakdownCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, LineChart, BarChart3, TrendingUp } from "lucide-react";
import ChatbotButton from "@/components/ai/ChatbotButton";
import PortfolioAllocationCard from "@/components/dashboard/PortfolioAllocationCard";

export default function DashboardPage() {
  // Mock data for demonstration
  const mockHealthMetrics = [
    {
      id: "1",
      name: "Savings Rate",
      value: 85,
      description: "You're saving 25% of your income",
      status: "good" as const
    },
    {
      id: "2",
      name: "Debt Management",
      value: 92,
      description: "Your debt-to-income ratio is healthy",
      status: "good" as const
    },
    {
      id: "3",
      name: "Investment Diversity",
      value: 75,
      description: "Portfolio could be more diversified",
      status: "warning" as const
    }
  ];

  const mockExpenses = [
    { 
      category: "Housing", 
      amount: 2000, 
      color: "hsl(217, 91%, 60%)" // Primary blue
    },
    { 
      category: "Transportation", 
      amount: 500, 
      color: "hsl(187, 100%, 42%)" // Teal
    },
    { 
      category: "Food", 
      amount: 800, 
      color: "hsl(47, 95%, 57%)" // Accent yellow
    },
    { 
      category: "Utilities", 
      amount: 300, 
      color: "hsl(142, 76%, 36%)" // Green
    },
    { 
      category: "Entertainment", 
      amount: 400, 
      color: "hsl(346, 87%, 60%)" // Pink
    }
  ];

  const portfolioAllocations = [
    {
      name: "Stocks",
      value: 50000,
      color: "hsl(217, 91%, 60%)" // Primary blue
    },
    {
      name: "Bonds",
      value: 25000,
      color: "hsl(187, 100%, 42%)" // Teal
    },
    {
      name: "Real Estate",
      value: 15000,
      color: "hsl(47, 95%, 57%)" // Accent yellow
    },
    {
      name: "Crypto",
      value: 5000,
      color: "hsl(142, 76%, 36%)" // Green
    },
    {
      name: "Cash",
      value: 5000,
      color: "hsl(346, 87%, 60%)" // Pink
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Top Row - Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <NetWorthCard 
            netWorth={125000} 
            monthlyChange={3500} 
          />
          <FinancialHealthCard 
            score={85} 
            metrics={mockHealthMetrics}
            debtAmount={15000}
            creditScore={750}
          />
          <BudgetCard 
            budget={{
              necessities: 50,
              wants: 30,
              savings: 20
            }}
            monthlyIncome={8500}
          />
        </div>

        {/* Advanced Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Market
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PortfolioAllocationCard allocations={portfolioAllocations} />
              <AdvancedCharts />
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GoalsProgressCard 
                goals={[
                  {
                    id: "1",
                    title: "Emergency Fund",
                    type: "EmergencyFund",
                    targetAmount: 25000,
                    currentAmount: 15000,
                    timeHorizon: "ShortTerm",
                    targetDate: new Date("2024-12-31")
                  },
                  {
                    id: "2",
                    title: "House Down Payment",
                    type: "HomePurchase",
                    targetAmount: 60000,
                    currentAmount: 20000,
                    timeHorizon: "MediumTerm",
                    targetDate: new Date("2025-06-30")
                  }
                ]} 
              />
              <ExpensesBreakdownCard 
                expenses={mockExpenses}
                totalExpenses={4000}
              />
            </div>
          </TabsContent>

          <TabsContent value="expenses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExpensesBreakdownCard 
                expenses={mockExpenses}
                totalExpenses={4000}
              />
              <BudgetCard 
                budget={{
                  necessities: 50,
                  wants: 30,
                  savings: 20
                }}
                monthlyIncome={8500}
              />
            </div>
          </TabsContent>

          <TabsContent value="market">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StockMarketIndicesCard 
                indices={[
                  {
                    name: "S&P 500",
                    symbol: "SPX",
                    value: 4850,
                    change: 25.5,
                    changePercent: 0.53
                  },
                  {
                    name: "Dow Jones",
                    symbol: "DJI",
                    value: 38750,
                    change: 155.2,
                    changePercent: 0.40
                  },
                  {
                    name: "NASDAQ",
                    symbol: "IXIC",
                    value: 15320,
                    change: -45.8,
                    changePercent: -0.30
                  }
                ]} 
              />
              <AdvancedCharts />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* AI Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}