// index.ts
import { db } from '@/lib/db';

export const getAllExam = async () => {
  try {
    console.log('dskdksdk');
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
