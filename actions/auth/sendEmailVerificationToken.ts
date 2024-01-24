'use server';

import { generateVerificationToken } from '@/lib/tokens';
import { redirect } from 'next/navigation';

export const sendEmailVerificationToken = async (email: string) => {
  const verifToken = await generateVerificationToken(email);
  redirect(`/new-verification?token=${verifToken.token}`);
};
