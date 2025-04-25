import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp, AlertCircle, Landmark, CreditCard } from 'lucide-react';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  description: string;
  status: 'good' | 'warning' | 'poor';
}

interface FinancialHealthCardProps {
  score?: number;
  isLoading?: boolean;
  className?: string;
  metrics?: HealthMetric[];
  debtAmount?: number;
  creditScore?: number;
}

export default function FinancialHealthCard({ 
  score = 0, 
  isLoading = false,
  className = "",
  metrics = [],
  debtAmount,
  creditScore
}: FinancialHealthCardProps) {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'poor':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return 'Not provided';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={`overflow-hidden glass-card h-full ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium">Financial Health</CardTitle>
        </div>
        <CardDescription>A snapshot of your overall financial wellbeing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {score}/100
            </span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
        
        {metrics.length > 0 && (
          <div className="space-y-4 mb-6">
            {metrics.map((metric) => (
              <div key={metric.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(metric.status)}
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${getScoreColor(metric.value)}`}>
                    {metric.value}/100
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Landmark className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Debt</span>
            </div>
            <p className="text-sm font-medium">{formatCurrency(debtAmount)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Credit Score</span>
            </div>
            <p className="text-sm font-medium">{creditScore || 'Not provided'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 