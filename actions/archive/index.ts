'use server';
import { db } from '@/lib/db';

export const getAllArchivedExams = async (id: string, estabId: number, name: string) => {
  try {
    const exams = await db.exam.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        is_archived: true,
        // exam_classess: {
        //   some: {
        //     establishment: {
        //       some: {
        //         id: estabId,
        //       },
        //     },
        //   },
        // },
        teacher: {
            some: {
                id: id
            }
        }
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
    return {
      data: undefined as any,
      error: 'Failed to get exams.',
    };
  }
};

export const getAllArchivedClasses = async (
  id: string,
  estabId: number,
  filters?: any,
  name?: string
) => {

  try {
    const { dateRange } = filters || {};

    const classe = await db.classe.findMany({
      where: {
        name: {
          contains: name, 
          mode: 'insensitive',
        },
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
        archived_at: {
          // Add date range filter if it exists
          ...(dateRange
            ? {
                gte: dateRange.from,
                lte: dateRange.to,
              }
            : {}),
        },
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

    return {
      data: undefined as any,
      error: 'Failed to get classes.',
    };
  }
};
export const unArchive = async (id: number, table: string) => {
  try {
    await (db as any)[table].update({
      where: {
        id: id,
      },
      data: {
        is_archived: false,
      },
    });

  } catch (error: any) {

    return {
      error: 'Failed to edit.',
    };
  }
};

export const archive = async (id: number, table: string) => {
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

  } catch (error: any) {

    return {
      error: 'Failed to archive.',
    };
  }
};


