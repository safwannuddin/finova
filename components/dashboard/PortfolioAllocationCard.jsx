'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PortfolioAllocationCard({ assets = [], isLoading = false }) {
  if (isLoading || !assets || assets.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[220px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Sort assets by percentage (descending)
  const sortedAssets = [...assets].sort((a, b) => b.percentage - a.percentage);
  
  // Calculate total to ensure percentages add up to 100%
  const total = sortedAssets.reduce((sum, asset) => sum + asset.percentage, 0);
  
  // Generate a custom palette for the assets
  const assetColors = sortedAssets.map((_, index) => {
    // This gives a nice spread of colors
    return `hsl(var(--chart-${(index % 5) + 1}))`;
  });

  return (
    <Card className="h-full bg-card glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Portfolio Allocation</CardTitle>
            <CardDescription>Distribution of your investment assets</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-xs">
                  This shows how your investments are distributed across different asset classes,
                  helping you visualize your portfolio diversification.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Pie chart */}
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              {sortedAssets.map((asset, index) => {
                // Calculate the slice
                const previousPercentages = sortedAssets
                  .slice(0, index)
                  .reduce((sum, a) => sum + a.percentage, 0);
                
                const normalizedPercentage = (asset.percentage / total) * 100;
                const startAngle = (previousPercentages / total) * 360;
                const endAngle = startAngle + (normalizedPercentage / 100) * 360;
                
                // Convert to coordinates
                const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                // Determine if the slice is more than 180 degrees
                const largeArcFlag = normalizedPercentage > 50 ? 1 : 0;
                
                // Create the path
                const path = [
                  `M 50 50`,
                  `L ${startX} ${startY}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                  'Z'
                ].join(' ');
                
                return (
                  <path
                    key={asset.name}
                    d={path}
                    fill={assetColors[index] || 'currentColor'}
                    stroke="hsl(var(--background))"
                    strokeWidth="1"
                  />
                );
              })}
              <circle cx="50" cy="50" r="25" fill="hsl(var(--background))" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex-1 space-y-3">
            {sortedAssets.map((asset, index) => (
              <motion.div
                key={asset.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: assetColors[index] }}
                  />
                  <span className="text-sm">{asset.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {asset.percentage.toFixed(1)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Original PortfolioAllocationCard component (for backward compatibility)
export default function OriginalPortfolioAllocationCard({ 
  allocations = [], 
  isLoading = false 
}) {
  const total = allocations.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Portfolio Allocation</CardTitle>
        <CardDescription>Your investment distribution by asset class</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Simple pie chart visualization */}
            <div className="relative h-40 w-40 mx-auto">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {allocations.length > 0 ? (
                  renderPieChart(allocations, total)
                ) : (
                  <circle cx="50" cy="50" r="40" fill="#f3f4f6" />
                )}
              </svg>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              {allocations.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {((item.value / total) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function renderPieChart(allocations, total) {
  const segments = [];
  let cumulativePercent = 0;
  
  allocations.forEach((item) => {
    const percent = (item.value / total) * 100;
    if (percent === 0) return;
    
    // SVG coordinates
    const startX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 40 + 50;
    const startY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 40 + 50;
    
    cumulativePercent += percent;
    
    const endX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 40 + 50;
    const endY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 40 + 50;
    
    // Create an SVG path for the pie segment
    const largeArcFlag = percent > 50 ? 1 : 0;
    const pathData = [
      `M 50 50`,
      `L ${startX} ${startY}`,
      `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');
    
    segments.push(
      <path
        key={item.name}
        d={pathData}
        fill={item.color}
      />
    );
  });
  
  return segments;
} 