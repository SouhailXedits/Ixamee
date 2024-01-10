import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        let boolString = 'true';
        const validatedFields = LoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
          rememberMe: credentials.rememberMe === boolString,
        });

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
