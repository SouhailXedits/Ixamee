import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: Role;
  establishement_id: number;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
