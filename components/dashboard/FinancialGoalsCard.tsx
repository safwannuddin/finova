'use client';

import { motion } from 'framer-motion';
import { FinancialGoal } from '@/lib/mockData';
import { Clock, Target, Flag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FinancialGoalsCardProps {
  goals: FinancialGoal[];
}

export default function FinancialGoalsCard({ goals }: FinancialGoalsCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-muted-foreground';
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Flag className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <Flag className="h-4 w-4 text-green-500" />;
      default:
        return <Flag className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="overflow-hidden glass-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Financial Goals</CardTitle>
        <CardDescription>Track progress toward your goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {goals.map((goal, index) => {
            const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            
            return (
              <motion.div 
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mr-2">{getPriorityIcon(goal.priority)}</div>
                    <h4 className="font-medium text-sm">{goal.name}</h4>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(goal.deadline)}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="relative pt-1">
                    <Progress 
                      value={progress} 
                      className="h-2"
                      indicatorClassName={getProgressColor(progress)}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="font-medium">
                      {formatCurrency(goal.currentAmount)}
                      <span className="text-muted-foreground ml-1">of {formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div className="font-medium">{progress}%</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: goals.length * 0.2 + 0.2, duration: 0.5 }}
            className="pt-2"
          >
            <button className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center">
              <Target className="h-4 w-4 mr-2" />
              <span>Add New Goal</span>
            </button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}