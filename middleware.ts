import NextAuth from 'next-auth';
import { authRoutes, publicRoutes, apiAuthPrefix } from '@/routes';

type NextAuthRequest = {
  req: Request & {
    auth?: any;
    nextUrl: URL;
  };
}

const auth = NextAuth(authConfig);

export default async function middleware(req: NextAuthRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute && isPublicRoute) {
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    try {
      return Response.redirect(new URL(`/login`, nextUrl));
    } catch (e) {
      return new Response('Failed to redirect', { status: 500 });
    }
  }

  return null;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
