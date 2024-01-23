import * as z from 'zod';

export const UpdatePasswordSchema = z
  .object({
    email: z.string().optional(),
    actualPassord: z.string().min(8, {
      message: 'Mot de passe actuel est requis',
    }),
    newPassword: z
      .string()
      .min(8, {
        message: 'Minimum 8 caractères',
      })
      .refine(
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value),
        {
          message:
            'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
        }
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Le nouveau mot de passe et la confirmation doivent être identiques',
    path: ['confirmNewPassword'],
  });

export const UpdateTeacherSchema = z.object({
  image: z.string(),
  name: z.string().min(2, {
    message: 'le nom est requis (3 lettre au minimum)',
  }),
  email: z.string().email({
    message: "L'email est requis",
  }),
  phone: z
    .string()
    .refine((value) => /^[2459]\d{7}$/.test(value), {
      message:
        'Le numéro de téléphone doit commencer par 2, 4, 5, ou 9 et avoir 8 chiffres au total',
    })
    .optional(),
  government: z.string().min(3, {
    message: 'La gouvernorat est requis',
  }),
  subject: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
        label: z.string(),
      })
    )
    .refine((data) => data.length >= 1, {
      message: 'La matière est requise',
    }),
  etablissement: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
        label: z.string(),
      })
    )
    .refine((data) => data.length >= 1, {
      message: "L'établissement est requis",
    }),
});
