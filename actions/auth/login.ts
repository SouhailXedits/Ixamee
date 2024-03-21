'use server';
import * as z from 'zod';
import { LoginSchema } from '@/actions/auth/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail, getUserEstablishmentByUserId } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export type LoginValues = z.infer<typeof LoginSchema>;

export async function login(values: LoginValues, code: number): Promise<{ error?: string; success?: string; role?: string; password?: string; rememberMe?: boolean }> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };

  const { email, password, rememberMe } = validatedFields.data;

  let existingUser;
  try {
    existingUser = await getUserByEmail(email);
  } catch (err) {
    return { error: 'Une erreur est survenue lors de la vérification de l\'adresse e-mail. Veuillez réessayer.' };
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };
  }

  if (!existingUser.emailVerified) {
    try {
      await sendVerificationEmail(existingUser.email, code);
    } catch (err) {
      return { error: 'Une erreur est survenue lors de l\'envoi de l\'e-mail de vérification. Veuillez réessayer.' };
    }

    return {
      success: 'Un e-mail a été envoyé ! Veuillez vérifier votre compte.',
      role: existingUser.role,
      password,
      rememberMe,
    };
  }

  let userEstablishment;
  try {
    if (existingUser.id) {
      userEstablishment = await getUserEstablishmentByUserId(existingUser.id);
    } else {
      userEstablishment = [];
    }
  } catch (err) {
    return { error: 'Une erreur est survenue lors de la récupération de l\'établissement de l\'utilisateur. Veuillez réessayer.' };
  }

  if (!userEstablishment.length && existingUser.role === 'TEACHER') {
    return { success: 'Vous étes presque arrivé ! complete votre inscription' };
  }

  try {
    const signInResult = await signIn('credentials', {
      email,
      password
