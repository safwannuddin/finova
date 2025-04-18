'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { NetWorth } from '@/lib/mockData';
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

interface NetWorthCardProps {
  netWorth: NetWorth;
}

export default function NetWorthCard({ netWorth }: NetWorthCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate the monthly change percentage
  const lastMonth = netWorth.history[netWorth.history.length - 2]?.value || 0;
  const currentMonth = netWorth.history[netWorth.history.length - 1]?.value || 0;
  const monthlyChangePercent = lastMonth ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;
  const isPositiveChange = monthlyChangePercent >= 0;
  
  // Format data for the chart
  const chartData = netWorth.history.slice(-12).map((point) => ({
    date: point.date,
    value: point.value,
  }));
  
  // Get formatted month names for the x-axis
  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <motion.div 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {formatCurrency(netWorth.total)}
            </motion.div>
            
            <div className="flex items-center mt-1">
              <div 
                className={`flex items-center ${
                  isPositiveChange ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isPositiveChange ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(monthlyChangePercent).toFixed(1)}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                vs last month
              </span>
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground text-sm mb-1">Assets</div>
            <motion.div 
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {formatCurrency(netWorth.assets)}
            </motion.div>
          </div>
          
          <div>
            <div className="text-muted-foreground text-sm mb-1">Liabilities</div>
            <motion.div 
              className="text-lg font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {formatCurrency(netWorth.liabilities)}
            </motion.div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="hsl(var(--muted))" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatMonth}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString('en-US', { notation: 'compact' })}`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <RechartsTooltip
                formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
                labelFormatter={(date) => formatMonth(date as string)}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
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