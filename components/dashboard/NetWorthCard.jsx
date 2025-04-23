'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

export function NetWorthCard({ data, isLoading = false }) {
  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const { currentAmount, trend, lastMonthAmount } = data;
  
  const formattedNetWorth = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(currentAmount);

  const change = currentAmount - lastMonthAmount;
  const changePercentage = ((change / lastMonthAmount) * 100).toFixed(1);
  const isPositiveChange = change >= 0;

  // Sample data for the area chart
  const chartData = trend.map(point => ({
    date: point.date,
    amount: point.amount,
  }));

  return (
    <Card className="bg-card h-full glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Net Worth</CardTitle>
            <CardDescription>Your total assets minus liabilities</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-xs">
                  Your net worth is calculated as the sum of all your assets (investments, cash, property) 
                  minus your total liabilities (debts, loans, mortgages).
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold">{formattedNetWorth}</h3>
            <div className={`flex items-center ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
              {isPositiveChange ? (
                <ArrowUpRight size={20} className="mr-1" />
              ) : (
                <ArrowDownRight size={20} className="mr-1" />
              )}
              <span className="font-medium">
                {isPositiveChange ? '+' : ''}{changePercentage}%
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {isPositiveChange ? 'Increased' : 'Decreased'} by {
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(Math.abs(change))
            } since last month
          </p>
        </div>
        
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short' });
                }}
              />
              <YAxis 
                hide={true}
                domain={['dataMin * 0.95', 'dataMax * 1.05']}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover p-2 rounded-md border shadow-md">
                        <p className="text-sm text-popover-foreground">
                          {new Date(payload[0].payload.date).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-base font-medium">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0,
                          }).format(payload[0].value)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#netWorthGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Original NetWorthCard component (keep for backward compatibility)
export default function OriginalNetWorthCard({ netWorth = 0, monthlyChange = 0, isLoading = false }) {
  const formattedNetWorth = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(netWorth);

  const changePercentage = (monthlyChange / (netWorth - monthlyChange)) * 100;
  const isPositiveChange = monthlyChange >= 0;

  return (
    <Card className="overflow-hidden glass-card h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">Net Worth</CardTitle>
            <CardDescription>Your total assets minus liabilities</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-xs">
                  Your net worth is calculated as the sum of all your assets (investments, cash, property) 
                  minus your total liabilities (debts, loans, mortgages).
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-36 mb-2" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <div className="text-3xl font-bold mb-1">{formattedNetWorth}</div>
            <div className={`text-sm flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              {isPositiveChange ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}% from last month
              <span className="text-gray-500 ml-1">
                ({new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyChange)})
              </span>
            </div>
            
            {/* Simple graph visualization */}
            <div className="mt-4 h-10 bg-gray-100 rounded-md overflow-hidden">
              <div 
                className={`h-full ${isPositiveChange ? 'bg-green-500' : 'bg-red-500'}`} 
                style={{ width: `${Math.min(Math.abs(changePercentage) * 2, 100)}%` }}
              ></div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
} 