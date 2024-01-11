'use server';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const googleLogin = async () => {
  try {
    await signIn('google', {
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };

        default:
          return { error: "Quelque chose s'est mal passé avec Google" };
      }
    }
    throw error;
  }
};
