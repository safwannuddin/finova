'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OnboardingIntro() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  const startOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5">
      {/* Background animated gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-teal-500/20 blur-[100px]"></div>
        </div>
      </div>
      
      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        {/* Logo animation */}
        <motion.div
          className="mb-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.3 
            }}
          >
            <Sparkles size={32} className="text-primary" />
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border border-primary/50"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                scale: [1, 1.5, 1.8] 
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.5, 1],
                repeat: Infinity,
                delay: 1
              }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to <span className="text-primary">Finova</span>
          </motion.h1>
          
          <motion.p
            className="text-muted-foreground text-center max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Your AI-powered personal finance platform
          </motion.p>
        </motion.div>
        
        {step === 0 ? (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <div className="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin rounded-full mb-6"></div>
            <p className="text-muted-foreground">Preparing your experience...</p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Personalized Insights",
                  description: "AI-generated financial recommendations tailored to your unique profile",
                  icon: "✨"
                },
                {
                  title: "Smart Portfolio",
                  description: "Track and optimize your investments with advanced analytics",
                  icon: "📊"
                },
                {
                  title: "Financial Assistant",
                  description: "Get answers to your financial questions anytime you need",
                  icon: "🤖"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-lg p-6 border border-border shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Button 
                onClick={startOnboarding} 
                size="lg" 
                className="px-8 py-6 text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-100 group-hover:opacity-90 transition-opacity" />
                <span className="absolute -inset-full top-0 block h-0.5 w-full bg-gradient-to-r from-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 