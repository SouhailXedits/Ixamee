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
    return { success: 'Bienvenue !' };
  } catch (error ) {
    throw error;
  }
};
