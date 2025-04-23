'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/splash/SplashScreen';
import Onboarding from '@/components/onboarding/Onboarding';
import OnboardingIntro from '@/components/onboarding/OnboardingIntro';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const { user, onboardingComplete } = useUser();
  const router = useRouter();
  
  // Debug log for user and onboarding state
  useEffect(() => {
    console.log("User state:", user);
    console.log("Onboarding complete:", onboardingComplete);
  }, [user, onboardingComplete]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowIntro(true);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Redirect to dashboard after onboarding in development mode
  // This is just a backup, as we now use direct navigation in the InvestmentInfoStep
  /*
  useEffect(() => {
    if (onboardingComplete) {
      console.log("Onboarding is complete, redirecting...");
      
      // Force redirect to dashboard in development
      if (process.env.NODE_ENV === 'development') {
        console.log("Redirecting to dashboard...");
        router.push('/dashboard');
      } else {
        // With Clerk configured, go to sign-up
        console.log("Redirecting to sign-up...");
        router.push('/sign-up');
      }
    }
  }, [onboardingComplete, router]);
  */
  
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : showIntro && !onboardingComplete ? (
          <OnboardingIntro key="intro" />
        ) : !onboardingComplete ? (
          <Onboarding key="onboarding" />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Setting up your financial hub...</h1>
            <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin rounded-full mb-6"></div>
            <p className="text-muted-foreground mb-8">Please wait while we prepare your personalized dashboard.</p>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}