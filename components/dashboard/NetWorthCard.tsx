'use client';

import React from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';

interface NetWorthCardProps {
  netWorth?: number;
  monthlyChange?: number;
  isLoading?: boolean;
  className?: string;
}

export default function NetWorthCard({ 
  netWorth = 0, 
  monthlyChange = 0, 
  isLoading = false,
  className = ""
}: NetWorthCardProps) {
  const formattedNetWorth = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(netWorth);

  const changePercentage = (monthlyChange / (netWorth - monthlyChange)) * 100;
  const isPositiveChange = monthlyChange >= 0;

  return (
    <Card className={`overflow-hidden glass-card h-full ${className}`}>
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