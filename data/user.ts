'use server'
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
export const getUserById = async (id: string | undefined) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    // select: {
    //   id: true,
    // },
  });
  return user;
};

export const getUserEstablishmentByUserId = async (id: string) => {
  try {
    const userEstablishments = await db.establishment.findMany({
      where: {
        user_establishment: {
          some: {
            id,
          },
        },
      },
     });
    
    console.log("🚀 ~ getUserEstablishmentByUserId ~ userEstablishments:", userEstablishments)
    return userEstablishments;
  } catch (error) {
    console.error('Error getting UserEstablishment:', error);
    throw error;
  }
};


export const getClassesOfUser = async (user_id: string) => {
  console.log(user_id)
  const data = await db.classe.findMany({
    where: {
      student_class: {
        some: {
          id: user_id,
        },
      },
      is_archived: false
    },
    select: {
      id:true,
      name: true
    }
  });
  console.log(data)

  return data;
};


