import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FinancialGoal, TimeHorizon } from '@/context/UserContext';
import { Target, Calendar, CheckCircle2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  type: FinancialGoal;
  targetAmount: number;
  currentAmount: number;
  timeHorizon: TimeHorizon;
  targetDate?: Date;
}

interface GoalsProgressCardProps {
  goals?: Goal[];
  isLoading?: boolean;
}

export function GoalsProgressCard({ goals = [], isLoading = false }: GoalsProgressCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeHorizonLabel = (timeHorizon: TimeHorizon) => {
    switch (timeHorizon) {
      case 'ShortTerm':
        return 'Short Term';
      case 'MediumTerm':
        return 'Medium Term';
      case 'LongTerm':
        return 'Long Term';
      default:
        return timeHorizon;
    }
  };

  const getTimeHorizonColor = (timeHorizon: TimeHorizon) => {
    switch (timeHorizon) {
      case 'ShortTerm':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'MediumTerm':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'LongTerm':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Financial Goals</CardTitle>
          </div>
          {goals.length > 0 && (
            <Badge variant="outline" className="font-normal">
              {goals.length} {goals.length === 1 ? 'Goal' : 'Goals'}
            </Badge>
          )}
        </div>
        <CardDescription>Track progress toward your financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
          </div>
        ) : goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{goal.title}</span>
                        {progress === 100 && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <Badge variant="outline" className={`${getTimeHorizonColor(goal.timeHorizon)} text-xs`}>
                          {getTimeHorizonLabel(goal.timeHorizon)}
                        </Badge>
                        {goal.targetDate && (
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(goal.targetDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">{progress}% complete</div>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Target className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
            <p className="text-sm text-muted-foreground">
              You haven&apos;t set any financial goals yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 