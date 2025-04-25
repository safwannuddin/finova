'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

interface PortfolioAllocationCardProps {
  allocations?: AssetAllocation[];
  isLoading?: boolean;
  className?: string;
}

export default function PortfolioAllocationCard({ 
  allocations = [], 
  isLoading = false,
  className = ""
}: PortfolioAllocationCardProps) {
  const total = allocations.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className={`overflow-hidden glass-card h-full ${className}`}>
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

function renderPieChart(allocations: AssetAllocation[], total: number) {
  const segments: JSX.Element[] = [];
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