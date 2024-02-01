// index.ts
'use server';
import { db } from '@/lib/db';

export const createEstablishement = async (name: string) => {
  try {
    console.log('start');
    const exam = await db.establishment.create({
      data: {
        name: name,
      },
    });
    console.log('estab created succecfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to create establishement.',
    };
  }
};

export const getAllEstabs = async (page = 1, pageSize = 10, name = '') => {
  try {

    const skip = (page - 1) * pageSize;
    console.log(skip)

    const estabs = await db.establishment.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
      skip,
      take: pageSize,
    });

    const totalCount = await db.establishment.count();

    return { data: {estabs, totalCount}, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get establishment.',
    };
  }
};

export const editEstablishement = async (id: number, name: string) => {
  try {
    console.log(id, name);
    await db.establishment.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    console.log('estab edited succecfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to edit establishement.',
    };
  }
};

export const deleteEstablishement = async (id: number) => {
  console.log(id);
  try {
    const data = await db.establishment.delete({
      where: {
        id: id,
      },
    });
    console.log('estab deleted succecfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to delete establishement.',
    };
  }
};
