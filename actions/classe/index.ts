'use server';
import Establishement from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/page';
import { db } from '@/lib/db';
import { Exo } from 'next/font/google';

export const createClasse = async (
  name: string,
  matiere: any,
  establishmentId: number,
  teacherId: string
) => {
  try {
    console.log(name, matiere, establishmentId, teacherId);

    const classe = await db.classe.create({
      data: {
        name: name,
        subject: {
          connect: matiere.map((matiere: any) => ({ id: matiere.value })),
        },
        establishment: {
          connect: { id: +establishmentId },
        },
        teacher: {
          connect: { id: teacherId },
        },
      },
    });
  } catch (error: any) {
    console.error(error); // Log the actual error for debugging purposes
  }
};
export const getClasseById = async (id: number) => {
  const classe = await db.classe.findUnique({
    where: {
      id: id,
    },
    include: {
      exam_classe: true,
    },
  });
  return classe;
};
export const updateClasse = async (name: string, classe_id: number, matiere: any) => {
  try {
    console.log(name, classe_id, matiere);

    const classe = await db.classe.update({
      where: {
        id: +classe_id,
      },
      data: {
        name: name,
        subject: {
          set: matiere.map((matiere: any) => ({ id: matiere.value })),
        },
      },
    });
    console.log(classe);
  } catch (error: any) {
    console.error(error); // Log the actual error for debugging purposes
  }
};
// image, name, range, email, class_id, establishmentId;

export const createUserWithImportInClasse = async (
  image: string,
  name: string,
  range: number,
  email: string,
  classe_id: number,
  establishmentId: number
) => {
  console.log(name, classe_id, email, image);
  const user = await db.user.findUnique({
    where: {
      email: email,
      NOT: {
        classe: {
          some: {
            id: +classe_id,
          },
        },
      },
    },
  });
  console.log(user);
  if (!user) {
    const data = await db.user.create({
      data: {
        name: name,
        email: email,
        image: image,
        classe: {
          connect: {
            id: +classe_id,
          },
        },
        user_establishment: {
          connect: {
            id: establishmentId,
          },
        },
      },
    });
    console.log(data);
  } else {
    const data = await db.user.update({
      where: {
        email: email,
      },
      data: {
        classe: {
          connect: {
            id: +classe_id,
          },
        },
      },
    });
    console.log(data);
  }
};
export const deleteClasse = async (id: number) => {
  console.log(id);
  const data = await db.classe.delete({
    where: {
      id: id,
    },
  });
  console.log('classe deleted succecfully ! ');
  return { data: data, error: undefined };
};

export const getAllClasse = async ({ user_id, etab_id }: { user_id: string; etab_id: number }) => {
  try {
    const classes = await db.classe.findMany({
      where: {
        teacher: {
          some: {
            id: user_id,
          },
        },
        establishment: {
          some: {
            id: +etab_id,
          },
        },
        is_archived: false,
        subject: {
          some: {
            is_archived: false,
          },
        },
      },

      include: {
        subject: true,
        student_class: {
          where: {
            role: 'STUDENT',
          },
          select: {
            id: true,
          },
        },
      },
    });
    return { data: classes, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get classes.',
    };
  }
};
export const getStudentOfClasse = async (classe_id: number) => {
  const res = await db.user.findMany({
    where: {
      role: 'STUDENT',
      classe: {
        some: {
          id: classe_id,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log(res);
  return res;
};

export const createUserInClasse = async (
  image: string,
  name: string,
  range: number,
  email: string,
  class_id: string,
  establishmentId: number
) => {
  const user = await db.user.create({
    data: {
      name: name,
      image: image,
      range: range,
      email: email,
      role: 'STUDENT',
      classe: {
        connect: { id: +class_id },
      },
      user_establishment: {
        connect: { id: +establishmentId },
      },
    },
  });
  console.log(user);
  return user;
};
// export const createManyUserInClasseApi = async (
//   name: string,
//   range: number,
//   email: string,
//   class_id: string,
//   establishmentId: number
// ) => {
//   const user = await db.user.createMany({
//     data: {
//       name: name,
//       range: range,
//       email: email,
//       role: 'STUDENT',
//       user_establishment: {}

//     },

//   });
//   console.log(user);
//   return user;
// };

export const updateUserInClasse = async (
  id: string,
  name: string,
  email: string,
  image: string
) => {
  console.log(id);
  console.log(image);
  // const existingUser = await db.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
  // console.log(existingUser);
  // if (existingUser && existingUser.id !== id) {
  //   console.error('Email already exists for another user');
  //   return;
  // }

  const data = await db.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      image: image,
    },
  });

  console.log('User updated successfully');
};

export const deleteUserInClasse = async (id: string) => {
  console.log(id);
  const data = await db.user.delete({
    where: {
      id: id,
    },
  });
  console.log('user deleted succecfully ! ');
  return { data: data, error: undefined };
};

export const getClassesByEstablishmentId = async (etab_id: number) => {
  try {
    const classes = await db.classe.findFirst({
      where: {
        establishment: {
          some: {
            id: etab_id,
          },
        },
      },
    });
    return { data: classes, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get classes.',
    };
  }
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      classe: true,
      image: true,
    },
  });
  return user;
};

export const updateInvitationUser = async (studentEmail: string, teacherEmail: string) => {
  const user = await db.user.update({
    where: {
      email: studentEmail,
    },
    data: {
      invited_at: new Date(),
    },
  });
  return user;
};
