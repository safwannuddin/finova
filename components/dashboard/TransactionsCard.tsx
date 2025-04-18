'use client';

import { motion } from 'framer-motion';
import { Transaction } from '@/lib/mockData';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TransactionsCardProps {
  transactions: Transaction[];
}

export default function TransactionsCard({ transactions }: TransactionsCardProps) {
  const formatCurrency = (value: number, type: 'income' | 'expense') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(type === 'income' ? value : -value);
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Income: 'bg-green-100 text-green-800',
      Housing: 'bg-blue-100 text-blue-800',
      Transportation: 'bg-purple-100 text-purple-800',
      Food: 'bg-amber-100 text-amber-800',
      Utilities: 'bg-sky-100 text-sky-800',
      Entertainment: 'bg-pink-100 text-pink-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden glass-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl">Recent Transactions</CardTitle>
            <CardDescription>Your recent income and expenses</CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-8 bg-background/50 h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Description</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Category</th>
                  <th className="h-10 px-4 text-right font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.slice(0, 8).map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    className="hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <td className="p-4 align-middle font-medium">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="p-4 align-middle">
                      {transaction.description}
                    </td>
                    <td className="p-4 align-middle">
                      <span 
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          getCategoryColor(transaction.category)
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className={`font-medium flex items-center justify-end ${
                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {formatCurrency(transaction.amount, transaction.type)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}