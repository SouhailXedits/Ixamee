'use server';
import * as z from 'zod';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { UpdateTeacherSchema } from './schemas';

export const updateTeacherCredentials = async (values: z.infer<typeof UpdateTeacherSchema>) => {
  const validatedFields = UpdateTeacherSchema.safeParse(values);
  const existingUser = values?.email ? await getUserByEmail(values?.email) : undefined;

  if (!validatedFields.success) {
    return { error: 'Veuillez renseigner les champs.' };
  }

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  try {
    const establishmentIds = values.etablissement.map((estab) => estab.id);
    const subjectIds = values.subject.map((subj) => subj.id);

    await db.user.update({
      where: { id: existingUser?.id },
      data: {
        name: values.name,
        email: values.email,
        phone_number: values.phone,
        user_establishment: {
          connect: establishmentIds.map((id) => ({ id })),
        },
        subjects: {
          connect: subjectIds.map((id) => ({ id })),
        },
      },
    });
    return { success: 'vos Informations personnelles mis a jour avec success' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
