import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@/actions/auth/schemas';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        let boolString = 'true';
        const validatedFields = LoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
          rememberMe: credentials.rememberMe === boolString,
        }) as any;

        if (validatedFields) {
          const { email, password } = validatedFields?.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
