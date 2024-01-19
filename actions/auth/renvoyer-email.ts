'use server';
import * as z from 'zod';
import { ResetSchema } from './schemas';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const renvoyer = async (values: z.infer<typeof ResetSchema>, code: number) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'E-mail invalid' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Nous n'avons pas réussi à trouver votre e-mail" };
  }

  await sendVerificationEmail(existingUser.email, code);
  
  return { success: 'Nous vous avons renvoyé un email' };
};
