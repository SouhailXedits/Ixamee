'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const emailVerification = async (email: string, token: string | null) => {  
  if (!token) {
    return { error: "Jeton d'authentification manquant" };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "email n'existe pas ! " };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
    },
  });

  return { success: 'email verifiée avec succée' };
};
