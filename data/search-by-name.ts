'use server';
import { db } from '@/lib/db';

// export const getDataByName = async (table: string, input: string) => {
//
//   try {
//     const data = await db.user.findMany();
//
//     return data;
//   } catch (error) {
//

//     return null;
//   }
// };
export const getDataByName = async (table: string, input: string) => {
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
    return null;
  }
};
