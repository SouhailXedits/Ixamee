'use server';
import * as z from 'zod';
import { EtudiantAfterSchema } from '@/actions/auth/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const updateStudentAfterGoogle = async (values: z.infer<typeof EtudiantAfterSchema>) => {
  const validatedFields = EtudiantAfterSchema.safeParse(values);
  const existingUser = values?.email ? await getUserByEmail(values?.email) : undefined;

  if (!validatedFields.success) {
    return { error: 'Veuillez renseigner tous les champs.' };
  }

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }
  const { government, etablissement: establishment, classe } = validatedFields.data;
  try {
    enum UserRole {
      ADMIN = 'ADMIN',
      STUDENT = 'STUDENT',
      TEACHER = 'TEACHER',
    }
    const mappedRole =
      existingUser?.role || values?.role === 'TEACHER'
        ? UserRole.TEACHER
        : existingUser?.role || values?.role === 'STUDENT'
        ? UserRole.STUDENT
        : UserRole.ADMIN;

    await db.user.update({
      where: { id: existingUser?.id },
      data: {
        role: mappedRole,
        government,
        user_establishment: {
          connect: { id: establishment[0].id },
        },
        classe: {
          connect: { id: classe[0].id },
        },
      },
    });
    return { success: 'Bienvenue' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
