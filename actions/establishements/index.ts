// index.ts
'use server';
import { db } from '@/lib/db';

export const createEstablishement = async (name: string) => {
  try {
    const exam = await db.establishment.create({
      data: {
        name: name,
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to create establishement.',
    };
  }
};
export const getAllEstabsWithNoPagination = async () => {
  try {


    const estabs = await db.establishment.findMany({});

    const totalCount = await db.establishment.count();

    return { data: { estabs, totalCount }, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get establishment.',
    };
  }
};
export const getAllEstabs = async (page = 1, pageSize = 10, name = '') => {
  try {
    const skip = (page - 1) * pageSize;

    const estabs = await db.establishment.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      skip,
      take: pageSize,
    });

    // const totalCount = await db.establishment.count();
    const totalCount = estabs.length;

    return { data: { estabs, totalCount }, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get establishment.',
    };
  }
};

export const editEstablishement = async (id: number, name: string) => {
  try {
    await db.establishment.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to edit establishement.',
    };
  }
};

export const deleteEstablishement = async (id: number) => {
  try {
    const data = await db.establishment.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to delete establishement.',
    };
  }
};

export const getNameEstabByClasseId = async (classe_id: number) => {
  try {
    const data = await db.establishment.findFirst({
      where: {
        classes: {
          some: {
            id: classe_id,
          },
        },
      },
      select: {
        name: true,
      },
    });

    return data;
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get establishment.',
    };
  }
};
