// sendPasswordResetToken.ts

import { generatePasswordResetToken } from '@/lib/tokens';
import { redirect } from 'next/navigation';

export async function sendPasswordResetToken(email: string) {
  try {
    const passwordResetToken = await generatePasswordResetToken(email);
    redirect(`/new-password?token=${passwordResetToken.token}`);
  } catch (error) {
    console.error('Error sending password reset token:', error);
    throw new Error('An error occurred while sending the password reset token. Please try again later.');
  }
}
