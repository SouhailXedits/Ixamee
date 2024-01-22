// index.ts
'use server';

import Student from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/page';
import { auth } from '@/auth';
import { db } from '@/lib/db';
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
      teacher: {
        some: {
          id: user_id,
        },
      },
      exam_classess: {
        some: {
          establishment: {
            some: {
              id: +etab_id,
            },
          },
        },
      },
      is_archived: false,
    },
    include: {
      // teacher: true,
      exam_classess: true,
    },
  });
  console.log(exams);
  return exams;
};
export const getUserSubject = async (user_id: string) => {
  const subject = await db.subject.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
    },
  });
  console.log(subject);
  return subject;
};

export const getMe = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
};
export const getClasseOfUser = async (user_id: string, userEstablishments: any) => {
  console.log(userEstablishments);
  console.log(user_id);

  const classe = await db.classe.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
      establishment: {
        some: {
          id: {
            in: userEstablishments.map((establishment: any) => establishment.value),
          },
        },
      },
      is_archived: false,
    },
    select: {
      id: true,
      name: true,
    },
  });
  console.log(classe);
  return classe;
};
export const getSubjectOfUser = async (user_id: string, data: any) => {
  console.log(user_id);
  console.log(data);
  const subject = await db.subject.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
      classe_subject: {
        some: {
          id: {
            in: data.map((classe: any) => classe.value),
          },
        },
      },
      is_archived: false,
    },
  });
  console.log(subject);
  return subject;
};

export const getSubjectOfUserById = async (user_id: string) => {
  console.log(user_id);

  const subject = await db.subject.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
    },
  });
  console.log(subject);
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
  const data = await db.establishment.findMany({
    where: {
      user_establishment: {
        some: {
          id: user_id,
        },
      },
    },
  });

  return data;
};

export const getOneExamById = async ({ id }: { id: number }) => {
  const exam = await db.exam.findUnique({ where: { id: id } });
  console.log(exam);
  return { data: exam, error: undefined };
};

export async function createExamm(data: any, user_id: string) {
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
        subject: {
          connect: {
            id: +data.subject.value,
          },
        },
        term: data.term,

        // ExamClassess: {
        //   create: data.classes.map((classId: any) => ({
        //     class: {
        //       connect: { id: classId.value },
        //     },
        //     assignedBy: 'some_value', // Add the assignedBy field with a value
        //   })),
        // },
        // examEstablishment: {
        //   create: data.establishment.map((establishmentId: any) => ({
        //     establishement: {
        //       connect: { id: establishmentId.value },
        //     },
        //     assignedBy: user_id,
        //   })),
        // },
      },
    });
    return examm;
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
}
export async function updateExam(examId: number, data: any, user_id: string) {
  console.log(data);
  try {
    const updatedExam = await db.exam.update({
      where: {
        id: examId,
      },
      // include: {
      //   examEstablishment: true,
      // },
      data: {
        name: data.name,
        total_mark: +data.totalMarks,
        coefficient: +data.coefficient,
        subject: data.subject
          ? {
              connect: {
                id: +data.subject.value,
              },
            }
          : undefined,
        term: data.term,

        // ExamClassess: {
        //   updateMany: data.classes
        //     ? data.classes.map((classId: any) => ({
        //         where: {
        //           exam_id: examId,
        //         },
        //         data: {
        //           assignedBy: 'some_updated_value',
        //         },
        //       }))
        //     : undefined,
        // },
        //TO DO : update the assignedBy field with the current user id
        // examEstablishment: {
        //   updateMany: data.establishment
        //     ? data.establishment.map((establishmentId: any) => ({
        //         where: {
        //           exam_id: examId,
        //           establishement_id: +establishmentId.value,
        //         },
        //         data: {
        //           assignedBy: 'some_updddsdsdssdsdsdsated_value',
        //         },
        //       }))
        //     : undefined,
        // },
      },
    });

    // data.establishment
    // ? data.establishment.map((establishmentId: any) => ({
    //     id: +establishmentId.value,
    //   }))
    // : undefined,
    return updatedExam;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
}

export const deleteExame = async (id: number) => {
  try {
    await db.exam.delete({
      where: {
        id: id,
      },
    });

    console.log('Exam deleted succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to delete Exam.',
    };
  }
};

// const getRecursiveExamQuestion = async () => {
//   const exam_id = 19;
//   const exercises = await db.exercise.findUnique({

//     includeRecursive: { children: { maxDepth: 10 } },
//   });

//   console.log(exercises);
//   const questionsId = exercises[0]?.question?.id;
//   console.log(questionsId);
// };
const getRecursiveExamQuestion = async () => {
  const exam_id = 19;
  // const result = await db.$queryRaw`
  //   WITH RECURSIVE RecursiveQuestions AS (
  //     SELECT *
  //     FROM question as q1
  //     where q1.id = 1
  //     UNION ALL

  //     SELECT q2.*
  //     FROM question as q2
  //     JOIN RecursiveQuestions rq ON q2.parent_id = rq.id

  //   )
  //   SELECT * FROM RecursiveQuestions;
  // `;
  //   const result = await db.exercise.findMany({
  //     where: {
  //       id: 5,
  //     },
  //     include: {
  //       question: {
  //         include: {
  //           parent: true,
  //         },
  //       },
  //     },
  //   });
};

getRecursiveExamQuestion();

// const getSubQuestionOfExercice = async (exercice_id: number) => {
//   const subQuestions = await db.question.findMany({
//     where: {
//       parent_id: exercice_id,
//     },
//   });
//   return subQuestions;
// }
