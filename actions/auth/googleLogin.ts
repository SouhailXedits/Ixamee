'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const googleLogin = async () => {
  const link = `/`;
  try {
    await signIn('google', {
      redirectTo: link,
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
