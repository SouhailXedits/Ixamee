'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const googleLogin = async () => {
  const redirectUrl = '/';
  try {
    await signIn('google', {
      redirectUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      let errorMessage;
      switch (error.type) {
        case 'CredentialsSignin':
          errorMessage = 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.';
          break;

        case 'OAuthSignin':
          errorMessage = 'Erreur lors de la connexion avec Google. Veuillez réessayer.';
          break;

        default:
          errorMessage = 'Quelque chose s\'est mal passé lors de la connexion. Veuillez réessayer.';
      }
      return { error: errorMessage };
    }
    throw error;
  }
};

