'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, FinancialGoal, TimeHorizon } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MoveRight, MoveLeft, Target, Home, GraduationCap, DollarSign, PiggyBank, Plane, Briefcase } from 'lucide-react';

const financialGoals: { value: FinancialGoal; label: string; description: string; icon: React.ReactNode }[] = [
  { 
    value: 'Retirement', 
    label: 'Retirement', 
    description: 'Save for comfortable retirement',
    icon: <PiggyBank size={18} />
  },
  { 
    value: 'HomePurchase', 
    label: 'Home Purchase', 
    description: 'Buy your first or next home',
    icon: <Home size={18} />
  },
  { 
    value: 'Education', 
    label: 'Education', 
    description: 'Save for education costs',
    icon: <GraduationCap size={18} />
  },
  { 
    value: 'DebtFreedom', 
    label: 'Debt Freedom', 
    description: 'Pay off loans and credit card debt',
    icon: <DollarSign size={18} />
  },
  { 
    value: 'EmergencyFund', 
    label: 'Emergency Fund', 
    description: 'Build a safety net',
    icon: <PiggyBank size={18} />
  },
  { 
    value: 'Vacation', 
    label: 'Vacation', 
    description: 'Save for travel and experiences',
    icon: <Plane size={18} />
  },
  { 
    value: 'StartBusiness', 
    label: 'Start Business', 
    description: 'Fund your entrepreneurial ventures',
    icon: <Briefcase size={18} />
  },
];

const timeHorizons: { value: TimeHorizon; label: string; description: string }[] = [
  { value: 'ShortTerm', label: 'Short Term (< 2 years)', description: 'Goals you want to achieve soon' },
  { value: 'MediumTerm', label: 'Medium Term (2-5 years)', description: 'Goals for the near future' },
  { value: 'LongTerm', label: 'Long Term (5+ years)', description: 'Goals for later in life' },
];

const formSchema = z.object({
  primaryGoals: z.array(z.enum(['Retirement', 'HomePurchase', 'Education', 'DebtFreedom', 'EmergencyFund', 'Vacation', 'StartBusiness'])).min(1, {
    message: 'Select at least one financial goal.',
  }),
  retirementAge: z.coerce.number().min(40).max(90).optional(),
  debtAmount: z.coerce.number().min(0).optional(),
  creditScore: z.coerce.number().min(300).max(850).optional(),
});

type FormData = Partial<User>;

interface GoalsStepProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export default function GoalsStep({ onSubmit, onBack }: GoalsStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeHorizonMap, setTimeHorizonMap] = useState<Record<FinancialGoal, TimeHorizon>>({
    Retirement: 'LongTerm',
    HomePurchase: 'MediumTerm',
    Education: 'MediumTerm',
    DebtFreedom: 'ShortTerm',
    EmergencyFund: 'ShortTerm',
    Vacation: 'ShortTerm',
    StartBusiness: 'MediumTerm'
  });
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryGoals: ['EmergencyFund'],
      retirementAge: 65,
      debtAmount: 0,
      creditScore: 700,
    },
  });
  
  const selectedGoals = form.watch('primaryGoals') || [];
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Map time horizons to goals
      const goalTimeHorizons: Record<FinancialGoal, TimeHorizon> = {};
      selectedGoals.forEach(goal => {
        goalTimeHorizons[goal] = timeHorizonMap[goal];
      });
      
      // Add goal time horizons to the data
      const enhancedData = {
        ...data,
        goalTimeHorizons
      };
      
      console.log("Goals info submitted:", enhancedData);
      
      // Call onSubmit with the form data
      onSubmit(enhancedData);
    } catch (error) {
      console.error("Error submitting goals info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTimeHorizonChange = (goal: FinancialGoal, horizon: TimeHorizon) => {
    setTimeHorizonMap(prev => ({
      ...prev,
      [goal]: horizon
    }));
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
              <h3 className="text-lg font-medium mb-2">Financial Goals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select your top financial priorities
              </p>
              
              <FormField
                control={form.control}
                name="primaryGoals"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {financialGoals.map((goal) => (
                        <FormField
                          key={goal.value}
                          control={form.control}
                          name="primaryGoals"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={goal.value}
                                className={`flex items-center p-3 rounded-lg border transition-all hover:border-primary ${
                                  field.value?.includes(goal.value)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                                }`}
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(goal.value)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      
                                      if (checked) {
                                        field.onChange([...currentValues, goal.value]);
                                      } else {
                                        field.onChange(
                                          currentValues.filter((value) => value !== goal.value)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="flex items-center space-x-2 ml-3 flex-1">
                                  <span className="text-primary">{goal.icon}</span>
                                  <div>
                                    <FormLabel className="cursor-pointer">
                                      {goal.label}
                                    </FormLabel>
                                    <p className="text-xs text-muted-foreground">
                                      {goal.description}
                                    </p>
                                  </div>
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
            
            {selectedGoals.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Time Horizons</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  When do you plan to reach each goal?
                </p>
                
                <div className="space-y-4">
                  {selectedGoals.map(goalId => {
                    const goal = financialGoals.find(g => g.value === goalId);
                    if (!goal) return null;
                    
                    return (
                      <div key={goalId} className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                        <div className="flex items-center space-x-2 w-1/3">
                          <span className="text-primary">{goal.icon}</span>
                          <span className="font-medium">{goal.label}</span>
                        </div>
                        <div className="w-2/3">
                          <Select
                            defaultValue={timeHorizonMap[goalId]}
                            onValueChange={(value) => handleTimeHorizonChange(goalId, value as TimeHorizon)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time horizon" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeHorizons.map(horizon => (
                                <SelectItem key={horizon.value} value={horizon.value}>
                                  {horizon.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {selectedGoals.includes('Retirement') && (
              <FormField
                control={form.control}
                name="retirementAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Retirement Age</FormLabel>
                    <FormDescription>
                      At what age do you plan to retire?
                    </FormDescription>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">40</span>
                        <span className="text-sm font-medium">{field.value || 65}</span>
                        <span className="text-sm">90</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={40}
                          max={90}
                          step={1}
                          value={[field.value || 65]}
                          onValueChange={(values) => field.onChange(values[0])}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            )}
            
            {selectedGoals.includes('DebtFreedom') && (
              <FormField
                control={form.control}
                name="debtAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Debt Amount</FormLabel>
                    <FormDescription>
                      How much debt do you currently have?
                    </FormDescription>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        <Input 
                          type="number" 
                          placeholder="10000"
                          className="bg-background/50 border-border/50 focus:border-primary pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="creditScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Score (Optional)</FormLabel>
                  <FormDescription>
                    What is your current credit score?
                  </FormDescription>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">300</span>
                      <span className="text-sm font-medium">{field.value || 700}</span>
                      <span className="text-sm">850</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={300}
                        max={850}
                        step={10}
                        value={[field.value || 700]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
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
              className="relative group overflow-hidden"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <span className="mr-2">Continue</span>
                  <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
                  <span className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-50 blur-md" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
} 