'use server';

import { db } from '@/lib/db';

export const getMarkSheets = async (filters: {
  term: string;
  classe_id: number | undefined;
  subject_id: number | undefined;
}) => {
  if (!filters.term || !filters.classe_id) return;
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          term: filters.term,
          subject: {
            id: filters.subject_id,
          },
        },
        user: {
          classe: {
            some: {
              id: filters.classe_id,
            },
          },
        },
        status: 'done' || 'absent' || 'notClassified' || 'pending',
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
            create_at: true,
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

    return { data: markSheets, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};

// getMarksheetByUserId()

export const getMarksheetByUserId = async (
  classeId: number,
  userId: string,
  subject_id: number
) => {
  if (!classeId) return;
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          subject: {
            id: subject_id,
          },
        },
        user: {
          id: userId,
          classe: {
            some: {
              id: classeId,
            },
          },
        },
        status: 'done' || 'absent' || 'notClassified' || 'pending',
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
            create_at: true,
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

    return { data: markSheets, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};

export const getCorrectionOfUser = async (class_id: string, data: any, exam_id: string) => {
  if (exam_id === 'undefined') return null;

  const res = await db.examCorrection.findMany({
    where: {
      exam_id: +exam_id,
      user: {
        classe: {
          some: {
            id: +class_id,
          },
        },
      },
      user_id: {
        in: data?.map((el: any) => el.id),
      },
    },
    select: {
      status: true,
      user_id: true,
    },
  });
  return res;

  // const res = await db.examCorrection.findMany({
  //   // relationLoadStrategy: 'join',
  //   include: {},
  // });
};
