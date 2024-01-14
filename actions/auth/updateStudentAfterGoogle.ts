'use server';
import * as z from 'zod';
import { EtudiantAfterSchema } from '@/actions/auth/schemas';
import { AuthError } from 'next-auth';
import { db } from '@/lib/db';

export const updateStudentAfterGoogle = async (values: z.infer<typeof EtudiantAfterSchema>) => {
  const validatedFields = EtudiantAfterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  try {
    await db.user
      .update({
        where: { email: values.email },
        data: {
          UserEstablishment: {
            connect: {
              establishement: values.etablissement,
            },
          },
        },
      })
      .then(() => {
        return { success: 'Bienvenue' };
      });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Quelque chose s'est mal passé" };
    }
    throw error;
  }
};
