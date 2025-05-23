'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Investment, RiskProfile } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MoveRight, MoveLeft, BarChart2, Briefcase, LineChart, TrendingUp, Home, PieChart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const investmentOptions: { value: Investment; label: string; icon: React.ReactNode }[] = [
  { value: 'Stocks', label: 'Stocks', icon: <TrendingUp size={18} /> },
  { value: 'Bonds', label: 'Bonds', icon: <BarChart2 size={18} /> },
  { value: 'Crypto', label: 'Cryptocurrency', icon: <LineChart size={18} /> },
  { value: 'MutualFunds', label: 'Mutual Funds', icon: <PieChart size={18} /> },
  { value: 'ETFs', label: 'ETFs', icon: <Briefcase size={18} /> },
  { value: 'RealEstate', label: 'Real Estate', icon: <Home size={18} /> },
];

const riskProfiles: { value: RiskProfile; label: string; description: string }[] = [
  { 
    value: 'Low', 
    label: 'Conservative', 
    description: 'Prioritize preserving capital over growth' 
  },
  { 
    value: 'Medium', 
    label: 'Moderate', 
    description: 'Balance between stability and growth' 
  },
  { 
    value: 'High', 
    label: 'Aggressive', 
    description: 'Maximize growth potential with higher risk' 
  },
];

const formSchema = z.object({
  riskAppetite: z.enum(['Low', 'Medium', 'High']),
  investments: z.array(z.enum(['Stocks', 'Bonds', 'Crypto', 'RealEstate', 'MutualFunds', 'ETFs'])).min(1, {
    message: 'Select at least one investment type.',
  }),
});

type FormData = Pick<User, 'riskAppetite' | 'investments'>;

interface InvestmentInfoStepProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export default function InvestmentInfoStep({ onSubmit, onBack }: InvestmentInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskAppetite: 'Medium',
      investments: [],
    },
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Call onSubmit to update the user data in context
      onSubmit(data);
      
      // Show success message
      toast.success("Profile setup complete! Preparing your dashboard...");
      
      // Wait a moment for the user to see the message
      setTimeout(() => {
        setRedirecting(true);
        
        // Check if Clerk is configured by checking for the publishable key in the environment
        const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        const isClerkConfigured = clerkPubKey && !clerkPubKey.includes("your_clerk_publishable_key");
        
        if (isClerkConfigured && process.env.NODE_ENV === 'production') {
          // Show message about being redirected to sign up
          toast.info("Creating your account...");
          
          // In production with Clerk configured, go to sign-up
          setTimeout(() => {
            window.location.href = "/sign-up";
          }, 1500);
        } else {
          // For development or when Clerk is not configured, go straight to dashboard
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        }
      }, 1500);
    } catch (error) {
      // Handle errors
      console.error("Error submitting investment info:", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
      setRedirecting(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-card/50 backdrop-blur-md rounded-lg border border-border p-3 shadow-lg max-w-[90%] mx-auto"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-medium mb-1">Risk Appetite</h3>
                <p className="text-xs text-muted-foreground mb-1">
                  Choose your investment risk tolerance
                </p>
                
                <FormField
                  control={form.control}
                  name="riskAppetite"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {riskProfiles.map((profile) => (
                            <div
                              key={profile.value}
                              className={`flex items-center space-x-2 rounded-lg border p-2 transition-all hover:border-primary ${
                                field.value === profile.value ? 'border-primary bg-primary/10' : 'border-border'
                              }`}
                            >
                              <RadioGroupItem
                                value={profile.value}
                                id={profile.value}
                                className="sr-only"
                              />
                              <label
                                htmlFor={profile.value}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="font-medium text-sm">{profile.label}</div>
                                <div className="text-xs text-muted-foreground">
                                  {profile.description}
                                </div>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-1">Investment Interests</h3>
                <p className="text-xs text-muted-foreground mb-1">
                  Select the investment types you're interested in
                </p>
                
                <FormField
                  control={form.control}
                  name="investments"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {investmentOptions.map((option) => (
                          <FormField
                            key={option.value}
                            control={form.control}
                            name="investments"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.value}
                                  className={`flex items-center p-3 rounded-lg border transition-all hover:border-primary ${
                                    field.value?.includes(option.value)
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border'
                                  }`}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        
                                        if (checked) {
                                          field.onChange([...currentValues, option.value]);
                                        } else {
                                          field.onChange(
                                            currentValues.filter((value) => value !== option.value)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex items-center space-x-2 ml-3">
                                    <span className="text-primary">{option.icon}</span>
                                    <FormLabel className="cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="relative group overflow-hidden"
                disabled={isSubmitting || redirecting}
              >
                {isSubmitting || redirecting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {redirecting ? "Redirecting..." : "Processing..."}
                  </span>
                ) : (
                  <>
                    <span className="mr-2">Complete Setup</span>
                    <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
                    <span className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-50 blur-md" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </>
  );
}