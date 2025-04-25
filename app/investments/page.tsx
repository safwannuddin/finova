import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/Header";
import PortfolioAllocationCard from "@/components/dashboard/PortfolioAllocationCard";
import InvestmentRecommendations from "@/components/dashboard/InvestmentRecommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, PieChart, TrendingUp } from "lucide-react";

export default async function InvestmentsPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Investment Portfolio</h1>
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <PortfolioAllocationCard />
              <Card>
                <CardHeader>
                  <CardTitle>Investment Summary</CardTitle>
                  <CardDescription>Overview of your investment portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add investment summary content */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Track your investment returns over time</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add performance charts and metrics */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <InvestmentRecommendations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 