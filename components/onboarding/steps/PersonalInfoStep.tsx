'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MoveRight } from 'lucide-react';

import { supabase } from '@/lib/supabase'; // ✅ your Supabase client
import { useUser } from '@clerk/nextjs';   // ✅ Clerk hook to get logged-in user

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  age: z.coerce.number().min(18, {
    message: 'You must be at least 18 years old.',
  }).max(120, {
    message: 'Please enter a valid age.',
  }),
});

type FormData = Pick<User, 'name' | 'age'>;

interface PersonalInfoStepProps {
  onSubmit: (data: FormData) => void;
}

export default function PersonalInfoStep({ onSubmit }: PersonalInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser(); // ✅ get Clerk user

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Submitting form with data:', data);
    console.log('Current user ID:', user?.id);

    try {
      // Generate a temporary UUID if user is not authenticated
      const temporaryId = user?.id || crypto.randomUUID();
      
      console.log('Sending to Supabase with ID:', temporaryId);
      
      const { data: responseData, error } = await supabase.from('user_profiles').upsert([
        {
          id: temporaryId,
          name: data.name,
          age: data.age,
        },
      ]);

      if (error) {
        console.error('❌ Supabase insert error:', error);
      } else {
        console.log('✅ User data added to Supabase');
        
        // If you need to remember this ID for later linking with the real user
        localStorage.setItem('tempUserId', temporaryId);
      }

      onSubmit(data);
    } catch (err) {
      console.error('❌ Unexpected error:', err);
    }

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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe"
                      className="bg-background/50 border-border/50 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="30"
                      className="bg-background/50 border-border/50 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
