import * as z from 'zod';
import { RegisterEtudSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterEtudSchema>) => {
  const validatedFields = RegisterEtudSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }

  return { success: `Bienvenue ${values.prenom}! Veuillez vérifier votre e-mail pour terminer l'inscription.` }
};
