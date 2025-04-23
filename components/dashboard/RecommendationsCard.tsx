import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FinancialGoal, ExperienceLevel } from '@/context/UserContext';
import { ArrowRight, TrendingUp, Coins, PiggyBank, HelpCircle, Goal, BarChart4 } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'budget' | 'investment' | 'saving' | 'debt' | 'protection' | 'tax';
  actionable: boolean;
  impact: 'high' | 'medium' | 'low';
  relevantGoals: FinancialGoal[];
  minExperienceLevel: ExperienceLevel;
}

interface RecommendationsCardProps {
  recommendations?: Recommendation[];
  experienceLevel: ExperienceLevel;
  goals: FinancialGoal[];
}

export function RecommendationsCard({ 
  recommendations = [], 
  experienceLevel = 'Beginner',
  goals = []
}: RecommendationsCardProps) {
  
  // Generate mock recommendations if none provided
  const allRecommendations: Recommendation[] = recommendations.length > 0 ? recommendations : [
    {
      id: '1',
      title: 'Create an emergency fund',
      description: 'Aim to save 3-6 months of essential expenses in a liquid account for emergencies.',
      category: 'saving',
      actionable: true,
      impact: 'high',
      relevantGoals: ['EmergencyFund'],
      minExperienceLevel: 'Beginner'
    },
    {
      id: '2',
      title: 'Optimize your 401(k) contributions',
      description: 'Make sure you\'re contributing enough to get your full employer match.',
      category: 'investment',
      actionable: true,
      impact: 'high',
      relevantGoals: ['Retirement'],
      minExperienceLevel: 'Beginner'
    },
    {
      id: '3',
      title: 'Refinance high-interest debt',
      description: 'Consider consolidating or refinancing high-interest debt to lower your interest payments.',
      category: 'debt',
      actionable: true,
      impact: 'medium',
      relevantGoals: ['DebtFreedom'],
      minExperienceLevel: 'Beginner'
    },
    {
      id: '4',
      title: 'Consider a Roth IRA conversion',
      description: 'Given current tax rates, converting some traditional IRA funds to Roth could be advantageous.',
      category: 'tax',
      actionable: true,
      impact: 'medium',
      relevantGoals: ['Retirement'],
      minExperienceLevel: 'Intermediate'
    },
    {
      id: '5',
      title: 'Review your asset allocation',
      description: 'Your current portfolio may be too conservative for your age and goals. Consider increasing equity exposure.',
      category: 'investment',
      actionable: true,
      impact: 'medium',
      relevantGoals: ['Retirement'],
      minExperienceLevel: 'Intermediate'
    },
    {
      id: '6',
      title: 'Implement tax-loss harvesting',
      description: 'Offset capital gains by selling investments that have experienced losses.',
      category: 'tax',
      actionable: true,
      impact: 'medium',
      relevantGoals: [],
      minExperienceLevel: 'Advanced'
    }
  ];
  
  // Filter recommendations based on user's experience level and goals
  const filteredRecommendations = allRecommendations.filter(rec => {
    // Filter by experience level (show recommendations at or below user's level)
    const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
    const userLevelIndex = experienceLevels.indexOf(experienceLevel);
    const recLevelIndex = experienceLevels.indexOf(rec.minExperienceLevel);
    
    if (recLevelIndex > userLevelIndex) return false;
    
    // Prioritize recommendations that align with user's goals
    if (goals.length > 0 && rec.relevantGoals.length > 0) {
      const hasRelevantGoal = rec.relevantGoals.some(goal => goals.includes(goal));
      if (!hasRelevantGoal) return false;
    }
    
    return true;
  });
  
  // Sort by impact level: high > medium > low
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 };
    return impactOrder[a.impact] - impactOrder[b.impact];
  }).slice(0, 6); // Limit to 6 recommendations
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget':
        return <PiggyBank className="h-5 w-5" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5" />;
      case 'saving':
        return <Coins className="h-5 w-5" />;
      case 'debt':
        return <BarChart4 className="h-5 w-5" />;
      case 'protection':
        return <HelpCircle className="h-5 w-5" />;
      case 'tax':
        return <Goal className="h-5 w-5" />;
      default:
        return <TrendingUp className="h-5 w-5" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'investment':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'saving':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'debt':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'protection':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'tax':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            High Impact
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Medium Impact
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Low Impact
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedRecommendations.length > 0 ? (
        sortedRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getCategoryColor(recommendation.category)}`}>
                  {getCategoryIcon(recommendation.category)}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={`${getCategoryColor(recommendation.category)} capitalize`}>
                      {recommendation.category}
                    </Badge>
                    {getImpactBadge(recommendation.impact)}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1">{recommendation.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {recommendation.description}
                  </p>
                  
                  {recommendation.actionable && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 justify-between group"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <p className="text-muted-foreground mb-4">
            No personalized recommendations available
          </p>
          <Button variant="outline">Complete Your Profile</Button>
        </div>
      )}
    </div>
  );
} 