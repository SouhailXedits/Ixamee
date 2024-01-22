'use server';

import * as z from 'zod';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { UpdatePasswordSchema } from './schemas';

export const updatePassword = async (values: z.infer<typeof UpdatePasswordSchema>) => {
  const validatedFields = UpdatePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  const { actualPassord, newPassword } = validatedFields.data;

  const existingUser = await getUserByEmail(values?.email as string);

  if (!existingUser) {
    return { error: "L'adresse e-mail n'existe pas ! Veuillez vérifier votre adresse e-mail." };
  }

  const compare = await bcryptjs.compare(actualPassord, existingUser?.password as string);

  if (compare) {
    try {
      const hashedPassword = await bcryptjs.hash(newPassword, 10);

      await db.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return { success: 'Mot de passe mis à jour avec succès.' };
    } catch (error) {
      return {
        error:
          "Une erreur s'est produite lors de la mise à jour du mot de passe. Veuillez réessayer ultérieurement.",
      };
    }
  } else {
    return { error: 'Mot de passe actuel est incorrect' };
  }
};
