import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Target, Wallet, PiggyBank } from "lucide-react";

export default async function PlanningPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Financial Planning</h1>
        
        <Tabs defaultValue="goals" className="space-y-8">
          <TabsList>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4" />
              Savings
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goals">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Goals</CardTitle>
                  <CardDescription>Track and manage your financial objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add goal tracking interface */}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>Monitor your progress towards financial goals</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add progress visualization */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <Card>
              <CardHeader>
                <CardTitle>Budget Planner</CardTitle>
                <CardDescription>Plan and track your monthly budget</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add budget planning interface */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Savings Strategy</CardTitle>
                <CardDescription>Optimize your savings and investments</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add savings planning tools */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Calculators</CardTitle>
                  <CardDescription>Tools to help plan your financial future</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add financial calculators */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 