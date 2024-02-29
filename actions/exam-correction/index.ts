'use server';
import { db } from '@/lib/db';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';

export const getAllExamCorrections = async (
  filters: { exam_id: string; classe_id: string },
  user_id: string
) => {
  if (!filters.exam_id || !filters.classe_id) return;
  try {
    const res = await db.examCorrection.findMany({
      select: {
        id: true,
        mark_obtained: true,
        rank: true,
        exam: {
          select: {
            total_mark: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      where: {
        exam: {
          id: +filters.exam_id,
          teacher_id: user_id,
          exam_classess: {
            some: {
              id: +filters.classe_id,
            },
          },
        },
        status: 'done' || 'absent' || 'notClassified' || 'pending',
        is_published: true,
      },
    });
    return res;
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam corrections.',
    };
  }
};

export const getUserCorrectionBySubject = async (
  user_id: string,
  filters: { subject_id: string; term: string }
) => {
  if (!filters.subject_id || !filters.term) return;
  try {
    const res = await db.examCorrection.findMany({
      select: {
        id: true,
        mark_obtained: true,
        rank: true,
        exam: {
          select: {
            total_mark: true,
            name: true,
            subject: {
              select: {
                name: true,
                icon: true,
                coefficient: true,
              },
            },
          },
        },
      },
      where: {
        user_id: user_id,
        exam: {
          subject_id: +filters.subject_id,
          term: filters.term,
        },
      },
    });
    return res;
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam corrections.',
    };
  }
};

export const getExamCorrectionById = async (exam_id: string, classe_id: string) => {
  try {
    console.log(exam_id);


    const res = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        exam: {
          exam_classess: {
            some: {
              id: +classe_id,
            },
          },
        },
      },
      select: {
        correction_exam_content: true,
        mark_obtained: true,
        user_id: true,
      },
    });
    return res;
    console.log(res);
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam correction.',
    };
  }
};
export const getExamCorrectionById2 = async (exam_id: string, classe_id: string) => {
  try {
    console.log(exam_id);

    const res = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        exam: {
          exam_classess: {
            some: {
              id: +classe_id,
            },
          },
        },
      },
      select: {
        correction_exam_content: true,
        mark_obtained: true,
        user_id: true,
      },
    });
    return res;
    console.log(res);
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam correction.',
    };
  }
};

export const updateStudentPrespectation = async (
  correction_id: number,
  user_id: string,
  prespectation: any
) => {
  if (!correction_id || !user_id) return;
  const res = await db.examCorrection.update({
    where: {
      id: correction_id,
    },
    data: {
      student_prespectation: prespectation,
    },
  });
  return res;
};
