// index.ts
'use server';
import { db } from '@/lib/db';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';

// export const getAllTeachersByPage = async (page = 1, pageSize = 10) => {
//   try {
//     const skip = (page - 1) * pageSize;
//
//     const estabs = await db.subject.findMany({
//       skip,
//       take: pageSize,
//     });
//     const totalCount = await db.subject.count();
//

//

//     return { data: { estabs, totalCount }, error: undefined };
//   } catch (error: any) {
//     return {
//       data: undefined as any,
//       error: 'Failed to get subjects.',
//     };
//   }
// };

export const getUserIdByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getTeacherName = async (subjectId: number, classeId: number) => {
  try {
    const user = await db.user.findFirst({
      where: {
        classe_teacher: {
          some: {
            id: classeId,
          },
        },
        subjects: {
          some: {
            id: subjectId,
          },
        },
      },
      select: {
        name: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getAllAdminTeachers = async (name: string) => {
  try {
    const teachers = await db.user.findMany({
      where: {
        role: 'ADMIN',
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        image: true,
        emailVerified: true,
        user_establishment: {},
        subjects: {},
      },
    });

    return { data: teachers, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

// export const editSubject = async (id: number, data: SubjectInputProps) => {
//   try {
//
//     await db.subject.update({
//       where: {
//         id: id,
//       },
//       data: data
//     });
//
//   } catch (error: any) {
//
//     return {
//       error: 'Failed to edit subject.',
//     };
//   }
// };

export const updateUserToAdmin = async (id: string) => {
  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        role: 'ADMIN',
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to update user.',
    };
  }
};

export const updateAdminToUser = async (id: string) => {
  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        role: 'TEACHER',
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to update user.',
    };
  }
};
