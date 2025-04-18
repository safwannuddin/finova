'use client';

import { PerformancePoint } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceCardProps {
  history: PerformancePoint[];
}

export default function PerformanceCard({ history }: PerformanceCardProps) {
  // Format data for the chart
  const chartData = history.map((point) => ({
    date: point.date,
    value: point.value,
  }));
  
  // Get formatted month names for the x-axis
  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };
  
  // Calculate percentage change
  const startValue = history[0]?.value || 0;
  const endValue = history[history.length - 1]?.value || 0;
  const percentChange = startValue ? ((endValue - startValue) / startValue) * 100 : 0;
  
  // Filter data for different time periods
  const oneYearData = chartData.slice(-12);
  const sixMonthData = chartData.slice(-6);
  const threeMonthData = chartData.slice(-3);

  return (
    <Card className="overflow-hidden glass-card h-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div>
            <CardTitle className="text-xl">Portfolio Performance</CardTitle>
            <CardDescription>Historical portfolio value over time</CardDescription>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <div 
              className={`text-lg font-semibold ${
                percentChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Total Growth
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="1y" className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none">
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
          
          <div className="p-4">
            <TabsContent value="3m" className="m-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={threeMonthData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted))" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatMonth}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['dataMin - 10', 'dataMax + 10']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}`, 'Portfolio Value']}
                    labelFormatter={(date) => formatMonth(date as string)}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="6m" className="m-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sixMonthData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted))" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatMonth}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={['dataMin - 10', 'dataMax + 10']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}`, 'Portfolio Value']}
                    labelFormatter={(date) => formatMonth(date as string)}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="1y" className="m-0 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={oneYearData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted))" opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatMonth}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={['dataMin - 10', 'dataMax + 10']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}`, 'Portfolio Value']}
                    labelFormatter={(date) => formatMonth(date as string)}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}