'use server';
import * as z from 'zod';
import { InvitSchema } from '@/actions/auth/schemas';
import { AuthError } from 'next-auth';
import { db } from '@/lib/db';
import bcryptjs from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/mail';
export const RegisterInvitedStudent = async (values: z.infer<typeof InvitSchema>, code: number) => {
  const validatedFields = InvitSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };

  const { email, password } = validatedFields?.data;

  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    await db.user
      .update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      })
      .then(async (data :any) => {
        await sendVerificationEmail(email, code);
      });
    return { success: 'Un e-mail a été envoyé ! Veuillez vérifier votre compte.' };
  } catch (error ) {
    throw error;
  }
};
