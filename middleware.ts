import { clerkMiddleware } from "@clerk/nextjs/server";

// This protects all routes by default
export default clerkMiddleware();

// Only run middleware on matched routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
