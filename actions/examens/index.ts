// index.ts
'use server';

import Student from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/page';
import { transferAllMarkToNull } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/student/[student_id]/correction/[exam_id]/_components/calculateChildrenMarks';
import { calculateAverageMark, calculateOverallAverage } from '@/app/_utils/calculateAverage';
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
export const createExamCorrection = async (
  exam_id: number,
  mark_obtained: number,
  user_id: string,
  correction_exam_content: any,
  status: any
) => {
  // Check if there is an existing examCorrection for the given exam_id and user_id
  const existingExamCorrection = await db.examCorrection.findMany({
    where: {
      exam_id: exam_id,
      user_id: user_id,
    },
  });

  console.log(existingExamCorrection);

  // let examCorrection;

  if (existingExamCorrection.length === 0) {
    // Create a new examCorrection if it doesn't exist
    console.log(exam_id, mark_obtained, user_id, correction_exam_content);
    console.log(correction_exam_content);

    const examCorrection = await db.examCorrection.create({
      data: {
        exam: {
          connect: {
            id: exam_id,
          },
        },
        status: status,
        mark_obtained: +mark_obtained,
        correction_exam_content: correction_exam_content,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    return examCorrection;
  } else {
    // Update the existing examCorrection if it already exists
    const examCorrection = await db.examCorrection.updateMany({
      where: {
        exam_id: exam_id,
        user_id: user_id,
      },
      data: {
        status: status,
        exam_id: exam_id,
        mark_obtained: mark_obtained,
        correction_exam_content: correction_exam_content,
        user_id: user_id,
      },
    });
    return examCorrection;
  }
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
const getIntersectionOfArrays = (arrays: any) => {
  if (arrays.length === 0) {
    return [];
  }
  let intersection = arrays[0];
  for (let i = 1; i < arrays.length; i++) {
    const currentArray = arrays[i];

    intersection = intersection.filter((element: any) =>
      currentArray.some((item: any) => item.id === element.id)
    );
  }

  return intersection;
};
export const getSubjectOfUser = async (user_id: string, data: any) => {
  const findOneSubject = async (user_id: string, classe: any) => {
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
              in: [classe.value],
            },
          },
        },
        is_archived: false,
      },
    });

    return subject;
  };

  const result = await Promise.all(
    data.map(async (classe: any) => await findOneSubject(user_id, classe))
  );

  const intersectionResult = getIntersectionOfArrays(result);

  return intersectionResult;
};

export const getSubjectOfUserById = async (user_id: string) => {
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
  console.log('🚀 ~ getEstablishmentOfUser ~ data:', data);

  return data;
};
// getExamenById;
export const getOneExamById = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    include: {
      exam_classess: true,
    },
  });

  return exam;
};
export const getOneExamByIdForCorrection = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    include: {
      exam_classess: true,
    },
  });
  const newData = exam?.content;

  transferAllMarkToNull(newData);

  return exam;
};
export const getExamContent = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    select: {
      content: true,
    },
  });
  return exam;
};

export async function createExamm(data: any, user_id: string) {
  console.log(data, user_id);
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
      teacher_id: user_id,

      subject: {
        connect: {
          id: +data.subject.value,
        },
      },
      term: data.term,

      exam_classess: {
        connect: data.classes.map((class_id: any) => ({
          id: +class_id.value,
        })),
      },
      is_archived: false,
      language: data.style,
    },
  });

  console.log(examm);

  const allUsers = await db.classe.findMany({
    where: {
      id: {
        in: data.classes.map((class_id: any) => +class_id.value),
      },
    },
    select: {
      student_class: {
        select: {
          id: true,
        },
      },
    },
  });

  const flattenedUsers = Array.from(
    new Set(
      allUsers.flatMap((user: any) =>
        user.student_class.map((student: any) => ({ id: student.id }))
      )
    )
  );

  console.log(flattenedUsers);
  const allData = await db.examCorrection.createMany({
    data: flattenedUsers.map((user: any) => ({
      exam_id: examm.id,
      user_id: user.id,
      mark_obtained: 0,
      status: 'notCorrected',
    })),
  });

  return examm;
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
export const updateExamContent = async (examId: string, content: any) => {
  console.log(examId, content);
  try {
    const updatedExam = await db.exam.update({
      where: {
        id: +examId,
      },

      data: {
        content: content,
      },
    });

    return updatedExam;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
};

export const createNoteExamCorrectio = async ({
  exam_id,
  mark_obtained,
  user_id,
}: {
  user_id: string;
  mark_obtained: string;
  exam_id: string;
}) => {
  console.log(exam_id, mark_obtained, user_id);
  try {
    const existingExamCorrection = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        user_id: user_id,
      },
    });

    console.log(existingExamCorrection);

    if (existingExamCorrection.length === 0) {
      console.log(exam_id, mark_obtained, user_id);

      const examCorrection = await db.examCorrection.create({
        data: {
          exam: {
            connect: {
              id: +exam_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
          mark_obtained: +mark_obtained,
          status: 'done',
        },
      });
      console.log(examCorrection);
      return examCorrection;
    } else {
      // Update the existing examCorrection if it already exists
      const updatedExamCorrection = await db.examCorrection.updateMany({
        where: {
          exam_id: +exam_id,
          user_id: user_id,
        },
        data: {
          user_id: user_id,
          mark_obtained: +mark_obtained,
          status: 'done',
        },
      });

      return updatedExamCorrection;
    }
  } catch (error) {
    console.error('Error in createNoteExamCorrectio:', error);
    throw new Error('An error occurred while creating/updating exam correction.');
  }
};

export const sendRankOfUserExam = async ({ exam_id, marks }: { exam_id: string; marks: any[] }) => {
  console.log(marks);
  const allMarksheets = await Promise.all(
    marks.map(async (item: any) => {
      console.log(item);
      const markSheets = await db.examCorrection.findMany({
        where: {
          exam: {
            id: +item.exam_id,
          },
          user: {
            id: item.user_id,
            classe: {
              some: {
                id: +item.classesId,
              },
            },
          },
          status: 'done',
          is_published: true,
        },
        select: {
          id: true,
          mark_obtained: true,
          exam: {
            select: {
              id: true,
              name: true,
              total_mark: true,
              coefficient: true,
              term: true,
            },
            where: {
              is_archived: false,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          rank: true,
        },
      });
      console.log(markSheets);
      calculateOverallAverage(markSheets);
      return markSheets;
    })
  );

  // function calculateAverageMark(item: any) {
  //   console.log(item);
  //   let totalMarks = 0;
  //   let totalCoefficients = 0;

  //   item.forEach((trimestre: any) => {
  //     trimestre.exams.forEach((exam: any) => {
  //       totalMarks += exam.total_mark * exam.coefficient;
  //       totalCoefficients += exam.coefficient;
  //     });
  //   });

  //   return totalCoefficients !== 0 ? (totalMarks / totalCoefficients).toFixed(2) : 0;
  // }

  // allMarksheets.map((item) => {
  //   const data = calculateAverageMark(item);
  //   console.log(data);
  // });
  // console.log(allMarksheets);

  try {
    const updatedExamCorrectionBatch = await Promise.all(
      marks.map(async ({ user_id, rank }: { user_id: string; rank: string }) => {
        return db.examCorrection.updateMany({
          where: {
            exam_id: +exam_id,
            user_id: user_id,
          },
          data: {
            user_id: user_id,
            rank: +rank,
            is_published: true,
            published_at: new Date(),
          },
        });
      })
    );
    console.log(updatedExamCorrectionBatch);
    return updatedExamCorrectionBatch;
  } catch (error) {
    console.error('Error in sendRankOfUserExam:', error); // Fix typo in the error message
    throw new Error('An error occurred while updating exam correction.'); // Simplify the error message
  }
};

export const editeExamStatus = async ({
  exam_id,
  user_id,
  status,
}: {
  user_id: string;
  exam_id: string;
  status: 'notClassified' | 'absent';
}) => {
  console.log(exam_id, user_id);
  try {
    const existingExamCorrection = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        user_id: user_id,
      },
    });

    console.log(existingExamCorrection);

    if (existingExamCorrection.length === 0) {
      const examCorrection = await db.examCorrection.create({
        data: {
          exam: {
            connect: {
              id: +exam_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
          status: status,
        },
      });
      console.log(examCorrection);
      return examCorrection;
    } else {
      // Update the existing examCorrection if it already exists
      const updatedExamCorrection = await db.examCorrection.updateMany({
        where: {
          exam_id: +exam_id,
          user_id: user_id,
        },
        data: {
          status: status,
        },
      });
      console.log(updateExam);
      return updatedExamCorrection;
    }
  } catch (error) {
    console.error('Error in createNoteExamCorrectio:', error);
    throw new Error('An error occurred while creating/updating exam correction.');
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
// const getRecursiveExamQuestion = async () => {
//   const exam_id = 19;
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
// };

// getRecursiveExamQuestion();
