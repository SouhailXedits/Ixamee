// index.ts
'use server';

import Student from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/page';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';
interface ExamEstablishment {
  establishement_id: number;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
}

interface Class {
  id: string;
  name: string;
  range: string;
  establishment_id: number;
  teacher_id: string;
  is_archived: boolean;
}

interface ExamClass {
  classe_id: string;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
  class: Class;
}

interface ExamData {
  id: number;
  name: string;
  total_mark: number;
  coefficient: number;
  teacher_id: string;
  class_id: number;
  subject_id: number;
  term: string | null;
  examEstablishment: ExamEstablishment;
  ExamClassess: ExamClass[];
}
export const getAllExam = async ({ user_id, etab_id }: { user_id: string; etab_id: number }) => {
  const exams = await db.exam.findMany({
    where: {
      teacher_id: user_id,
      examEstablishment: {
        some: {
          establishement_id: +etab_id,
        },
      },
    },
    select: {
      id: true,
      name: true,
      total_mark: true,
      coefficient: true,
      teacher_id: true,
      class_id: true,
      subject_id: true,
      ExamClassess: {
        select: {
          classe_id: true,
          exam_id: true,
          assignedAt: true,
          assignedBy: true,
          class: {
            select: {
              id: true,
              name: true,
              range: true,
              establishment_id: true,
              teacher_id: true,
              is_archived: true,
            },
          },
        },
      },
    },
  });

  return exams;
};

export const getMe = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
};
export const getClasseOfUser = async (user_id: string) => {
  const classe = await db.user.findMany({
    where: {
      id: user_id,
    },
    select: {
      classe: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return classe;
};
export const getSubjectOfUser = async (user_id: string) => {
  const subject = await db.subject.findMany({
    where: {
      user: {
        some: {
          user_id: user_id,
        },
      },
    },
  });
  return subject;
};
export const getTermOfUser = async (user_id: string) => {
  const term = await db.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      term: true,
    },
  });
  return term;
};
export const getEstablishmentOfUser = async (user_id: string) => {
  const data = await db.userEstablishment.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      establishement: true,
    },
  });

  return data;
};

export const getOneExamById = async ({ id }: { id: number }) => {
  try {
    const exam = await db.exam.findUnique({ where: { id: id } });
    console.log(exam);
    return { data: exam, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exam.',
    };
  }
};

export async function createExamm(data: any, user_id: string) {
  console.log(data);
  console.log(user_id);
  try {
    const examm = await db.exam.create({
      data: {
        name: data.name,
        total_mark: +data.totalMarks,
        coefficient: +data.coefficient,
        teacher: {
          connect: {
            id: user_id,
          },
        },
        class_id: 1,
        subject: {
          connect: {
            id: +data.subject.value,
          },
        },
        term: data.term,

        ExamClassess: {
          create: data.classes.map((classId: any) => ({
            class: {
              connect: { id: classId.value },
            },
            assignedBy: 'some_value', // Add the assignedBy field with a value
          })),
        },
        examEstablishment: {
          create: data.establishment.map((establishmentId: any) => ({
            establishement: {
              connect: { id: 1 },
            },
            assignedBy: user_id,
          })),
        },
      },
    });
    console.log(examm);
    return examm;
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
}
