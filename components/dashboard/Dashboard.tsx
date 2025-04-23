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
import { FinancialHealthCard } from '@/components/dashboard/FinancialHealthCard';
import { BudgetCard } from '@/components/dashboard/BudgetCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { generateFinancialInsights } from '@/lib/mockDataGenerators';
import { LightbulbIcon, Award, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { RecommendationsCard } from '@/components/dashboard/RecommendationsCard';
import { LearningResourcesCard } from '@/components/dashboard/LearningResourcesCard';

export default function Dashboard() {
  const { user } = useUser();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [insights, setInsights] = useState<any>(null);
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

  // Get user experience level for personalized content
  const experienceLevel = user?.experienceLevel || 'Beginner';
  const userFirstName = user?.name?.split(' ')[0] || 'there';
  
  // Check if user has completed key setup steps
  const hasCompletedBudget = user?.budgetAllocation && Object.keys(user.budgetAllocation).length > 0;
  const hasSetGoals = user?.primaryGoals && user.primaryGoals.length > 0;
  const hasInvestments = user?.investments && user.investments.length > 0;

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
        
        {/* Personalized Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back, {userFirstName}
          </h1>
          <p className="text-muted-foreground">
            {experienceLevel === 'Beginner' 
              ? "Let's continue building your financial foundation." 
              : experienceLevel === 'Intermediate'
                ? "Here's how your financial picture is developing."
                : "Let's review your advanced financial portfolio."}
          </p>
        </div>
        
        {/* Action items alert - shown if needed */}
        {(!hasCompletedBudget || !hasSetGoals || !hasInvestments) && (
          <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Action items needed</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="space-y-2">
                {!hasCompletedBudget && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full border border-amber-500/50 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs text-amber-500">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Complete your budget allocation</p>
                      <p className="text-xs text-muted-foreground">This helps us provide better recommendations</p>
                    </div>
                  </div>
                )}
                {!hasSetGoals && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full border border-amber-500/50 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs text-amber-500">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Define your financial goals</p>
                      <p className="text-xs text-muted-foreground">Set clear targets for your financial journey</p>
                    </div>
                  </div>
                )}
                {!hasInvestments && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full border border-amber-500/50 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-xs text-amber-500">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Start your investment journey</p>
                      <p className="text-xs text-muted-foreground">Even small investments can grow over time</p>
                    </div>
                  </div>
                )}
                <Button size="sm" className="mt-2" variant="outline">
                  Complete Setup
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            className="lg:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <NetWorthCard netWorth={portfolio.netWorth.currentAmount} monthlyChange={portfolio.netWorth.change} />
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
            <PortfolioAllocationCard allocations={portfolio.assets.map(asset => ({
              name: asset.name,
              value: asset.percentage, 
              color: asset.color || '#10B981'
            }))} />
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
        
        {/* Financial Goals and Health */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Goals Progress */}
          {loading ? (
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[220px] w-full" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Financial Goals</CardTitle>
                <CardDescription>Track progress toward your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                  <p className="text-sm text-muted-foreground">
                    Goals tracking is currently being set up
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Financial Health */}
          {loading ? (
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[220px] w-full" />
              </CardContent>
            </Card>
          ) : (
            <FinancialHealthCard 
              score={insights?.healthScore} 
              metrics={insights?.healthMetrics}
              debtAmount={user?.debtAmount}
              creditScore={user?.creditScore}
            />
          )}
        </div>
        
        {/* Personalized Content Based on User Level */}
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center">
          <LightbulbIcon className="mr-2 h-6 w-6 text-primary" />
          Personalized for You
        </h2>
        
        <Tabs defaultValue="recommendations" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="recommendations" className="flex items-center">
              <Award className="mr-1.5 h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center">
              <BookOpen className="mr-1.5 h-4 w-4" />
              Learning Resources
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center">
              <TrendingUp className="mr-1.5 h-4 w-4" />
              Market Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : (
              <RecommendationsCard 
                recommendations={insights?.recommendations} 
                experienceLevel={experienceLevel}
                goals={user?.primaryGoals || []}
              />
            )}
          </TabsContent>
          
          <TabsContent value="learning">
            {loading ? (
              <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
              </div>
            ) : (
              <LearningResourcesCard 
                topics={user?.interestedTopics || []} 
                learningStyle={user?.preferredLearningStyle || 'Visual'}
                experienceLevel={experienceLevel}
              />
            )}
          </TabsContent>
          
          <TabsContent value="insights">
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>
                    Relevant market trends based on your portfolio and interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights?.marketInsights?.map((insight: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg bg-card/50">
                        <h3 className="font-medium text-card-foreground mb-1">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-primary">{insight.source}</span>
                          <span className="text-muted-foreground">{insight.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatbotButton />
    </motion.div>
  );
}