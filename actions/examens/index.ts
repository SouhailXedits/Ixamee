// index.ts
'use server'
import { db } from '@/lib/db';




export const getAllExam = async () => {
  try {
    console.log('start');
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




// export async function fetchAllExam() {
//   const res = await getAllExam()
//   console.log(res)
//   return res
// }
