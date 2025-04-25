'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, ArrowRight, ChevronRight, TrendingUp, LineChart, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OnboardingIntro() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const controls = useAnimation();
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Animate floating icons
  useEffect(() => {
    const animateIcons = () => {
      if (!floatingIconsRef.current) return;
      const icons = floatingIconsRef.current.children;
      
      Array.from(icons).forEach((icon, index) => {
        const element = icon as HTMLElement;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 6;
        
        // Random starting position within constraints
        const startX = Math.random() * window.innerWidth * 0.8;
        const startY = Math.random() * window.innerHeight * 0.8;
        
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
      });
    };
    
    animateIcons();
    window.addEventListener('resize', animateIcons);
    return () => window.removeEventListener('resize', animateIcons);
  }, [step]);
  
  const startOnboarding = () => {
    // Animate before navigation
    controls.start({
      opacity: 0,
      y: -20,
      transition: { duration: 0.5 }
    });
    
    setTimeout(() => {
      router.push('/onboarding');
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8 + index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/95 to-primary/5">
      {/* Enhanced background with animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 10, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[120px]"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 15, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-teal-500/20 blur-[150px]"
            animate={{ 
              y: [0, 40, 0],
              x: [0, -30, 0],
              opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ 
              duration: 20, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
      </div>
      
      {/* Floating financial icons background */}
      {step === 1 && (
        <div ref={floatingIconsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/10 animate-float"
              style={{
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              {i % 3 === 0 ? (
                <TrendingUp size={i % 2 === 0 ? 32 : 48} />
              ) : i % 3 === 1 ? (
                <LineChart size={i % 2 === 0 ? 40 : 24} />
              ) : (
                <PieChart size={i % 2 === 0 ? 36 : 28} />
              )}
            </div>
          ))}
        </div>
      )}
      
      <motion.div 
        className="container relative z-10 max-w-4xl mx-auto px-4"
        animate={controls}
      >
        {/* Enhanced logo animation */}
        <motion.div
          className="mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mb-8 relative"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut", 
              delay: 0.3 
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Sparkles size={36} className="text-primary" />
            </motion.div>
            
            {/* Multiple pulse rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5 + i * 0.2, 2 + i * 0.3] }}
                transition={{ 
                  duration: 2.5,
                  delay: i * 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-blue-500 to-teal-400 text-transparent bg-clip-text"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Welcome to <span className="font-extrabold">Finova</span>
            </motion.h1>
          </motion.div>
          
          <motion.p
            className="text-xl text-muted-foreground text-center max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Your AI-powered personal finance platform
          </motion.p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="loading"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-16 h-16 relative mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-primary/40 border-b-primary/10 border-l-primary/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
              <p className="text-lg text-muted-foreground">Preparing your experience...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Personalized Insights",
                    description: "AI-generated financial recommendations tailored to your unique profile and goals",
                    icon: "✨",
                    color: "from-purple-500 to-blue-500"
                  },
                  {
                    title: "Smart Portfolio",
                    description: "Track and optimize your investments with advanced analytics and predictive trends",
                    icon: "📊",
                    color: "from-blue-500 to-teal-400"
                  },
                  {
                    title: "Financial Assistant",
                    description: "Get instant answers to your financial questions with our AI assistant anytime you need",
                    icon: "🤖",
                    color: "from-emerald-500 to-teal-300"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="bg-card/70 backdrop-blur-sm rounded-xl p-8 border border-border shadow-md flex flex-col h-full"
                  >
                    <div className="relative mb-6">
                      <div className={`text-4xl bg-gradient-to-br ${feature.color} w-14 h-14 flex items-center justify-center rounded-lg`}>
                        {feature.icon}
                      </div>
                      <motion.div 
                        className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur-md -z-10"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
                    <div className="mt-4 flex items-center text-primary/70 text-sm font-medium">
                      <span>Learn more</span>
                      <ChevronRight size={14} className="ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <Button 
                  onClick={startOnboarding} 
                  size="lg" 
                  className="px-10 py-7 text-lg font-medium group relative overflow-hidden"
                >
                  <motion.span 
                    className="relative z-10 flex items-center"
                    whileTap={{ scale: 0.97 }}
                  >
                    Get Started
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <ArrowRight className="transition-transform group-hover:translate-x-2" />
                    </motion.div>
                  </motion.span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary opacity-100 group-hover:opacity-90 transition-opacity" />
                  <motion.span 
                    className="absolute -inset-full top-0 block h-1 w-full bg-gradient-to-r from-white/30 to-transparent"
                    animate={{ 
                      left: ['-100%', '200%'],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  />
                  <motion.span 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 bg-white"
                    animate={{ 
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatDelay: 2
                    }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Add a subtle footer */}
      {step === 1 && (
        <motion.div
          className="absolute bottom-6 text-center text-xs text-muted-foreground/70 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          © 2025 Finova • AI-Powered Finance • Your journey to financial success starts here
        </motion.div>
      )}
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-float {
          animation-name: float;
          animation-duration: 15s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}