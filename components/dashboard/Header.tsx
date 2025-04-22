'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '@/context/UserContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';
import { Bell, Menu, X, User as UserIcon, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const { resetOnboarding } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
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
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#" 
              className="text-foreground font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="text-muted-foreground font-medium transition-colors hover:text-primary"
            >
              Investments
            </a>
            <a 
              href="#" 
              className="text-muted-foreground font-medium transition-colors hover:text-primary"
            >
              Planning
            </a>
            <a 
              href="#" 
              className="text-muted-foreground font-medium transition-colors hover:text-primary"
            >
              Learn
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">Personal Account</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={resetOnboarding}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Reset Onboarding</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            <a 
              href="#" 
              className="block py-2 text-foreground font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="block py-2 text-muted-foreground font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Investments
            </a>
            <a 
              href="#" 
              className="block py-2 text-muted-foreground font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planning
            </a>
            <a 
              href="#" 
              className="block py-2 text-muted-foreground font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}