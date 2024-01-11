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

export const RegisterEtudSchema = z
  .object({
    role: z.string().default('TEACHER'),
    nom: z.string().min(2, {
      message: 'le nom est requis (3 lettre au minimum)',
    }),
    prenom: z.string().min(2, {
      message: 'le prenom est requis (3 lettre au minimum)',
    }),
    email: z.string().email({
      message: "L'email est requis",
    }),
    government: z.string().min(3, {
      message: 'La gouvernorat est requis',
    }),
    password: z
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
    confirmPassword: z.string(),
    etablissement: z.string().min(3, {
      message: "L'etablissement est requis",
    }),
    classe: z.string().min(3, {
      message: 'La classe est requis',
    }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: 'Le mot de passe et la confirmation doivent être identiques',
    path: ['confirmPassword'],
  });

export const RegisterProfSchema = z.object({
  role: z.string().default('TEACHER'),
  nom: z.string().min(2, {
    message: 'le nom est requis (3 lettre au minimum)',
  }),
  prenom: z.string().min(2, {
    message: 'le prenom est requis (3 lettre au minimum)',
  }),
  email: z.string().email({
    message: "L'email est requis",
  }),
  phone: z.string().refine((value) => /^[2459]\d{7}$/.test(value), {
    message: 'Le numéro de téléphone doit commencer par 2, 4, 5, ou 9 et avoir 8 chiffres au total',
  }),
  government: z.string().min(3, {
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

export const VerifSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'code de 6 chiffres',
    })
    .max(6, {
      message: 'code de 6 chiffres',
    }),
});

export const EtudiantAfterSchema = z.object({
  role: z.string().default('TEACHER'),
  government: z.string().min(3, {
    message: 'La gouvernorat est requis',
  }),
  etablissement: z.string().min(3, {
    message: "L'etablissement est requis",
  }),
  classe: z.string().min(3, {
    message: 'La classe est requis',
  }),
});
export const ProfAfterSchema = z.object({
  role: z.string().default('TEACHER'),
  subject: z.string().min(3, {
    message: 'La matière est requis',
  }),
  etablissement: z.string().min(3, {
    message: "L'etablissement est requis",
  }),
  systeme: z.string().min(3, {
    message: 'Le système pédagogique est requis',
  }),
});
