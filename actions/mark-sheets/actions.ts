'use server'

import { db } from "@/lib/db";

type Filters = {
  term: string;
  classe_id: number | undefined;
  subject_id: number | undefined;
}

type MarkSheet = {
  id: number;
  mark_obtained: number;
  exam: {
    id: number;
    name: string;
    total_mark: number;
    coefficient: number;
    term: string;
    create_at: Date;
  };
  user: {
    id: number;
    name: string;
    image: string;
  };
  rank: number;
}

type MarkSheetResponse = {
  data: MarkSheet[] | undefined;
  error: string | undefined;
}

export const getMarkSheets = async (filters: Filters): MarkSheetResponse => {
  if(!filters.term || !filters.classe_id) return { data: undefined, error: 'Missing required filters' };
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

    return { data: markSheets , error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};

type GetMarksheetByUserIdFilters = {
  classeId: number;
  userId: string;
  subject_id: number;
}

type GetMarksheetByUserIdResponse = MarkSheetResponse;

export const getMarksheetByUserId = async (filters: GetMarksheetByUserIdFilters): GetMarksheetByUserIdResponse => {
  if (!filters.classeId) return { data: undefined, error: 'Missing required filter "classeId"' };
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          subject: {
            id: filters.subject_id,
          },
        },
        user: {
          id: filters.userId,
          classe: {
            some: {
              id: filters.classeId,
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

type GetCorrectionOfUserFilters = {
  class_id: string;
  data: any;
  exam_id: string;
}

type GetCorrectionOfUserResponse = {
  status: string;
  user_id: number;
}[] | null;

export const getCorrectionOfUser = (filters: GetCorrectionOfUserFilters): GetCorrectionOfUserResponse => {
  @ts-expect-error
  if (filters.ex
