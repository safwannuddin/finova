import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join Finova to access your personalized financial dashboard
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              card: "bg-card shadow-md border border-border",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
            },
          }}
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}