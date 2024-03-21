'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export async function emailVerification(email: string, token: string | null) {
  if (!token) {
    return { error: "Authentication token is missing" };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
      },
    });

    return { success: 'Email verified successfully' };
  } catch (error) {
    return { error: 'An error occurred while verifying the email' };
  }
}

