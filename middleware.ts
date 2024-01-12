import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { auth as authentification } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes';
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  console.log('🚀 ~ auth ~ isAuthRoute:', isAuthRoute);
  if (isAuthRoute) {
    const session = await authentification();
    const estabId = session?.user?.establishement_id || '1';
    if (isLoggedIn) {
      return Response.redirect(new URL(`${DEFAULT_LOGIN_REDIRECT}${estabId}/`, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/:estab_id', '/(api|trpc)(.*)'],
};
