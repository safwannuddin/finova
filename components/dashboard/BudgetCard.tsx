import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/context/UserContext';
import { DollarSign, PieChart } from 'lucide-react';

interface BudgetCardProps {
  budget?: User['budgetAllocation'];
  monthlyIncome?: number;
  isLoading?: boolean;
}

export function BudgetCard({ 
  budget, 
  monthlyIncome = 0,
  isLoading = false 
}: BudgetCardProps) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const categoryColors = {
    necessities: '#10B981', // green-500
    wants: '#6366F1', // indigo-500
    savings: '#3B82F6', // blue-500
  };

  const calculateAmount = (percentage: number) => {
    return (percentage / 100) * monthlyIncome;
  };

  // Check if budget data is available
  const hasBudgetData = budget && Object.keys(budget).length > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-medium">Budget Allocation</CardTitle>
          </div>
        </div>
        <CardDescription>Your monthly budget breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
            <div className="h-16 w-full animate-pulse rounded-md bg-muted"></div>
          </div>
        ) : hasBudgetData ? (
          <div className="space-y-6">
            <div className="relative flex aspect-square h-32 w-32 mx-auto">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {/* SVG Pie Chart */}
                {Object.entries(budget).map(([category, percentage], index) => {
                  // Calculate the slice
                  const previousPercentages = Object.entries(budget)
                    .slice(0, index)
                    .reduce((sum, [_, value]) => sum + (value as number), 0);
                  
                  const startAngle = (previousPercentages / 100) * 360;
                  const endAngle = ((previousPercentages + (percentage as number)) / 100) * 360;
                  
                  // Convert to coordinates
                  const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
                  const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
                  const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
                  const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));
                  
                  // Determine if the slice is more than 180 degrees
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                  
                  // Create the path
                  const path = [
                    `M 50 50`,
                    `L ${startX} ${startY}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    'Z'
                  ].join(' ');
                  
                  return (
                    <path
                      key={category}
                      d={path}
                      fill={categoryColors[category as keyof typeof categoryColors] || '#94A3B8'}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-3">
              {Object.entries(budget).map(([category, percentage]) => (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: categoryColors[category as keyof typeof categoryColors] }}
                      ></div>
                      <span className="capitalize text-sm font-medium">{category}</span>
                    </div>
                    <span className="text-sm">{percentage}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(calculateAmount(percentage as number))} / month
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-2 border-t text-center">
              <div className="text-sm text-muted-foreground">Monthly Income</div>
              <div className="text-lg font-bold">{formatCurrency(monthlyIncome)}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <DollarSign className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
            <p className="text-sm text-muted-foreground">
              You haven&apos;t set up your budget allocation yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 