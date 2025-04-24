import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function DashboardPage() {
  const { userId } = auth();
  
  // If not authenticated, redirect to sign in
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Dashboard />
    </div>
  );
}