"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OnboardingComplete() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    // Redirect to sign-up page
    router.push("/sign-up");
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Onboarding Complete!</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        You've successfully completed the setup process. To access your personalized dashboard, please create an account or sign in.
      </p>
      <Button onClick={handleContinue} className="w-full max-w-sm" size="lg">
        {loading ? "Loading..." : "Continue to Create Account"}
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <a 
          href="/sign-in" 
          className="text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault();
            router.push("/sign-in");
          }}
        >
          Sign in
        </a>
      </p>
    </div>
  );
}