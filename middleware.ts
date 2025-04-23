import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default clerkMiddleware({
  // Allow access to public routes even when not signed in
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/onboarding(.*)",
    "/api/webhook(.*)"
  ],
  
  // For development, allow dashboard access without authentication
  afterAuth(auth: { userId: string | null; isPublicRoute: boolean }, req: NextRequest) {
    // If in development and trying to access protected route, allow it
    if (process.env.NODE_ENV === 'development' && !auth.userId && !auth.isPublicRoute) {
      console.log("Development mode: Bypassing auth for protected route:", req.nextUrl.pathname);
      return;
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
