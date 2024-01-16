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
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserEstablishmentByUserId = async (id: string) => {
  try {
    const userEstablishments = await db.userEstablishment.findMany({
      where: {
        user_id: id,
      },
      include: {
        establishement: true,
        user: true,
      },
      take: 1,
    });

    return userEstablishments;
  } catch (error) {
    console.error('Error getting UserEstablishment:', error);
    throw error;
  }
};
