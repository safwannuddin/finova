'use client';

import { motion } from 'framer-motion';
import { Insight } from '@/lib/mockData';
import { Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InsightsCardProps {
  insights: Insight[];
}

export default function InsightsCard({ insights }: InsightsCardProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Sparkles className="h-5 w-5 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'tip':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getInsightClass = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'border-primary/30 bg-primary/5';
      case 'warning':
        return 'border-orange-500/30 bg-orange-500/5';
      case 'tip':
        return 'border-amber-500/30 bg-amber-500/5';
      default:
        return 'border-muted bg-muted/10';
    }
  };

  return (
    <Card className="overflow-hidden glass-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <div>
            <CardTitle className="text-xl">AI Insights</CardTitle>
            <CardDescription>Personalized financial recommendations</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              className={`p-4 rounded-lg border ${getInsightClass(insight.type)}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="flex">
                <div className="mr-3 mt-0.5">
                  {getInsightIcon(insight.type)}
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            className="flex justify-center items-center pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: insights.length * 0.2 + 0.2, duration: 0.5 }}
          >
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              See more insights
            </button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}