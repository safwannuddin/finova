'use client';

import { BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className = '' }: LogoProps) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <motion.div
      className={`relative rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5 ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-background rounded-full m-[1px]" />
      <div className="relative w-full h-full flex items-center justify-center">
        <TrendingUp className="w-1/2 h-1/2 text-accent absolute" strokeWidth={3} />
        <BarChart3 className="w-1/2 h-1/2 text-secondary absolute opacity-70" strokeWidth={3} />
      </div>
    </motion.div>
  );
};

export default Logo;