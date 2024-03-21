import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est requis",
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe est requis (Minimum 8 caractères)',
  }),
  rememberMe: z.boolean(),
});

export const RegisterEtudSchema = z
  .object({
    role: z.string().default('TEACHER'),
    nom: z.string().min(3, {
      message: 'le nom est requis (3 lettre au minimum)',
    }),
    prenom: z.string().min(3, {
      message: 'le prenom est requis (3 lettre au minimum)',
    }),
    email: z.string().email({
      message: "L'email est requis",
    }),
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 caractères',
      })
      .refine(
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>+-])/.test(value),
        {
          message:
            'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
        }
      )
      .superRefine(({ password }, ctx) => {
        if (password !== ctx.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Le mot de passe et la confirmation doivent être identiques',
            path: ['confirmPassword'],
          });
        }
      }),
    confirmPassword: z.string(),
    government: z.string().min(3, {
      message: 'La gouvernorat est requis',
    }),
    etablissement: z
      .array(
        z.object({
          id: z.number(),
          value: z.string(),
          label: z.string(),
        })
      )
      .nonempty({
        message: "L'établissement est requis",
      }),
  });

export const RegisterProfSchema = z.object({
  role: z.string().default('TEACHER'),
  nom: z.string().min(3, {
    message: 'le nom est requis (3 lettre au minimum)',
  }),
  prenom: z.string().min(3, {
    message: 'le prenom est requis (3 lettre au minimum)',
  }),
  email: z.string().email({
    message: "L'email est requis",
  }),
  phone: z.string().regex(/^[2459]\d{7}$/, {
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
    .refine(
      (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>+-])/.test(value),
      {
        message:
          'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial',
      }
    ),
});

export const NewVerifSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Le code est requis (6 chiffres)',
    })
    .max(6, {
      message: 'Le code est requis (6 chiffres)',
    }),
});

export const VerifSchema = z.object({
  code: z.string(),
});

export const EtudiantAfterSchema = z.object({
  role: z.string().default('ETUDIANT').optional(),
  email: z.string().optional(),
  government: z.string().min(3, {
    message: 'La gouvernorat est requis',
  }),
  etablissement: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({
      message: "L'établissement est requis",
    }),
});

export const ProfAfterSchema = z.object({
  role: z.string().default('TEACHER').optional(),
  email: z.string().optional(),
  subject: z
    .array(
      z.object({
        id: z.number(),
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({
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
    .nonempty({
      message: "L'établissement
