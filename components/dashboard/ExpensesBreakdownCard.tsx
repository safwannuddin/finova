import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ExpenseCategory {
  category: string;
  amount: number;
  color: string;
}

interface ExpensesBreakdownCardProps {
  expenses?: ExpenseCategory[];
  totalExpenses?: number;
  isLoading?: boolean;
  className?: string;
}

export default function ExpensesBreakdownCard({
  expenses = [],
  totalExpenses = 0,
  isLoading = false,
  className = ""
}: ExpensesBreakdownCardProps) {
  // Sort expenses by amount (highest first)
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
  
  // Format currency
  const formatCurrency = (amount: number) => {
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
        <CardTitle className="text-lg font-medium">Expenses Breakdown</CardTitle>
        <CardDescription>Monthly spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="space-y-4">
            {sortedExpenses.length > 0 ? (
              <>
                <div className="text-2xl font-bold">
                  {formatCurrency(totalExpenses)}
                </div>
                <div className="space-y-2">
                  {sortedExpenses.map((expense) => (
                    <div key={expense.category} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{expense.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(expense.amount)} ({((expense.amount / totalExpenses) * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(expense.amount / totalExpenses) * 100}%`,
                            backgroundColor: expense.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground pt-2">
                  Based on your transactions from the last 30 days
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="text-sm text-muted-foreground">
                  No expense data available
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 