// schema.ts
import { z } from 'zod';

export const ExamInput = z.object({
  name: z.string(),
  examEstablishment: z.array(z.string()).min(1),
  total_mark: z.number(),
  coefficient: z.number(),
  teacher_id: z.number(),
  class_id: z.number(),
  subject_id: z.number(),
});

export const ExamOutput = z.object({
  data: z.object({
    id: z.number(),
    examEstablishment: z.array(z.string()).min(1),
    name: z.string(),
    total_mark: z.number(),
    coefficient: z.number(),
    teacher_id: z.number(),
    class_id: z.number(),
    subject_id: z.number(),
  }),
  error: z.string().optional(),
});
