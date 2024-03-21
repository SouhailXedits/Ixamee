'use server';
import { db } from '@/lib/db';

export const getDataByName = async <T>(table: keyof typeof db, input: string): Promise<T[] | null> => {
  try {
    const data = await (db as any)[table].findMany({
      where: {
        name: {
          contains: input,
          mode: 'insensitive',
        },
      },
    });

    return data;
  } catch (error) {
    console.error(`Error fetching data from table "${table}":`, error);
    return null;
  }
};
