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

export const getAllArchivedClasses = async (id: string, estabId: number) => {
  try {
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

    console.log(classe);

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

export const unArchiveClasse = async (id: number) => {
  try {
    console.log(id);
    await db.classe.update({
      where: {
        id: id,
      },
      data: {
        is_archived: false,
      },
    });
    console.log('classe edited succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to edit classe.',
    };
  }
};
