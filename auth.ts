import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './data/user';
import { Role } from '@prisma/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      console.log('🚀 ~ signIn ~ { user }:', { user });
      const existingUser = await getUserById(user.id);
      console.log('🚀 ~ signIn ~ existingUser:', existingUser);

      // if (!existingUser || !existingUser.emailVerified) {
      //   return false;
      // }

      return true;
    },
    async session({ token, session }) {
      console.log(token, session.user);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
