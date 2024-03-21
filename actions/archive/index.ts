'use server';
import { db } from '@/lib/db';

export type Exam = {
  id: string;
  name: string;
  archived_at: Date;
  exam_classess: {
    id: string;
    name: string;
  }[];
};

export type Classe = {
  id: string;
  name: string;
  archived_at: Date;
  student_class: {
    id: string;
  }[];
};

export const getAllArchivedExams = async (id: string, estabId: number): Promise<{ data: Exam[] | undefined; error: string | undefined }> => {
  try {
    const exams = await db.exam.findMany({
      where: {
        is_archived: true,
        teacher: {
          some: {
            id: id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        archived_at: true,
        exam_classess: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { data: exams, error: undefined };
  } catch (error: any) {
    console.error(error);
    return {
      data: undefined,
      error: 'Failed to get exams.',
    };
  }
};

export const getAllArchivedClasses = async (
  id: string,
  estabId: number,
  filters?: { dateRange?: { from: Date; to: Date } }
): Promise<{ data: Classe[] | undefined; error: string | undefined }> => {
  try {
    const { dateRange } = filters || {};

    const classe = await db.classe.findMany({
      where: {
        is_archived: true,
        teacher: {
          some: {
            id: id,
          },
        },
        establishment: {
          some: {
            id: estabId,
          },
        },
        archived_at: dateRange
          ? {
              gte: dateRange.from,
              lte: dateRange.to,
            }
          : undefined,
      },
      select: {
        id: true,
        name: true,
        archived_at: true,
        student_class: {
          select: {
            id: true,
          },
        },
      },
    });

    return { data: classe, error: undefined };
  } catch (error: any) {
    console.error(error);
    return {
      data: undefined,
      error: 'Failed to get classes.',
    };
  }
};

export const unArchive = async (id: number, table: string): Promise<{ error: string | undefined }> => {
  try {
    await (db as any)[table].update({
      where: {
        id: id,
      },
      data: {
        is_archived: false,
      },
    });

    return { error: undefined };
  } catch (error: any) {
    console.error(error);
    return {
      error: 'Failed to edit.',
    };
  }
};

export const archive = async (id: number, table: string): Promise<{ error: string | undefined }> => {
  try {
    await (db as any)[table].update({
      where: {
        id: id,
      },
      data: {
        archived_at: new Date(),
        is_archived: true,
      },
    });

    return { error: undefined };
  } catch (error: any) {
    console.error(error);
    return {

