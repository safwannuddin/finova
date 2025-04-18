'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/splash/SplashScreen';
import Onboarding from '@/components/onboarding/Onboarding';
import Dashboard from '@/components/dashboard/Dashboard';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, onboardingComplete } = useUser();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : onboardingComplete ? (
          <Dashboard key="dashboard" />
        ) : (
          <Onboarding key="onboarding" />
        )}
      </AnimatePresence>
    </main>
  );
}