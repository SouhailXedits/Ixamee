'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)    
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };

  const { email, password, rememberMe } = validatedFields?.data;

  try {
    await signIn('credentials', {
      email,
      password,
      rememberMe,
      // redirectTo: DEFAULT_LOGIN_REDIRECT+"12/",
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
