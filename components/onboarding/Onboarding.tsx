'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, User } from '@/context/UserContext';
import PersonalInfoStep from '@/components/onboarding/steps/PersonalInfoStep';
import FinancialInfoStep from '@/components/onboarding/steps/FinancialInfoStep';
import InvestmentInfoStep from '@/components/onboarding/steps/InvestmentInfoStep';
import ParticleBackground from '@/components/ui/ParticleBackground';

const steps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'financial', title: 'Financial Overview' },
  { id: 'investment', title: 'Investment Preferences' }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { updateUser, completeOnboarding } = useUser();
  
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handlePersonalInfoSubmit = (data: Pick<User, 'name' | 'age'>) => {
    updateUser(data);
    goToNextStep();
  };
  
  const handleFinancialInfoSubmit = (data: Pick<User, 'monthlyIncome' | 'budgetAllocation'>) => {
    updateUser(data);
    goToNextStep();
  };
  
  const handleInvestmentInfoSubmit = (data: Pick<User, 'riskAppetite' | 'investments'>) => {
    updateUser(data);
    completeOnboarding();
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/80 z-10" />
      
      <div className="container mx-auto px-4 z-20">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-full max-w-screen-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                Create Your Financial Profile
              </h1>
              <p className="text-muted-foreground">
                Tell us about yourself so we can personalize your wealth hub
              </p>
            </div>
            
            <div className="flex justify-between mb-8 relative">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStep 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                    } ${index <= currentStep ? 'glow' : ''}`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm mt-2 hidden md:block">
                    {step.title}
                  </span>
                </div>
              ))}
              
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-primary"
                  style={{ 
                    width: `${(currentStep / (steps.length - 1)) * 100}%` 
                  }}
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: `${(currentStep / (steps.length - 1)) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="w-full">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <PersonalInfoStep key="personal" onSubmit={handlePersonalInfoSubmit} />
                )}
                {currentStep === 1 && (
                  <FinancialInfoStep 
                    key="financial" 
                    onSubmit={handleFinancialInfoSubmit}
                    onBack={goToPreviousStep}
                  />
                )}
                {currentStep === 2 && (
                  <InvestmentInfoStep 
                    key="investment" 
                    onSubmit={handleInvestmentInfoSubmit}
                    onBack={goToPreviousStep}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}