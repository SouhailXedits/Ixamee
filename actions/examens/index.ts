import { create } from '@prisma/client';

const prisma = create({
  // Your Prisma configuration here
});

export default prisma;


import db from './db';

// ... (rest of the code)

export const getAllExam = async (): Promise<ExamData[]> => {
  try {
    const exams = await db.exam.findMany({
      where: {
        is_archived: false,
      },
      include: {
        exam_classess: {
          include: {
            establishment: true,
          },
        },
      },
    });
    return exams;
  } catch (error) {
    console.error('Error in getAllExam:', error);
    throw error;
  }
};

// ... (rest of the functions)
