import { auth } from './auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("🚀 ~  ~ auth ~ isLoggedIn:", isLoggedIn)
  console.log(req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
