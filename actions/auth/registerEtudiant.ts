
'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { RegisterEtudSchema } from '@/actions/auth/schemas';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
export const register = async (values: z.infer<typeof RegisterEtudSchema>) => {
  const validatedFields = RegisterEtudSchema.safeParse(values);

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
    etablissement: establishment,
    classe,
  } = validatedFields.data;
  const hashesPassword = await bcryptjs.hash(password, 10);

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
  const establishement_id = 1;
  const classe_id = 1;


  await db.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashesPassword,
      classe,
      role,
      government_id,
      establishement_id,
      classe_id,
    },
  });

  return {
    success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.`,
  };
};
