'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  
  if (!validatedFields.success) return { error: 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.' };
  return { success: 'Bienvenu' };
};
