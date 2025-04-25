"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function OnboardingComplete() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleCreateAccount = () => {
    setLoading(true);
    router.push("/sign-up");
  };

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 text-center bg-background/95">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold mb-3">Setup Complete!</h1>
      <p className="text-muted-foreground mb-6 max-w-md text-lg">
        Great job! You've successfully completed the setup process. To access your personalized dashboard, please create an account or sign in.
      </p>
      <div className="w-full max-w-sm space-y-4">
        <Button 
          onClick={handleCreateAccount} 
          className="w-full" 
          size="lg"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Create Account"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a 
            href="/sign-in"
            onClick={handleSignIn}
            className="text-primary hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}