import { db } from '@/lib/db';
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  console.log(id);
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
  console.log(user);
  return user;
};

export const getUserEstablishmentByUserId = async (id: string) => {
  try {
    const userEstablishments = await db.establishment.findMany({
      where: {
        user_establishment : {
          some: {
            id,
          },
        },
      },
    });

    return userEstablishments;
  } catch (error) {
    console.error('Error getting UserEstablishment:', error);
    throw error;
  }
};
