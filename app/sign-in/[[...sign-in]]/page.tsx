'use client';

import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your personalized financial dashboard
          </p>
        </div>
        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              card: "bg-card shadow-md border border-border",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
            },
          }}
          afterSignInUrl="/dashboard"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}