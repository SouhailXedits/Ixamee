'use server';
import * as z from 'zod';
import { EtudiantAfterSchema } from '@/actions/auth/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

type UserRole = 'ADMIN' | 'STUDENT' | 'TEACHER';

export const updateStudentAfterGoogle = async (values: z.infer<typeof EtudiantAfterSchema>) => {
  const validatedFields = EtudiantAfterSchema.safeParse(values);
  const existingUser = validatedFields.success && values?.email ? await getUserByEmail(values?.email) : undefined;

  if (!validatedFields.success) {
    return { error: 'Veuillez renseigner tous les champs.' };
  }

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  const { government, etablissement: establishment } = validatedFields.data;

  const mappedRole: UserRole = (existingUser.role || values.role) === 'TEACHER'
    ? 'TEACHER'
    : (existingUser.role || values.role) === 'STUDENT'
    ? 'STUDENT'
    : 'ADMIN';

  try {
    await db.user.update({
      where: { id: existingUser?.id },
      data: {
        role: mappedRole,
        government,
        user_establishment: {
          connect: { id: establishment[0].id },
        },
      },
    });
    return { success: 'Bienvenue' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
