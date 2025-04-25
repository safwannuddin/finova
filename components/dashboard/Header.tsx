'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo size="small" />
            <span className="ml-2 text-xl font-bold">
              Fino<span className="text-accent">VA</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}