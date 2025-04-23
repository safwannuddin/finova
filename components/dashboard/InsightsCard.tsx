'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { generatePersonalizedInsights } from '@/lib/openai';
import { Lightbulb, AlertTriangle, TrendingUp, ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Insight } from '@/lib/mockData';

interface InsightsCardProps {
  insights: Insight[];
}

export default function InsightsCard({ insights: initialInsights }: InsightsCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [loading, setLoading] = useState(false);
  const [aiInsightsAvailable, setAiInsightsAvailable] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    // Check if we can potentially generate AI insights
    if (user && process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      setAiInsightsAvailable(true);
    }
  }, [user]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  const generateAiInsights = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const aiInsights = await generatePersonalizedInsights(user);
      if (aiInsights && aiInsights.length > 0) {
        // If we successfully get AI insights, use them
        setInsights(aiInsights);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Error generating AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'tip':
      default:
        return <Lightbulb size={16} className="text-blue-500" />;
    }
  };
  
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'tip':
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500">High Impact</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 hover:text-amber-500">Medium Impact</Badge>;
      case 'low':
      default:
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500">Low Impact</Badge>;
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const currentInsight = insights[currentIndex];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="h-full overflow-hidden glass-card">
        <CardHeader className="pb-3 space-y-1.5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center">
              Insights
              <div className="ml-2">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 2, repeat: loading ? Infinity : 0, ease: "linear" }}
                >
                  <Sparkles size={16} className="text-primary" />
                </motion.div>
              </div>
            </CardTitle>
            {aiInsightsAvailable && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-2 h-8 text-xs flex items-center gap-1"
                onClick={generateAiInsights}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin mr-1" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="mr-1" />
                    Refresh with AI
                  </>
                )}
              </Button>
            )}
          </div>
          <CardDescription>
            Personalized financial insights for your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[12rem]"
            >
              {currentInsight && (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded ${getInsightColor(currentInsight.type)}`}>
                      {getInsightIcon(currentInsight.type)}
                    </div>
                    <h3 className="font-medium">{currentInsight.title}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{currentInsight.description}</p>
                  
                  <div className="flex justify-between items-center">
                    {getImpactBadge(currentInsight.impact)}
                    <div className="text-xs text-muted-foreground">
                      {currentIndex + 1} of {insights.length}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
            
            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={goToPrevious}
                disabled={insights.length <= 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={goToNext}
                disabled={insights.length <= 1}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}