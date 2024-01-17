'use server';
import * as z from 'zod';
import { LoginSchema } from '@/actions/auth/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail, getUserEstablishmentByUserId } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>, code: number) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success)
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };

  const { email, password, rememberMe } = validatedFields?.data;

  const existingUser = await getUserByEmail(email);
  const userEstablishment = await getUserEstablishmentByUserId(existingUser?.id);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };
  }

  if (!existingUser.emailVerified) {
    // const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, code);

    return { success: 'Un e-mail a été envoyé ! Veuillez vérifier votre compte.' };
  }
  if (!userEstablishment.length && existingUser.role === 'TEACHER') {
    // localStorage.setItem('email-verification', JSON.stringify({ email: values.email,code: hashedCode }));
    return { success: 'Vous étes presque arrivé ! complete votre inscription' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      rememberMe,
      redirectTo: `/${userEstablishment[0].id}`,
    }).then(() => {
      return { success: 'Bienvenue' };
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };
        default:
          return { error: "Quelque chose s'est mal passé" };
      }
    }
    throw error;
  }
};
