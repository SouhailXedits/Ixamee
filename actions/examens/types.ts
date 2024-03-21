import { z } from 'zod';
import { ExamInput, ExamOutput } from './schema';

export type ExamInputType = z.TypeOf<typeof ExamInput>;
export type ExamOutputType = z.TypeOf<typeof ExamOutput>;
