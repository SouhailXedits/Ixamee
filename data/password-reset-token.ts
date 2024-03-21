import { db } from '@/lib/db';

export const getPasswordResetTokenByToken = async (token: string): Promise<typeof db.passwordResetToken | null> => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordToken;
  } catch (error) {
    console.error('Error while fetching password reset token by token:', error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string): Promise<typeof db.passwordResetToken | null> => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordToken;
  } catch (error) {
    console.error('Error while fetching password reset token by email:', error);
    return null;
  }
};

