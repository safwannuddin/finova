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
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 md:w-96"
          >
            <Card className="shadow-xl">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Financial Assistant</h3>
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
                        className="w-full justify-between"
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
                      className="mb-2"
                      onClick={handleBack}
                    >
                      ← Back to topics
                    </Button>
                    <div className="space-y-2">
                      {availableQuestions.map((q) => (
                        <Button
                          key={q.id}
                          variant="outline"
                          className="w-full justify-start"
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
                        className={`p-3 rounded-lg text-sm ${
                          msg.role === 'user'
                            ? 'bg-primary/10 ml-4'
                            : 'bg-muted mr-4'
                        }`}
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