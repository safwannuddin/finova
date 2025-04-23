'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/splash/SplashScreen';
import Onboarding from '@/components/onboarding/Onboarding';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, onboardingComplete } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Redirect to sign-up when onboarding is complete
  useEffect(() => {
    if (onboardingComplete) {
      router.push('/sign-up');
    }
  }, [onboardingComplete, router]);
  
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : !onboardingComplete ? (
          <Onboarding key="onboarding" />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Redirecting to sign up...</h1>
            <p className="text-muted-foreground mb-8">Please wait while we redirect you to create your account.</p>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}