'use server';
import { db } from '@/lib/db';

import * as z from 'zod';
import { RegisterProfSchema } from '@/actions/auth/schemas';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
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
  const hashesPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  console.log('🚀 ~ register ~ existingUser:', existingUser);


  if (existingUser) {
    return { error: 'E-mail déja utilisé' };
  }
  const gov = await db.government.findFirst({
    where: {
      government,
    },
  });
  const government_id = gov?.id;
  await db.user.create({
    data: {
      name: `${first_name} ${last_name}`,
      first_name,
      last_name,
      email,
      password: hashesPassword,
      phone_number,
      role,
      Government: {
        connect: {
          id: government_id,
        },
      },
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email);

  return {
    success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.`,
  };
};
