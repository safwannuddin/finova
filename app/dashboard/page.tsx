import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function DashboardPage() {
  try {
    // Check if Clerk is configured
    const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const isClerkConfigured = clerkPubKey && !clerkPubKey.includes('your_clerk_publishable_key');
    
    if (isClerkConfigured) {
      // Check if user is authenticated
      const { userId } = await auth();
      
      // If not authenticated, redirect to sign in
      if (!userId) {
        redirect("/sign-in");
      }
    
      // Get the current user
      const user = await currentUser();
    }
    
    return (
      <div className="min-h-screen bg-background">
        <Dashboard />
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    // In development, show dashboard even if auth fails
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="min-h-screen bg-background">
          <Dashboard />
        </div>
      );
    }
    redirect("/sign-in");
  }
}