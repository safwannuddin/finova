'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, ExperienceLevel } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MoveRight, MoveLeft, BookOpen, FileText, Video, Presentation } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const experienceLevels: { value: ExperienceLevel; label: string; description: string }[] = [
  { 
    value: 'Beginner', 
    label: 'Beginner', 
    description: 'New to investing and personal finance' 
  },
  { 
    value: 'Intermediate', 
    label: 'Intermediate', 
    description: 'Some experience with basic investments' 
  },
  { 
    value: 'Advanced', 
    label: 'Advanced', 
    description: 'Knowledgeable about various financial instruments' 
  },
];

const topicOptions = [
  { id: 'Budgeting', label: 'Budgeting Basics' },
  { id: 'Investing', label: 'Investing 101' },
  { id: 'Retirement', label: 'Retirement Planning' },
  { id: 'TaxPlanning', label: 'Tax Planning' },
  { id: 'DebtManagement', label: 'Debt Management' },
  { id: 'RealEstate', label: 'Real Estate Investing' },
  { id: 'StockMarket', label: 'Stock Market' },
  { id: 'Crypto', label: 'Cryptocurrency' },
];

const learningStyles = [
  { id: 'Visual', label: 'Visual', icon: <Video size={18} /> },
  { id: 'Reading', label: 'Reading', icon: <FileText size={18} /> },
  { id: 'Interactive', label: 'Interactive', icon: <Presentation size={18} /> },
];

const formSchema = z.object({
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  interestedTopics: z.array(z.string()).min(1, {
    message: 'Select at least one topic you\'re interested in learning about.',
  }),
  preferredLearningStyle: z.enum(['Visual', 'Reading', 'Interactive']),
  occupation: z.string().optional(),
});

type FormData = Partial<User>;

interface ExperienceStepProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export default function ExperienceStep({ onSubmit, onBack }: ExperienceStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experienceLevel: 'Beginner',
      interestedTopics: ['Budgeting', 'Investing'],
      preferredLearningStyle: 'Visual',
      occupation: '',
    },
  });
  
  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Log submission
      console.log("Experience info submitted:", data);
      
      // Call onSubmit with the form data
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting experience info:", error);
    } finally {
      setIsSubmitting(false);
    }
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
              <h3 className="text-lg font-medium mb-2">Your Experience Level</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tell us about your financial knowledge and experience
              </p>
              
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        {experienceLevels.map((level) => (
                          <div
                            key={level.value}
                            className={`flex items-center space-x-2 rounded-lg border p-3 transition-all hover:border-primary ${
                              field.value === level.value ? 'border-primary bg-primary/10' : 'border-border'
                            }`}
                          >
                            <RadioGroupItem
                              value={level.value}
                              id={level.value}
                              className="sr-only"
                            />
                            <label
                              htmlFor={level.value}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-muted-foreground">
                                {level.description}
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
            
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation (Optional)</FormLabel>
                  <FormDescription>
                    Helps us tailor advice to your professional situation
                  </FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your occupation or industry"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div>
              <h3 className="text-lg font-medium mb-2">Learning Interests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select topics you would like to learn more about
              </p>
              
              <FormField
                control={form.control}
                name="interestedTopics"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topicOptions.map((topic) => (
                        <FormField
                          key={topic.id}
                          control={form.control}
                          name="interestedTopics"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={topic.id}
                                className={`flex items-center p-3 rounded-lg border transition-all hover:border-primary ${
                                  field.value?.includes(topic.id)
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border'
                                }`}
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(topic.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValues = field.value || [];
                                      
                                      if (checked) {
                                        field.onChange([...currentValues, topic.id]);
                                      } else {
                                        field.onChange(
                                          currentValues.filter((value) => value !== topic.id)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <div className="flex items-center space-x-2 ml-3">
                                  <FormLabel className="cursor-pointer">
                                    {topic.label}
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
            
            <div>
              <h3 className="text-lg font-medium mb-2">Preferred Learning Style</h3>
              <p className="text-sm text-muted-foreground mb-4">
                How do you like to learn new financial concepts?
              </p>
              
              <FormField
                control={form.control}
                name="preferredLearningStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3"
                      >
                        {learningStyles.map((style) => (
                          <div
                            key={style.id}
                            className={`flex flex-col items-center space-y-2 rounded-lg border p-3 transition-all hover:border-primary ${
                              field.value === style.id ? 'border-primary bg-primary/10' : 'border-border'
                            }`}
                          >
                            <RadioGroupItem
                              value={style.id}
                              id={style.id}
                              className="sr-only"
                            />
                            <label
                              htmlFor={style.id}
                              className="flex flex-col items-center cursor-pointer"
                            >
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                {style.icon}
                              </div>
                              <div className="font-medium">{style.label}</div>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
            <div className="flex justify-end">
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