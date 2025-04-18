'use client';

import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <motion.div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
          <AvatarFallback className={message.sender === 'user' ? 'bg-primary' : 'bg-secondary'}>
            {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
          </AvatarFallback>
        </Avatar>
        
        <div 
          className={`rounded-lg px-3 py-2 text-sm ${
            message.sender === 'user' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border'
          }`}
        >
          <p>{message.content}</p>
          <div 
            className={`text-xs mt-1 ${
              message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}