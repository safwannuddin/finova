import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Presentation, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExperienceLevel } from '@/context/UserContext';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'interactive';
  topic: string;
  level: ExperienceLevel;
  url: string;
  imageUrl?: string;
}

interface LearningResourcesCardProps {
  topics: string[];
  learningStyle?: 'Visual' | 'Reading' | 'Interactive';
  experienceLevel: ExperienceLevel;
}

export function LearningResourcesCard({ 
  topics = [], 
  learningStyle = 'Visual',
  experienceLevel = 'Beginner'
}: LearningResourcesCardProps) {
  const [resources, setResources] = useState<LearningResource[]>([]);
  
  useEffect(() => {
    // Generate mock learning resources based on user preferences
    const mockResources: LearningResource[] = [
      {
        id: '1',
        title: 'Building Your Emergency Fund',
        description: 'Learn how to create and maintain an emergency fund that can help you through financial hardships.',
        type: 'article',
        topic: 'Budgeting',
        level: 'Beginner',
        url: '#',
        imageUrl: '/images/emergency-fund.jpg'
      },
      {
        id: '2',
        title: 'Introduction to Index Funds',
        description: 'A beginner-friendly guide to understanding index funds and why they are popular investment choices.',
        type: 'video',
        topic: 'Investing',
        level: 'Beginner',
        url: '#',
        imageUrl: '/images/index-funds.jpg'
      },
      {
        id: '3',
        title: 'Interactive Compound Interest Calculator',
        description: 'See how your investments can grow over time with this interactive tool.',
        type: 'interactive',
        topic: 'Investing',
        level: 'Beginner',
        url: '#',
        imageUrl: '/images/compound-interest.jpg'
      },
      {
        id: '4',
        title: 'Understanding Asset Allocation',
        description: 'Learn how to balance your portfolio across different asset classes based on your risk tolerance.',
        type: 'article',
        topic: 'Investing',
        level: 'Intermediate',
        url: '#',
        imageUrl: '/images/asset-allocation.jpg'
      },
      {
        id: '5',
        title: 'Tax-Efficient Investing Strategies',
        description: 'Advanced techniques to minimize tax impact on your investment returns.',
        type: 'video',
        topic: 'TaxPlanning',
        level: 'Advanced',
        url: '#',
        imageUrl: '/images/tax-strategies.jpg'
      },
      {
        id: '6',
        title: 'Real Estate Investment Analysis',
        description: 'Learn how to evaluate potential real estate investments using key metrics.',
        type: 'interactive',
        topic: 'RealEstate',
        level: 'Intermediate',
        url: '#',
        imageUrl: '/images/real-estate.jpg'
      }
    ];
    
    // Filter resources based on user preferences
    let filteredResources = mockResources;
    
    // Filter by user's topics of interest
    if (topics.length > 0) {
      filteredResources = filteredResources.filter(resource => 
        topics.includes(resource.topic)
      );
    }
    
    // Filter by user's learning style preference
    if (learningStyle) {
      const typeMap = {
        'Visual': 'video',
        'Reading': 'article',
        'Interactive': 'interactive'
      };
      
      // Prioritize the preferred style but don't exclude others completely
      filteredResources.sort((a, b) => {
        if (a.type === typeMap[learningStyle] && b.type !== typeMap[learningStyle]) return -1;
        if (a.type !== typeMap[learningStyle] && b.type === typeMap[learningStyle]) return 1;
        return 0;
      });
    }
    
    // Filter by user's experience level - show resources at their level and one level up
    filteredResources = filteredResources.filter(resource => {
      if (resource.level === experienceLevel) return true;
      if (experienceLevel === 'Beginner' && resource.level === 'Intermediate') return true;
      if (experienceLevel === 'Intermediate' && 
         (resource.level === 'Beginner' || resource.level === 'Advanced')) return true;
      return false;
    });
    
    // Limit to 6 resources
    setResources(filteredResources.slice(0, 6));
  }, [topics, learningStyle, experienceLevel]);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'interactive':
        return <Presentation className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'article':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'interactive':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <CardContent className="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden border hover:shadow-md transition-shadow duration-300">
            <div 
              className="h-32 bg-gradient-to-br from-primary/50 to-primary/10 flex items-center justify-center"
            >
              <div className="text-3xl">{getTypeIcon(resource.type)}</div>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className={`${getTypeBadgeColor(resource.type)} text-xs flex items-center gap-1`}>
                  {getTypeIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
                </Badge>
                <Badge variant="outline" className={`${getLevelBadgeColor(resource.level)} text-xs`}>
                  {resource.level}
                </Badge>
              </div>
              
              <h3 className="font-medium mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {resource.description}
              </p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between mt-2 text-primary hover:text-primary"
                asChild
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <span>Learn More</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {resources.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground mb-4">
              No learning resources found matching your preferences
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="group">
          View all resources
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </CardContent>
  );
} 