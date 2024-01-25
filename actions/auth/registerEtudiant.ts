'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { RegisterEtudSchema } from '@/actions/auth/schemas';
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
export const register = async (values: z.infer<typeof RegisterEtudSchema>, code: number) => {
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
      password: hashesPassword,
      role: mappedRole,
      government,
      image,
      user_establishment: {
        connect: { id: establishment[0].id },
      },
      classe: {
        connect: { id: classe[0].id },
      },
    },
  });
  await sendVerificationEmail(values.email, code);
  return {
    success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.`,
  };
};
