'use server';
import { db } from '@/lib/db';

export const getCountOfClasse = async (userId: string) => {
  const classCount = await db.classe.count({
    where: {
      teacher: {
        some: {
          id: userId,
        },
      },
    },
  });
  console.log(classCount);
  return classCount;
};
export const getCountOfExamenes = async (userId: string) => {
  const examCount = await db.exam.count({
    where: {
      teacher: {
        some: {
          id: userId,
        },
      },
    },
  });
  return examCount;
};
export const getCountMonArchive = async (userId: string) => {
  const examCount = await db.exam.count({
    where: {
      teacher: {
        some: {
          id: userId,
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
      is_archived: true,
    },
  });
  return examCount + classCount;
};
// const   = async (userId: string) => {
//   const studentCount = await db.classe.count({
//     where: {
//       student_class: {
//         some: {
//           id: userId,
//         },

//       },
//     },
//   });
// };
