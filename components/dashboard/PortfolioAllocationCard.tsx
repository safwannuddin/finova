'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Asset } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend,
} from 'recharts';

interface PortfolioAllocationCardProps {
  assets: Asset[];
}

export default function PortfolioAllocationCard({ assets }: PortfolioAllocationCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatAssetType = (type: string) => {
    switch (type) {
      case 'stock':
        return 'Stocks';
      case 'bond':
        return 'Bonds';
      case 'crypto':
        return 'Crypto';
      case 'real_estate':
        return 'Real Estate';
      case 'mutual_fund':
        return 'Mutual Funds';
      case 'etf':
        return 'ETFs';
      case 'cash':
        return 'Cash';
      default:
        return type;
    }
  };
  
  // Group assets by type for the pie chart
  const assetsByType = assets.reduce((acc: Record<string, number>, asset) => {
    const type = asset.type;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type] += asset.value;
    return acc;
  }, {});
  
  const pieData = Object.entries(assetsByType).map(([type, value], index) => ({
    name: formatAssetType(type),
    value,
    color: `var(--chart-${(index % 5) + 1})`,
  }));
  
  // Top assets by value
  const topAssets = [...assets]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 3}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))">
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))">
          {`${formatCurrency(value)} (${(percent * 100).toFixed(1)}%)`}
        </text>
      </g>
    );
  };

  return (
    <Card className="overflow-hidden glass-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Portfolio Allocation</CardTitle>
        <CardDescription>Asset distribution by type</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="allocation" className="w-full">
          <TabsList className="grid grid-cols-2 w-full rounded-none">
            <TabsTrigger value="allocation">By Type</TabsTrigger>
            <TabsTrigger value="holdings">Top Holdings</TabsTrigger>
          </TabsList>
          <TabsContent value="allocation" className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    activeIndex={activeIndex !== null ? activeIndex : undefined}
                    activeShape={renderActiveShape}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="holdings" className="p-4">
            <div className="space-y-4">
              {topAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(asset.value)}</div>
                      <div className="text-xs text-muted-foreground">
                        {(asset.allocation * 100).toFixed(1)}% of portfolio
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${asset.allocation * 100}%`,
                        backgroundColor: `var(--chart-${(index % 5) + 1})`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}