import { Card } from "@/components/ui/card";
import { SpendingCategory } from "@/lib/mockData";

interface SpendingTrendsCardProps {
  data?: SpendingCategory[];
  isLoading?: boolean;
  className?: string;
}

export default function SpendingTrendsCard({ 
  data = [], 
  isLoading = false,
  className = ""
}: SpendingTrendsCardProps) {
  return (
    <Card className={`overflow-hidden glass-card h-full ${className}`}>
      // ... existing code ...
    </Card>
  );
} 