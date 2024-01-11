// index.ts
'use server';
import { db } from '@/lib/db';

import { createSafeAction } from '@/lib/create-safe-action';
import { ExamInputType, ExamOutputType } from './types';

// const handler = async (data: ExamInputType): Promise<ExamOutputType> => {
//   try {
//     // Create a new exam
//     const exam = await db.exam.create({
//       data: {
//         name: data.name,
//         examEstablishment: data.examEstablishment,
//         total_mark: data.total_mark,
//         coefficient: data.coefficient,
//         teacher_id: data.teacher_id,
//         class_id: data.class_id,
//         subject_id: data.subject_id,
//       },
//     });

//     return { data: exam, error: undefined };
//   } catch (error: any) {
//     return {
//       data: undefined as any,
//       error: 'Failed to create exam.',
//     };
//   }
// };

// export const createExam = createSafeAction(handler);

export const getAllExam = async () => {
  try {
    console.log('get all exam');
    const exam = await db.exam.findMany();
    console.log(exam);
    return { data: exam, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam.',
    };
  }
};
