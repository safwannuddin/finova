import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

interface StockMarketIndicesCardProps {
  indices?: MarketIndex[];
  isLoading?: boolean;
  className?: string;
}

export default function StockMarketIndicesCard({
  indices = [],
  isLoading = false,
  className = ""
}: StockMarketIndicesCardProps) {
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercent = (percent: number) => {
    return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <Card className={`overflow-hidden glass-card h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Market Indices</CardTitle>
        <CardDescription>Performance of major stock indices</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {indices.length > 0 ? (
              indices.map((index) => (
                <div 
                  key={index.symbol} 
                  className="flex justify-between items-center p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{index.name}</h4>
                    <p className="text-xs text-muted-foreground">{index.symbol}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(index.value)}</div>
                    <div
                      className={`text-sm font-medium flex items-center ${
                        index.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {index.change >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {formatPercent(index.changePercent)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="text-sm text-muted-foreground">
                  No market data available
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 