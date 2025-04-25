'use client';

import { useState } from 'react';
import { MessageCircle, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories, getQuestionsByCategory, ChatQuestion } from '@/lib/openai';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [availableQuestions, setAvailableQuestions] = useState<ChatQuestion[]>([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset state when opening
      setSelectedCategory(null);
      setAvailableQuestions([]);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const questions = getQuestionsByCategory(category);
    setAvailableQuestions(questions);
  };

  const handleQuestionSelect = (question: ChatQuestion) => {
    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: question.question, timestamp: new Date() },
      { role: 'assistant', content: question.answer, timestamp: new Date() }
    ];
    setMessages(newMessages);
    setSelectedCategory(null);
    setAvailableQuestions([]);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setAvailableQuestions([]);
  };

  return (
    <div className="fixed top-24 right-8 z-50">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            "bg-primary hover:bg-primary/90",
            "border-4 border-background",
            "flex items-center justify-center",
            isOpen ? "rotate-0" : "rotate-0",
            "hover:shadow-xl hover:border-primary/20",
            "relative"
          )}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.div>
          {!isOpen && (
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold text-white">
              AI
            </span>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 right-0 w-80 md:w-96"
          >
            <Card className="shadow-2xl border-primary/10 backdrop-blur-sm">
              <div className="p-4 border-b bg-primary/5">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Financial Assistant
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select a topic to get started
                </p>
              </div>

              <ScrollArea className="h-[400px] p-4">
                {!selectedCategory ? (
                  // Show categories
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        className="w-full justify-between hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                        <ChevronRight size={16} />
                      </Button>
                    ))}
                  </div>
                ) : (
                  // Show questions for selected category
                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      className="mb-2 hover:bg-primary/5 hover:text-primary"
                      onClick={handleBack}
                    >
                      ← Back to topics
                    </Button>
                    <div className="space-y-2">
                      {availableQuestions.map((q) => (
                        <Button
                          key={q.id}
                          variant="outline"
                          className="w-full justify-start hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => handleQuestionSelect(q)}
                        >
                          {q.question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="h-px bg-border" />
                    <h4 className="font-medium">Recent Answers</h4>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          "p-3 rounded-lg text-sm",
                          msg.role === 'user'
                            ? 'bg-primary/10 ml-4'
                            : 'bg-muted mr-4 border border-border'
                        )}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}