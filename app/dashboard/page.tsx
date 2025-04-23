import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/Header";

export default async function DashboardPage() {
  try {
    // Check if user is authenticated
    const { userId } = await auth();
    
    // If not authenticated, redirect to sign in
    if (!userId) {
      redirect("/sign-in");
    }
  
    const user = await currentUser();
    
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || "User"}!</h1>
          {/* Dashboard content */}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    redirect("/sign-in");
  }
}