'use server';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

const ResetSchema = z.object({
  email: z.string().email(),
});

export const reset = async (req: Request) => {
  const values = await req.json();
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return new Response('E-mail invalid', { status: 400 });
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return new Response("Nous n'avons pas réussi à trouver votre e-mail", { status: 404 });
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(existingUser.email, passwordResetToken.token);
  return new Response('Nous vous avons envoyé un email pour réinitialiser votre mot de passe', { status: 200 });
};
