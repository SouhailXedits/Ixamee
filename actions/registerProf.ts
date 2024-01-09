'use server';
import { db } from '@/lib/db';

import * as z from 'zod';
import { RegisterProfSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/data/user';
export const register = async (values: z.infer<typeof RegisterProfSchema>) => {
  const validatedFields = RegisterProfSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }
  const {
    nom: first_name,
    prenom: last_name,
    email,
    password,
    government,
    role,
    phone: phone_number,
  } = validatedFields.data;
  const hashesPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'E-mail déja utilisé' };
  }
  // const government_id = await db.government.findUnique({
  //   where: {
  //     government,
  //   },
  // });
  const government_id = 1;

  await db.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashesPassword,
      phone_number,
      role,
      government_id,
    },
  });

  return {
    success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.`,
  };
};
