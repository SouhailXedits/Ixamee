'use server';
import { db } from '@/lib/db';

import * as z from 'zod';
import { RegisterProfSchema } from '@/actions/auth/schemas';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
export const register = async (values: z.infer<typeof RegisterProfSchema>, code: number) => {
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
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'E-mail déja utilisé' };
  }

  enum UserRole {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
  }
  const mappedRole =
    role === 'TEACHER' ? UserRole.TEACHER : role === 'STUDENT' ? UserRole.STUDENT : UserRole.ADMIN;
  const image =
    'https://res.cloudinary.com/dm5d9jmf4/image/upload/v1706173047/hhg5o35yn2emjs9ehlb6.svg';
  await db.user.create({
    data: {
      name: `${first_name} ${last_name}`,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      role: mappedRole,
      government,
      image,
    },
  });

  await sendVerificationEmail(values.email, code);

  return {
    success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.`,
  };
};
