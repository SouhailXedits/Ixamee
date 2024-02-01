'use server';
import { db } from '@/lib/db';

export const getCountOfClasse = async (userId: string, etab_id: number) => {
  const classCount = await db.classe.count({
    where: {
      teacher: {
        some: {
          id: userId,
        },
      },
      establishment: {
        some: {
          id: +etab_id,
        },
      },
      is_archived: false,
    },
  });

  return classCount;
};
export const getCountOfExamenes = async (userId: string, etab_id: number) => {
  const examCount = await db.exam.count({
    where: {
      teacher: {
        some: {
          id: userId,
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
  });
  console.log("🚀 ~ getCountOfExamenes ~ examCount:", examCount)
  return examCount;
};
export const getCountMonArchive = async (userId: string, etab_id: number) => {
  const examCount = await db.exam.count({
    where: {
      teacher: {
        some: {
          id: userId,
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
      is_archived: true,
    },
  });
  const classCount = await db.classe.count({
    where: {
      teacher: {
        some: {
          id: userId,
        },
      },
      establishment: {
        some: {
          id: +etab_id,
        },
      },
      is_archived: true,
    },
  });
  return examCount + classCount;
};

// const getCountOfStudentByTeacher = async (userId: string) => {
//   const studentCount = await db.classe.groupBy({
//     by: ['id'],
//     _sum: {},
//   });
// };
// getCountOfStudentByTeacher();

export const getCountOfStudentExams = async (userId: string) => {
  const examCount = await db.exam.count({
    where: {
      exam_classess: {
        some: {
          student_class: {
            some: {
              id: userId,
            },
          },
        },
      },
      is_archived: false,
    },
  });
  return examCount;
};

export const getCountOfStudentSubjects = async (userId: string) => {
  const subjectCount = await db.subject.count({
    where: {
      classe_subject: {
        some: {
          student_class: {
            some: {
              id: userId,
            },
          },
        },
      },
      is_archived: false,
    },
  });
  return subjectCount;
};

export const getStudentMarksheet = async (userId: string) => {
  const marksheet = await db.examCorrection.count({
    where: {
      exam: {
        exam_classess: {
          some: {
            student_class: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
    },
  });
  return marksheet;
};
