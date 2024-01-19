'use server';

import { generatePasswordResetToken } from '@/lib/tokens';
import { redirect } from 'next/navigation';

export const sendPasswordResetToken = async (email: string) => {
  const passwordResetToken = await generatePasswordResetToken(email);
  redirect(`/new-password?token=${passwordResetToken.token}`);
};
