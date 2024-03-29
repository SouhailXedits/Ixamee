import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis",
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe est requis',
  }),
  rememberMe: z.boolean(),
});

export const RegisterEtudSchema = z.object({
  role: z.string().default('professeur'),
  nom: z.string().min(3, {
    message: 'le nom est requis (3 lettre au minimum)',
  }),
  prenom: z.string().min(3, {
    message: 'le prenom est requis (3 lettre au minimum)',
  }),
  email: z.string().email({
    message: "L'email est requis",
  }),
  gouvernorat: z.string().min(3, {
    message: 'La gouvernorat est requis',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Minimum 8 caractères',
    })
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value), {
      message:
        'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
    }),
  confirmPassword: z.string(),
  etablissement: z.string().min(3, {
    message: "L'etablissement est requis",
  }),
  classe: z.string().min(3, {
    message: 'La classe est requis',
  }),
  // .refine((value, data: any) => value === data.password, {
  //   message: "Les mots de passe ne correspondent pas",
  // }),
});

export const RegisterProfSchema = z.object({
  role: z.string().default('professeur'),
  nom: z.string().min(3, {
    message: 'le nom est requis (3 lettre au minimum)',
  }),
  prenom: z.string().min(3, {
    message: 'le prenom est requis (3 lettre au minimum)',
  }),
  email: z.string().email({
    message: "L'email est requis",
  }),
  phone: z
    .string()
    .min(8, {
      message: 'Le numéro de téléphone est requis (8 chiffres)',
    })
    .max(8),
  gouvernorat: z.string().min(3, {
    message: 'La gouvernorat est requis',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Minimum 8 caractères',
    })
    .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value), {
      message:
        'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
    }),
});
