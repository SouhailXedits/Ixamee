'use server'

import { db } from "@/lib/db";


export const getMarkSheets = async (filters: {term: string, classe_id: number | undefined}) => {
    console.log(filters)
    if(!filters.term || !filters.classe_id) return
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          term: filters.term
        },
        user: {
            classe: {
                some: {
                    id: filters.classe_id
                }
            }
        },
        status: 'done'
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
                create_at: true
            },
            where : {
                is_archived: false,
            }
        },
        user: {
            select: {
                id: true,
                name: true,
                image: true,
            }
        },
        
      },
      
    });

    console.log(markSheets);

    return { data: markSheets , error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};



// getMarksheetByUserId()

export const getMarksheetByUserId = async (classeId: number, userId: string) => {
  if (!classeId) return;
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        user: {
          id: userId,
          classe: {
            some: {
              id: classeId,
            },
          },
        },
        status: 'done',
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
      },
    });

    console.log(markSheets);

    return { data: markSheets, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};
