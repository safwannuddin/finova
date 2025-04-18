'use client';

import { useState } from 'react';
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
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskAppetite: 'Medium',
      investments: [],
    },
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-card/50 backdrop-blur-md rounded-lg border border-border p-6 shadow-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Risk Appetite</h3>
              <p className="text-sm text-muted-foreground mb-4">
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
                        className="flex flex-col space-y-3"
                      >
                        {riskProfiles.map((profile) => (
                          <div
                            key={profile.value}
                            className={`flex items-center space-x-2 rounded-lg border p-3 transition-all hover:border-primary ${
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
                              <div className="font-medium">{profile.label}</div>
                              <div className="text-sm text-muted-foreground">
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
              <h3 className="text-lg font-medium mb-2">Investment Interests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the investment types you're interested in
              </p>
              
              <FormField
                control={form.control}
                name="investments"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="relative group"
            >
              <MoveLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </Button>
            
            <Button 
              type="submit" 
              className="relative group"
              disabled={isSubmitting}
            >
              <span className="mr-2">Complete Setup</span>
              <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
              <span className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-50 blur-md" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}