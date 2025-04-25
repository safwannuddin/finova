import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, TrendingUp, DollarSign } from "lucide-react";

export default async function LearnPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Financial Education</h1>
        
        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList>
            <TabsTrigger value="basics" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Basics
            </TabsTrigger>
            <TabsTrigger value="investing" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investing
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Glossary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Fundamentals</CardTitle>
                  <CardDescription>Essential concepts for financial literacy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Topics:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Budgeting basics</li>
                      <li>Saving strategies</li>
                      <li>Understanding credit</li>
                      <li>Emergency funds</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Lessons</CardTitle>
                  <CardDescription>Learn through practical examples</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add interactive lessons */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investing">
            <Card>
              <CardHeader>
                <CardTitle>Investment Education</CardTitle>
                <CardDescription>Learn about different investment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Key Topics:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Stock market basics</li>
                    <li>Diversification</li>
                    <li>Risk management</li>
                    <li>Investment vehicles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Concepts</CardTitle>
                <CardDescription>Deep dive into complex financial topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Advanced Topics:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Portfolio theory</li>
                    <li>Tax strategies</li>
                    <li>Estate planning</li>
                    <li>Alternative investments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="glossary">
            <Card>
              <CardHeader>
                <CardTitle>Financial Terms</CardTitle>
                <CardDescription>Comprehensive glossary of financial terminology</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add searchable glossary */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 