import { Role, Establishment } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: Role;
  establishmentId: number;
  establishment?: Establishment;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
