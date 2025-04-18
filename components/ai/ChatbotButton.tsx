'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ai/ChatMessage';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI financial assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        'investment': "Based on your risk profile, I recommend a balanced portfolio with 50% stocks, 30% bonds, and 20% alternatives. Your current allocation is slightly overweight in cash.",
        'saving': "To reach your savings goal of $5000 in 2 years, you'll need to save approximately $208 per month, assuming no interest. I notice you could potentially reduce your entertainment expenses by $75/month to help meet this goal.",
        'crypto': "Considering your medium risk tolerance, limiting crypto to 5-10% of your portfolio would be advisable. Remember that cryptocurrency remains highly volatile and should be considered a speculative investment.",
        'retirement': "Starting retirement savings early is crucial. At your current savings rate, you're on track to have approximately $1.2M by age 65. I recommend increasing your retirement contributions by 2% each year.",
        'budget': "Looking at your spending patterns, your housing costs are within the recommended 30% of income, but your dining out expenses are 15% above average for your income level. Consider setting a weekly dining budget.",
        'default': "I'd be happy to help you with that financial question. Could you provide more details so I can give you a personalized recommendation?"
      };
      
      // Determine which response to use based on keywords in the user's message
      const lowercaseInput = input.toLowerCase();
      let responseContent = mockResponses.default;
      
      if (lowercaseInput.includes('invest') || lowercaseInput.includes('stock') || lowercaseInput.includes('portfolio')) {
        responseContent = mockResponses.investment;
      } else if (lowercaseInput.includes('save') || lowercaseInput.includes('saving') || lowercaseInput.includes('goal')) {
        responseContent = mockResponses.saving;
      } else if (lowercaseInput.includes('crypto') || lowercaseInput.includes('bitcoin')) {
        responseContent = mockResponses.crypto;
      } else if (lowercaseInput.includes('retire') || lowercaseInput.includes('401k') || lowercaseInput.includes('pension')) {
        responseContent = mockResponses.retirement;
      } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('spend') || lowercaseInput.includes('expense')) {
        responseContent = mockResponses.budget;
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };
  
  const suggestionChips = [
    "How should I invest $10,000?",
    "Am I saving enough for retirement?",
    "How to reduce my monthly expenses?",
    "Is crypto too risky for me?",
  ];
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-lg z-50 hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        <span className="sr-only">Chat with AI assistant</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 sm:w-96 h-96 bg-card shadow-2xl rounded-lg border border-border z-40 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 bg-primary text-primary-foreground flex items-center border-b border-border">
              <Bot size={18} className="mr-2" />
              <div>
                <h3 className="font-medium text-sm">Financial Assistant</h3>
                <p className="text-xs text-primary-foreground/70">Powered by AI</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            {messages.length === 1 && (
              <div className="px-3 pb-3 grid grid-cols-2 gap-2">
                {suggestionChips.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs justify-start h-auto py-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a financial question..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="shrink-0"
              >
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}