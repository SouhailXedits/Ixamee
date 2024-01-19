'use server';
import * as z from 'zod';
import { ResetSchema } from './schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>, code: number) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'E-mail invalid' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Nous n'avons pas réussi à trouver votre e-mail" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(existingUser.email, passwordResetToken.token, code);
  return { success: 'Nous vous avons envoyé un email pour réinitialiser votre mot de passe' };
};
