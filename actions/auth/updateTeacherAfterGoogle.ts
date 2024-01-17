'use server';
import * as z from 'zod';
import { ProfAfterSchema } from '@/actions/auth/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const updateTeacherAfterGoogle = async (values: z.infer<typeof ProfAfterSchema>) => {
  const validatedFields = ProfAfterSchema.safeParse(values);
  console.log('🚀 ~ updateTeacherAfterGoogle ~ values:', values);

  const existingUser = values?.email ? await getUserByEmail(values?.email) : undefined;

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  try {
    const establishmentIds = values.etablissement.map((estab) => estab.id);
    const subjectIds = values.subject.map((subj) => subj.id);
    enum UserTerm {
      TRIMESTRE = 'TRIMESTRE',
      SEMESTRE = 'SEMESTRE',
      LIBRE = 'LIBRE',
    }
    const mappedTerm =
      values.systeme === 'TRIMESTRE'
        ? UserTerm.TRIMESTRE
        : values.systeme === 'SEMESTRE'
        ? UserTerm.SEMESTRE
        : UserTerm.LIBRE;
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
        term: mappedTerm,
        role: mappedRole,
        UserEstablishment: {
          connect: establishmentIds.map((id) => ({ id })),
        },
        subjects: {
          connect: subjectIds.map((id) => ({ id })),
        },
      },
    });
    return { success: 'Bienvenue' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
