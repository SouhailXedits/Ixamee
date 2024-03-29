'use server';
import * as z from 'zod';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { UpdateTeacherSchema } from './schemas';

export const updateTeacherCredentials = async (values: z.infer<typeof UpdateTeacherSchema>) => {
  const validatedFields = UpdateTeacherSchema.safeParse(values);
  const existingUser = values?.email ? await getUserByEmail(values?.email) : undefined;

  if (!validatedFields.success) {
    return { error: 'Taille maximale est de 2 Mo.' };
  }

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  try {
    const establishmentIds = values.etablissement.map((estab :any) => estab.id);
    const subjectIds = values.subject.map((subj :any) => subj.id);

    await db.user.update({
      where: { id: existingUser?.id },
      data: {
        name: values.name,
        email: values.email,
        phone_number: values?.phone,
        government:values.government,
        image: values.image,
        user_establishment: {
          set: establishmentIds.map((id :any) => ({ id })),
        },
        subjects: {
          set: subjectIds.map((id :any) => ({ id })),
        },
      },
    });
    return { success: 'vos Informations personnelles mis a jour avec success' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
