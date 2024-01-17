'use server';
import * as z from 'zod';
import { ProfAfterSchema } from '@/actions/auth/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const updateStudentAfterGoogle = async (values: z.infer<typeof ProfAfterSchema>) => {
  const validatedFields = ProfAfterSchema.safeParse(values);
  const existingUser = await getUserByEmail(values.email);

  if (!validatedFields.success || !existingUser) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  try {
    const establishmentIds = values.etablissement.map((estab) => estab.id);
    const subjectIds = values.subject.map((subj) => subj.id);

    const upp = await db.user.update({
      where: { id: existingUser?.id },
      data: {
        UserEstablishment: {
          connectOrCreate: establishmentIds.map((id) => ({
            create: { establishement_id: id, assignedBy: existingUser?.id },
            where: {
              establishement_id_user_id: { establishement_id: id, user_id: existingUser?.id },
            },
          })),
        },
        Government: {
          connect: {
            id: values?.goverment?.id,
          },
        },
        role: existingUser?.role || values?.role,
      },
    });
    return { success: 'Bienvenue' };
  } catch (error) {
    console.error('Update Error:', error);
    return { error: "Quelque chose s'est mal passé" };
  }
};
