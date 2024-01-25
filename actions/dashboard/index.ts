'use server';
import { db } from '@/lib/db';

export const getCountOfClasse = async (userId: string, etab_id: number) => {
  console.log(userId, etab_id);
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
  console.log(classCount);
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
