'use server';
import { db } from '@/lib/db';

export const getAllArchivedExams = async (id: string, estabId: number) => {
  try {
    const exams = await db.exam.findMany({
      where: {
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

    console.log(exams);

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
  filters?: any
) => {
  console.log(filters)
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
    console.log(error);
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
    console.log('edited successfully ! ');
  } catch (error: any) {
    console.log(error);
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
    console.log('archived successfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to archive.',
    };
  }
};


