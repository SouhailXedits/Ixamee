'use server';

import * as z from 'zod';
import bcryptjs from 'bcryptjs';
import { NewPasswordSchema } from './schemas';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  
  if (!token) {
    return { error: "Jeton d'authentification manquant" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  const { password } = validatedFields.data;

  const existingUser = await getUserByEmail(values.email);

  if (!existingUser) {
    return { error: "L'adresse e-mail n'existe pas ! Veuillez vérifier votre adresse e-mail." };
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

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
};
