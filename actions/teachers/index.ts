// index.ts
'use server';
import { db } from '@/lib/db';
import { SubjectInputProps } from '@/types/subjects/subjectTypes'



// export const getAllTeachersByPage = async (page = 1, pageSize = 10) => {
//   try {
//     const skip = (page - 1) * pageSize;
//     console.log(skip);
//     const estabs = await db.subject.findMany({
//       skip,
//       take: pageSize,
//     });
//     const totalCount = await db.subject.count();
//     console.log(totalCount);

//     console.log(estabs);

//     return { data: { estabs, totalCount }, error: undefined };
//   } catch (error: any) {
//     return {
//       data: undefined as any,
//       error: 'Failed to get subjects.',
//     };
//   }
// };




export const getUserIdByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true
      }
    });
    return user;
  } catch {
    return null;
  }
};





export const getAllAdminTeachers= async () => {
  try {

    const teachers = await db.user.findMany({
      where: {
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        image: true,
        emailVerified:true,
        UserEstablishment: {
          select: {
            establishement: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        subjects: {
          select: {
            subject: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        
      },
      
    });

    console.log(teachers);

    return { data: teachers, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

// export const editSubject = async (id: number, data: SubjectInputProps) => {
//   try {
//     console.log(id, data);
//     await db.subject.update({
//       where: {
//         id: id,
//       },
//       data: data
//     });
//     console.log('subject edited succecfully ! ');
//   } catch (error: any) {
//     console.log(error)
//     return {
//       error: 'Failed to edit subject.',
//     };
//   }
// };

export const updateUserToAdmin = async (id: string) => {
  try {
      await db.user.update({
      where: {
        id: id,
      },
      data: {
        role: 'ADMIN',
      },
    });
    console.log('User updated succesfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to update user.',
    };
  }
};



export const updateAdminToUser = async (id: string) => {
  try {
      await db.user.update({
      where: {
        id: id,
      },
      data: {
        role: 'TEACHER',
      },
    });
    console.log('User updated succesfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to update user.',
    };
  }
};
