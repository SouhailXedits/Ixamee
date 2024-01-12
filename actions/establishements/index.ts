// index.ts
'use server';
import { db } from '@/lib/db';

export const createEstablishement = async (name: string) => {
  try {
    console.log('start');
    const exam = await db.establishment.create({
        data: {
            name: name
        }
    });
    console.log('estab created succecfully ! ')
  } catch (error: any) {
    return {
      error: 'Failed to create establishement.',
    };
  }
};



export const getAllEstabs = async () => {
  try {
    const estabs = await db.establishment.findMany({
      skip: 0,
      take: 15
    });
    console.log(estabs);
    return { data: estabs, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get establishement.',
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
  console.log(id)
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

