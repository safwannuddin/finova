'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MoveRight, CircleDot, BarChart, LineChart, PieChart, ArrowUp, ArrowDown } from 'lucide-react';

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
  const animationParentRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize animation elements
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className="relative" ref={animationParentRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating shapes */}
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-full bg-gradient-to-r"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              x: [
                Math.random() * windowSize.width,
                Math.random() * windowSize.width,
                Math.random() * windowSize.width
              ],
              y: [
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
                Math.random() * windowSize.height
              ],
              scale: [0.5 + Math.random() * 0.3, 0.7 + Math.random() * 0.5, 0.5 + Math.random() * 0.3],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 15 + Math.random() * 20,
              ease: "easeInOut",
            }}
            style={{
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(16,185,129,0.1) 100%)' 
                : 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(99,102,241,0.1) 100%)',
              filter: 'blur(40px)',
            }}
          />
        ))}

        {/* Financial icons floating */}
        {Array.from({ length: 6 }, (_, i) => {
          const icons = [
            <BarChart key="bar-chart" size={24} opacity={0.15} />,
            <LineChart key="line-chart" size={24} opacity={0.15} />,
            <PieChart key="pie-chart" size={24} opacity={0.15} />,
            <CircleDot key="circle-dot" size={24} opacity={0.15} />,
            <ArrowUp key="arrow-up" size={24} opacity={0.15} />,
            <ArrowDown key="arrow-down" size={24} opacity={0.15} />
          ];

          return (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-primary/50"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                rotate: Math.random() * 360,
              }}
              animate={{
                x: [
                  Math.random() * windowSize.width,
                  Math.random() * windowSize.width,
                  Math.random() * windowSize.width
                ],
                y: [
                  Math.random() * windowSize.height,
                  Math.random() * windowSize.height,
                  Math.random() * windowSize.height
                ],
                rotate: [0, 180, 360],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 20 + Math.random() * 30,
                ease: "linear",
              }}
            >
              {icons[i % icons.length]}
            </motion.div>
          );
        })}

        {/* Pulsating ring */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          animate={{ 
            width: ['20vw', '60vw'],
            height: ['20vh', '60vh'],
            opacity: [0.1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-card/50 backdrop-blur-md rounded-lg border border-border p-6 shadow-lg relative z-10"
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
    </div>
  );
}
