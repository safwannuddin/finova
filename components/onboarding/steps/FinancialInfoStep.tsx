'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MoveRight, MoveLeft, DollarSign } from 'lucide-react';

const formSchema = z.object({
  monthlyIncome: z.coerce.number().min(1, {
    message: 'Monthly income must be greater than 0.',
  }),
  budgetAllocation: z.object({
    necessities: z.number().min(0).max(100),
    wants: z.number().min(0).max(100),
    savings: z.number().min(0).max(100),
  }),
});

type FormData = Pick<User, 'monthlyIncome' | 'budgetAllocation'>;

interface FinancialInfoStepProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export default function FinancialInfoStep({ onSubmit, onBack }: FinancialInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: undefined,
      budgetAllocation: {
        necessities: 50,
        wants: 30,
        savings: 20,
      },
    },
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(data);
    setIsSubmitting(false);
  };
  
  const watchNecessities = form.watch('budgetAllocation.necessities');
  const watchWants = form.watch('budgetAllocation.wants');
  
  // Calculate savings dynamically to ensure total = 100%
  const calculatedSavings = 100 - watchNecessities - watchWants;
  
  // Update savings whenever necessities or wants change
  React.useEffect(() => {
    form.setValue('budgetAllocation.savings', calculatedSavings);
  }, [watchNecessities, watchWants, form]);

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
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input 
                        type="number" 
                        placeholder="5000"
                        className="bg-background/50 border-border/50 focus:border-primary pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Budget Allocation</h3>
              <p className="text-sm text-muted-foreground">
                Adjust how you want to allocate your monthly income
              </p>
              
              <FormField
                control={form.control}
                name="budgetAllocation.necessities"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Necessities</FormLabel>
                      <span className="text-sm font-medium">{field.value}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[field.value]}
                        onValueChange={(values) => {
                          const necessities = values[0];
                          const availableForWants = 100 - necessities - form.getValues('budgetAllocation.savings');
                          
                          field.onChange(necessities);
                          
                          // Adjust wants if necessary
                          if (form.getValues('budgetAllocation.wants') > availableForWants) {
                            form.setValue('budgetAllocation.wants', availableForWants >= 0 ? availableForWants : 0);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budgetAllocation.wants"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Wants</FormLabel>
                      <span className="text-sm font-medium">{field.value}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100 - watchNecessities}
                        step={5}
                        value={[field.value]}
                        onValueChange={(values) => {
                          field.onChange(values[0]);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="budgetAllocation.savings"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Savings & Investments</FormLabel>
                      <span className="text-sm font-medium">{calculatedSavings}%</span>
                    </div>
                    <FormControl>
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all"
                          style={{ width: `${calculatedSavings}%` }}
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">
                      Automatically calculated based on your other allocations
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>
            <div className="flex justify-end">
            <Button 
              type="submit" 
              className="relative group"
              disabled={isSubmitting}
            >
              <span className="mr-2">Continue</span>
              <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
              <span className="absolute -inset-px -z-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-0 transition-opacity group-hover:opacity-50 blur-md" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}