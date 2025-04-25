'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, User } from '@/context/UserContext';
import PersonalInfoStep from '@/components/onboarding/steps/PersonalInfoStep';
import FinancialInfoStep from '@/components/onboarding/steps/FinancialInfoStep';
import InvestmentInfoStep from '@/components/onboarding/steps/InvestmentInfoStep';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, User as UserIcon, DollarSign, LineChart } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

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
    title: 'Financial Status',
    description: 'Your income and goals',
    icon: <DollarSign size={18} />,
    color: 'bg-green-500'
  },
  { 
    id: 'investment', 
    title: 'Investment Profile',
    description: 'Your investment style',
    icon: <LineChart size={18} />,
    color: 'bg-purple-500'
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [animateStepChange, setAnimateStepChange] = useState(false);
  const { updateUser, completeOnboarding } = useUser();
  
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
  
  const handleStepSubmit = (data: Partial<User>) => {
    console.log(`${steps[currentStep].id} info submitted:`, data);
    updateUser(data);
    goToNextStep();
  };

  return (
    <AnimatedBackground>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-background/95 p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80" />
        {/* Progress indicators */}
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index <= currentStep ? step.color : 'bg-muted'}
                transition-colors duration-300
              `}>
                {index < currentStep ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-sm font-medium text-white">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-8 h-0.5 mx-1
                  ${index < currentStep ? 'bg-primary' : 'bg-muted'}
                  transition-colors duration-300
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg"
          >
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <div className="mb-6">
                <Badge className={`${steps[currentStep].color} mb-2`}>
                  {steps[currentStep].icon}
                  <span className="ml-1">{steps[currentStep].title}</span>
                </Badge>
                <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
              </div>

              {currentStep === 0 && (
                <PersonalInfoStep onSubmit={handleStepSubmit} />
              )}
              {currentStep === 1 && (
                <FinancialInfoStep 
                  onSubmit={handleStepSubmit}
                  onBack={goToPreviousStep}
                />
              )}
              {currentStep === 2 && (
                <InvestmentInfoStep 
                  onSubmit={handleStepSubmit}
                  onBack={goToPreviousStep}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>        {/* Navigation buttons removed */}
      </div>
    </AnimatedBackground>
  );
}