'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { generateInvestmentRecommendations } from '@/lib/openai';
import { 
  TrendingUp, 
  RefreshCw, 
  ChevronRight, 
  BarChart, 
  DollarSign, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  expectedReturn: string;
  risk: 'low' | 'moderate' | 'high';
  reasoning: string;
}

export default function InvestmentRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user } = useUser();

  const generateRecommendations = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const aiRecommendations = await generateInvestmentRecommendations(user);
      if (aiRecommendations && aiRecommendations.length > 0) {
        setRecommendations(aiRecommendations);
      } else {
        // Fallback mock recommendations if API fails
        setRecommendations([
          {
            id: '1',
            title: 'Increase ETF exposure',
            description: 'Consider allocating more of your portfolio to low-cost, diversified ETFs that track major indices.',
            expectedReturn: '7-9% annually',
            risk: 'moderate',
            reasoning: 'Your current portfolio has a low allocation to ETFs, which could provide more diversification and potentially higher returns with manageable risk.'
          },
          {
            id: '2',
            title: 'Review bond portfolio',
            description: 'Shift a portion of bond holdings from long-term to short-term bonds to reduce interest rate risk.',
            expectedReturn: '3-4% annually',
            risk: 'low',
            reasoning: 'With potential interest rate changes on the horizon, short-term bonds may offer better protection while still providing income.'
          },
          {
            id: '3',
            title: 'Consider value stocks',
            description: 'Add exposure to value stocks, which may be undervalued relative to their fundamentals.',
            expectedReturn: '8-12% annually',
            risk: 'moderate',
            reasoning: 'Value stocks have historically performed well during economic recoveries and may complement your existing growth-oriented holdings.'
          }
        ]);
      }
    } catch (error) {
      console.error('Error generating investment recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      generateRecommendations();
    }
  }, [user, generateRecommendations]);

  const toggleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">High Risk</Badge>;
      case 'moderate':
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">Moderate Risk</Badge>;
      case 'low':
      default:
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500">Low Risk</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>AI Investment Recommendations</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="px-2 h-8 flex items-center gap-1"
            onClick={generateRecommendations}
            disabled={loading}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            <span className="sr-only md:not-sr-only">Refresh</span>
          </Button>
        </div>
        <CardDescription>
          Personalized investment suggestions based on your financial profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && recommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">
              Generating personalized investment recommendations...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {recommendations.map((recommendation) => (
                <motion.div
                  key={recommendation.id}
                  className="border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => toggleExpand(recommendation.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BarChart size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-base">{recommendation.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="bg-background flex items-center gap-1 font-normal">
                            <DollarSign size={12} />
                            {recommendation.expectedReturn}
                          </Badge>
                          {getRiskBadge(recommendation.risk)}
                        </div>
                      </div>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`text-muted-foreground transition-transform duration-300 ${
                        expanded === recommendation.id ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                  
                  <AnimatePresence>
                    {expanded === recommendation.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t pt-3">
                          <p className="text-sm text-foreground mb-3">{recommendation.description}</p>
                          <div className="bg-accent/10 p-3 rounded-md">
                            <div className="flex gap-2 items-start">
                              <AlertTriangle size={16} className="text-primary mt-0.5" />
                              <div>
                                <h4 className="text-sm font-medium mb-1">Reasoning</h4>
                                <p className="text-xs text-muted-foreground">{recommendation.reasoning}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <p>
          These recommendations are generated by AI based on your profile and market trends.
          Always consult with a financial advisor before making investment decisions.
        </p>
      </CardFooter>
    </Card>
  );
} 