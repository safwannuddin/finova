'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Logo from '@/components/ui/Logo';

export default function SplashScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen w-full relative bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/100 z-10" />
      
      <motion.div
        className="flex flex-col items-center justify-center space-y-8 z-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.3,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <Logo size="large" className="glow" />
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Finovate<span className="text-accent">X</span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-xl text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Your Personalized Wealth Hub
        </motion.p>
        
        <motion.div
          className="flex space-x-2 mt-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`h-2 w-2 rounded-full ${
                loaded ? 'bg-secondary' : 'bg-muted'
              }`}
              style={{
                animation: loaded ? `pulse 1.5s ${i * 0.2}s infinite` : 'none'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}