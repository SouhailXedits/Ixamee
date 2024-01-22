'use server';
import { db } from '@/lib/db';

// export const getDataByName = async (table: string, input: string) => {
//   console.log(input);
//   try {
//     const data = await db.user.findMany();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);

//     return null;
//   }
// };
export const getDataByName = async (table: string, input: string) => {
  console.log(input);
  try {
    const data = await (db as any)[table].findMany({
      where: {
        name: {
          contains: input,
          mode: 'insensitive',
        },
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
