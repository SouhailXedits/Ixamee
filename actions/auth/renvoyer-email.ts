'use server';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { generateSixDigitNumber } from './codeGenerator';
import bcryptjs from 'bcryptjs';

export const renvoyer = async (email: string, field: string) => {
  if (!email) {
    return { error: 'E-mail invalid' };
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Nous n'avons pas réussi à trouver votre e-mail" };
  }

  const code = generateSixDigitNumber();
  const hashedCode = await bcryptjs.hash(code + '', 10);

  if (field === 'reset-password') {
    await sendPasswordResetEmail(existingUser.email, '', code);
  } else {
    await sendVerificationEmail(existingUser.email, code);
  }

  return { success: 'Nous vous avons renvoyé un email', hashedCode };
};
