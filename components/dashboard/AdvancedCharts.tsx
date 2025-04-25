'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Professional color palette with gradients
const pieData = [
  { name: 'Stocks', value: 45, color: 'url(#stocksGradient)' },
  { name: 'Bonds', value: 25, color: 'url(#bondsGradient)' },
  { name: 'Real Estate', value: 15, color: 'url(#realEstateGradient)' },
  { name: 'Cash', value: 10, color: 'url(#cashGradient)' },
  { name: 'Crypto', value: 5, color: 'url(#cryptoGradient)' },
];

const performanceData = [
  { month: 'Jan', stocks: 4000, bonds: 2400, crypto: 1800 },
  { month: 'Feb', stocks: 4200, bonds: 2600, crypto: 1600 },
  { month: 'Mar', stocks: 4500, bonds: 2800, crypto: 2000 },
  { month: 'Apr', stocks: 4800, bonds: 2900, crypto: 2200 },
  { month: 'May', stocks: 5000, bonds: 3000, crypto: 2400 },
  { month: 'Jun', stocks: 5200, bonds: 3100, crypto: 2100 },
];

const monthlyData = [
  { name: 'Income', amount: 8500 },
  { name: 'Expenses', amount: 5500 },
  { name: 'Savings', amount: 3000 },
  { name: 'Investments', amount: 2000 },
];

interface AdvancedChartsProps {
  className?: string;
}

export function AdvancedCharts({ className = "" }: AdvancedChartsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}
    >
      {/* Asset Allocation Pie Chart */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="backdrop-blur-sm bg-background/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Asset Allocation
            </CardTitle>
            <CardDescription>Portfolio distribution by asset class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="stocksGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                    <linearGradient id="bondsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#2DD4BF" />
                    </linearGradient>
                    <linearGradient id="realEstateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="cryptoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#F472B6" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Area Chart */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="backdrop-blur-sm bg-background/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Portfolio Performance
            </CardTitle>
            <CardDescription>6-month asset performance trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="stocksArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="bondsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="cryptoArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="stocks"
                    stackId="1"
                    stroke="#4F46E5"
                    fill="url(#stocksArea)"
                  />
                  <Area
                    type="monotone"
                    dataKey="bonds"
                    stackId="1"
                    stroke="#0EA5E9"
                    fill="url(#bondsArea)"
                  />
                  <Area
                    type="monotone"
                    dataKey="crypto"
                    stackId="1"
                    stroke="#EC4899"
                    fill="url(#cryptoArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Overview Bar Chart */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="md:col-span-2"
      >
        <Card className="backdrop-blur-sm bg-background/95 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Monthly Overview
            </CardTitle>
            <CardDescription>Financial flow analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <defs>
                    {['income', 'expenses', 'savings', 'investments'].map((id, index) => (
                      <linearGradient key={id} id={`${id}Gradient`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={
                          index === 0 ? '#10B981' :
                          index === 1 ? '#EF4444' :
                          index === 2 ? '#F59E0B' :
                          '#6366F1'
                        } />
                        <stop offset="100%" stopColor={
                          index === 0 ? '#34D399' :
                          index === 1 ? '#FCA5A5' :
                          index === 2 ? '#FCD34D' :
                          '#818CF8'
                        } />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    radius={[6, 6, 0, 0]}
                  >
                    {monthlyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${['income', 'expenses', 'savings', 'investments'][index]}Gradient)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 