import { authMiddleware } from "@clerk/nextjs";

/**
 * This middleware protects all routes including api/trpc routes
 * See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
 */
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook(.*)",
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
    "/api/openai(.*)",
    "/_next/static/(.*)",
    "/favicon.ico",
    "/images/(.*)"
  ],
  ignoredRoutes: [
    "/api/openai(.*)",
    "/api/webhook(.*)"
  ],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }

    // If the user is signed in and trying to access the home page,
    // redirect them to the dashboard
    if (auth.userId && req.url === new URL('/', req.url).toString()) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
