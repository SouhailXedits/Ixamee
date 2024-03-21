'use server';
import * as z from 'zod';
import { ProfAfterSchema } from '@/actions/auth/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const updateTeacherAfterGoogle = async (values: z.infer<typeof ProfAfterSchema>) => {
  const validatedFields = ProfAfterSchema.safeParse(values);
  const existingUser = validatedFields.data.email ? await getUserByEmail(validatedFields.data.email) : undefined;

  if (!validatedFields.success) {
    return { error: 'Veuillez renseigner tous les champs.' };
  }

  if (existingUser && existingUser.role !== 'TEACHER') {
    return { error: 'Cet utilisateur n\'est pas un enseignant.' };
  }

  const establishmentIds = validatedFields.data.etablissement.map((estab: any) => estab.id);
  const subjectIds = validatedFields.data.subject.map((subj: any) => subj.id);

  const mappedTerm =
    validatedFields.data.systeme === 'TRIMESTRE'
      ? 'TRIMESTRE'
      : validatedFields.data.systeme === 'SEMESTRE'
      ? 'SEMESTRE'
      : 'LIBRE';

  const mappedRole = existingUser?.role || validatedFields.data.role || 'ADMIN';

  try {
    await db.user.update({
      where: { id: existingUser?.id },
      data: {
        term: mappedTerm,
        role: mappedRole,
        user_establishment: {
          connect: establishmentIds.map((id: any) => ({ id })),
        },
        subjects: {
          connect: subjectIds.map((id: any) => ({ id })),
        },
      },
    });
    return { success: 'Bienvenue' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
