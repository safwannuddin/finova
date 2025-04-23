import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is a simplified middleware that bypasses authentication during development
// In production, you would use clerkMiddleware for authentication
export default function middleware(req: NextRequest) {
  // Always proceed without auth check during development
  return NextResponse.next();
}

// Only run middleware on matched routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
