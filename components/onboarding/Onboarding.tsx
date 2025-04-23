'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, User } from '@/context/UserContext';
import PersonalInfoStep from '@/components/onboarding/steps/PersonalInfoStep';
import FinancialInfoStep from '@/components/onboarding/steps/FinancialInfoStep';
import InvestmentInfoStep from '@/components/onboarding/steps/InvestmentInfoStep';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Badge } from '@/components/ui/badge';
import { Check, User as UserIcon, DollarSign, LineChart } from 'lucide-react';

const steps = [
  { 
    id: 'personal', 
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: <UserIcon size={18} />,
    color: 'bg-blue-500'
  },
  { 
    id: 'financial', 
    title: 'Financial Overview',
    description: 'Your income and budget',
    icon: <DollarSign size={18} />,
    color: 'bg-green-500'
  },
  { 
    id: 'investment', 
    title: 'Investment Preferences',
    description: 'Risk profile and interests',
    icon: <LineChart size={18} />,
    color: 'bg-purple-500'
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [animateStepChange, setAnimateStepChange] = useState(false);
  const { updateUser, completeOnboarding } = useUser();
  
  // Animate the step change
  useEffect(() => {
    if (animateStepChange) {
      const timer = setTimeout(() => {
        setAnimateStepChange(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animateStepChange]);
  
  const goToNextStep = () => {
    setAnimateStepChange(true);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const goToPreviousStep = () => {
    setAnimateStepChange(true);
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
    console.log("Investment info submitted to Onboarding component:", data);
    
    // Update user data
    updateUser(data);
    
    // Mark onboarding as complete - this updates the context state
    // but we don't rely on this for navigation anymore
    console.log("Marking onboarding as complete...");
    completeOnboarding();
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background/80 z-10" />
      
      <div className="container mx-auto px-4 py-12 z-20">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-full max-w-screen-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-10 text-center">
              <motion.div 
                className="inline-flex items-center justify-center mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4
                }}
              >
                <Badge 
                  className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-3"
                  variant="outline"
                >
                  Step {currentStep + 1} of {steps.length}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Create Your Financial Profile
              </motion.h1>
              
              <motion.p
                className="text-muted-foreground text-lg max-w-lg mx-auto"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {steps[currentStep].description}
              </motion.p>
            </div>
            
            <div className="flex justify-between mb-12 relative">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id} 
                  className="flex flex-col items-center z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 
                    ${index < currentStep 
                      ? 'bg-primary text-white' 
                      : index === currentStep 
                        ? step.color + ' text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'}`}
                  >
                    {index < currentStep ? (
                      <Check size={20} />
                    ) : (
                      <span className="flex items-center justify-center">
                        {step.icon}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-medium mt-2 
                    ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                </motion.div>
              ))}
              
              <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full -z-10">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
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
            
            <motion.div 
              className="w-full"
              animate={animateStepChange ? { opacity: 0.3, scale: 0.98 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}