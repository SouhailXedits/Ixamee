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
    // return { data: exam, error: undefined };
  } catch (error: any) {
    return {
      error: 'Failed to get exam.',
    };
  }
};
