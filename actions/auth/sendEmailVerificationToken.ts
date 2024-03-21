'use server';

import { generateVerificationToken } from '@/lib/tokens';
import { redirect } from 'next/navigation';

export async function sendEmailVerificationToken(email: string): Promise<void> {
  try {
    const verifToken = await generateVerificationToken(email);
    const url = `/new-verification?token=${verifToken.token}`;
    redirect(url);
  } catch (error) {
    console.error('Error generating verification token:', error);
    // Handle the error, e.g., show a message to the user
  }
}

// Usage example
try {
  await sendEmailVerificationToken('user@example.com');
  // Redirect was successful
} catch (error) {
  console.error('Error during redirection:', error);
  // Handle the error, e.g., show a message to the user
}
