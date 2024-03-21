// index.ts
'use server';
import { db } from '@/lib/db';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';

export type User = {
  id: string;
  role: 'ADMIN' | 'TEACHER';
  name?: string;
  image?: string;
  emailVerified?: Date;
  email: string;
  user_establishment?: {
    establishment: {
      name: string;
    };
  };
  subjects?: {
    subject: {
      name: string;
    };
  }[];
};

export const getUserIdByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
        name: true,
        image: true,
        emailVerified: true,
        user_establishment: {
          select: {
            establishment: {
              select: {
                name: true,
              },
            },
          },
        },
        subjects: {
          select: {
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getTeacherName = async (subjectId: number, classeId: number): Promise<User | null> => {
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
        id: true,
        name: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAllAdminTeachers = async (name: string): Promise<{ data: User[]; error: string | null }> => {
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
        user_establishment: {
          select: {
            establishment: {
              select: {
                name: true,
              },
            },
          },
        },
        subjects: {
          select: {
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      distinct: ['id'],
      orderBy: {
        name: 'asc',
      },
    });

    return { data: teachers, error: null };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: `Failed to get teachers: ${error.message}`,
    };
  }
};

export const updateUserToAdmin = async (id: string): Promise<{ error: string | null }> => {
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
      error: `Failed to update user: ${error.message}`,
    };
  }

  return { error: null };
};

export const updateAdminToUser = async (id: string): Promise<{ error: string | null }> => {
  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        role:
