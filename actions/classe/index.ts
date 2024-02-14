'use server';
import Establishement from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/page';
import { db } from '@/lib/db';
import { sendInvitationEmail } from '@/lib/mail';
import { generateInvitationToken } from '@/lib/tokens';
import { Exo } from 'next/font/google';
import { getMe } from '../examens';

export const createClasse = async (
  name: string,
  matiere: any,
  establishmentId: number,
  teacherId: string
) => {
  // let newName = name.toLowerCase();
  const findClasseName = await db.classe.findMany({
    where: {
      establishment: {
        some: {
          id: +establishmentId,
        },
      },
      teacher: {
        some: {
          id: teacherId,
        },
      },
      name: name,
    },
  });
  if (findClasseName.length > 0) {
    throw new Error('Classe already exists');
  } else {
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
  }
};
export const getClasseById = async (id: number) => {
  if(!id) return null;
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
export const getClasseByClassId = async (id: number) => {
  if(!id) return null;
  const classe = await db.classe.findUnique({
    where: {
      id: id,
    },
    include: {
      exam_classe: {
        select: {
          name: true,
          id: true,
        },
      },
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
  return classe;
};
export const updateClasse = async (name: string, classe_id: number, matiere: any) => {
  try {
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
  } catch (error: any) {
    console.error(error); // Log the actual error for debugging purposes
  }
};
// image, name, range, email, class_id, establishmentId;
export const createUserInClasse = async (
  image: string,
  name: string,
  email: string,
  term: any,
  class_id: string,
  establishmentId: number
) => {
  const nameExiste = await db.user.findMany({
    where: {
      name: name,
      classe: {
        some: {
          id: +class_id,
        },
      },
    },
  });
  console.log(nameExiste);
  if (nameExiste?.length > 0) {
    throw new Error('Name already exists');
    return;
  }
  const data = await db.user.findUnique({
    where: {
      email: email,
      NOT: {
        classe: {
          some: {
            id: +class_id,
          },
        },
      },
    },
  });
  if (!data) {
    const user = await db.user.create({
      data: {
        name: name,
        image: image,
        email: email,
        role: 'STUDENT',
        term: term,
        classe: {
          connect: { id: +class_id },
        },
        user_establishment: {
          connect: { id: +establishmentId },
        },
      },
    });
    return user;
  } else {
    const user = await db.user.update({
      where: {
        email: email,
      },
      data: {
        term: term,
        classe: {
          connect: {
            id: +class_id,
          },
        },
      },
    });
    return user;
  }
};
export const createUserWithImportInClasse = async (data: any) => {
  data.map(async (user: any) => {
    console.log(user);
    const res = await db.user.findMany({
      where: {
        email: user.email.trim(),
        role: 'STUDENT',
        // NOT: {
        //   classe: {
        //     some: {
        //       id: {
        //         equals: +user?.class_id,
        //       },
        //     },
        //   },
        // },
      },
      // select: {
      //   classe: {
      //     select: {
      //       id: true,
      //     },
      //   },
      // },
    });

    console.log(res);
    if (res.length === 0) {
      const data = await db.user.create({
        data: {
          name: user.name,
          email: user.email.trim(),
          role: 'STUDENT',

          term: user.term,
          classe: {
            connect: {
              id: +user?.class_id,
            },
          },
          user_establishment: {
            connect: {
              id: +user.establishmentId,
            },
          },
        },
      });
      console.log(data);
    } else {
      const data = await db.user.update({
        where: {
          email: user.email.trim(),
        },
        data: {
          classe: {
            connect: {
              id: +user?.class_id,
            },
          },
        },
      });
      console.log(data);
    }
  });
};
export const deleteClasse = async (id: number) => {
  const data = await db.classe.delete({
    where: {
      id: id,
    },
  });
  return { data: data, error: undefined };
};

export const getAllClasse = async ({ user_id, etab_id }: { user_id: string; etab_id: number }) => {
  if(!user_id || !etab_id) return null;
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
        exam_classe: {
          select: {
            name: true,
            id: true,
          },
        },
        student_class: {
          where: {
            role: 'STUDENT',
          },
          select: {
            id: true,
            image: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
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
export const getAllClassesNameAndId = async ({
  user_id,
  etab_id,
}: {
  user_id: string;
  etab_id: number;
}) => {
  if (!user_id || !etab_id) return null;
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
      select: {
        id: true,
        name: true,
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
export const getAllClassesNameAndIdDash = async ({
  user_id,
  etab_id,
}: {
  user_id: string;
  etab_id: number;
}) => {
  if (!user_id || !etab_id) return null;
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
      select: {
        id: true,
        name: true,
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

export const getAllClasseByPage = async ({
  user_id,
  etab_id,
}: {
  user_id: string;
  etab_id: number;
}) => {
  if (!user_id || !etab_id) return null;
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
            image: true,
          },
        },
      },
      take: 3,
    });
    return { data: classes, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get classes.',
    };
  }
};
export const getStudentClassCount = async ({
  user_id,
  etab_id,
}: {
  user_id: string;
  etab_id: number;
}) => {
  if (!user_id || !etab_id) return null;
  try {
    const studentClasses = await db.classe.findMany({
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
        student_class: {
          some: {
            role: 'STUDENT',
          },
        },
      },
      include: {
        student_class: {
          where: {
            role: 'STUDENT',
          },
        },
      },
    });

    const totalStudentClasses = studentClasses.reduce(
      (acc: any, item: any) => acc + (item.student_class ? item.student_class.length : 0),
      0
    );

    return { data: totalStudentClasses, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get student class count.',
    };
  }
};

export const getStudentOfClasse = async (classe_id: number) => {
  if(!classe_id) return null;
  const res = await db.user.findMany({
    where: {
      role: 'STUDENT',
      classe: {
        some: {
          id: classe_id,
        },
      },
    },
    // select: {
    //   name: true,
    //   email: true,
    //   id: true,
    //   image: true,
    //   createdAt: true,

    // },

    orderBy: {
      name: 'asc',
    },
  });
  console.log(res);
  return res;
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
//   return user;
// };

export const updateUserInClasse = async (
  id: string,
  name: string,
  email: string,
  image: string
) => {

  // const existingUser = await db.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
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
};

export const deleteUserInClasse = async (id: string) => {
  const data = await db.user.delete({
    where: {
      id: id,
    },
  });
  return { data: data, error: undefined };
};

export const getClassesByEstablishmentId = async (etab_id: number) => {
  if(!etab_id) return null
  try {
    const classes = await db.classe.findMany({
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
  if(!id) return null
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
export const getNameOfuserById = async (id: string) => {
  if(!id) return null
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
    },
  });
  return user;
};
export const updateInvitationUser = async (studentEmail: string, teacherEmail: string) => {
  const invitationToken = await generateInvitationToken(studentEmail, teacherEmail);
  await sendInvitationEmail(
    invitationToken.recieverEmail,
    invitationToken.senderEmail,
    invitationToken.token
  ).then(async (data) => {
    if (data.success) {
      const user = await db.user.update({
        where: {
          email: studentEmail,
        },
        data: {
          invited_at: new Date(),
        },
      });
      return user;
    } else {
      throw new Error(data.error);
    }
  });
};

// export const getStudentOfClasse = async (classe_id: number, exma_id: number) => {
//   const res = await db.examCorrection.findMany({
//     where: {
//       id: exma_id,

//       // user: {
//       //   classe: {
//       //     some: {
//       //       id: classe_id,
//       //     },
//       //   },
//       // },
//     },
//     include: {
//       user: {
//         include: {
//           classe: true,
//         },
//       },
//     },
//   });
//   return res;
// };

export const getStatusById = async (id: any) => {
  const data = await db.examCorrection.findMany({
    where: {
      id: id,
    },
    select: {
      status: true,
    },
  });
  return data;
};

export const getCorigeExameContent = async (exam_id: number, student_id: string) => {
  if(!exam_id || !student_id) return null
  const data = await db.examCorrection.findMany({
    where: {
      exam_id: +exam_id,
      user_id: student_id,
    },
    select: {
      correction_exam_content: true,
      mark_obtained: true,
      feedback: true,
    },
  });

  return data;
};
export const getCorigeExameContentOfAllUser = async (exam_id: any, userData: any) => {
  console.log(exam_id);
  console.log(userData);
  if(!exam_id || !userData) return null

  // if (exam_id === 'undefined') return null;
  const data = await db.examCorrection.findMany({
    where: {
      exam_id: +exam_id,
      user_id: {
        in: userData?.map((user: any) => user.id),
      },
    },
    select: {
      user_id: true,
      mark_obtained: true,
      exam: {
        select: {
          total_mark: true,
        },
      },
      feedback: true,
      exam_id: true,
      correction_exam_content: true,
    },
  });

  return data;
};
export const getNameClasseByClasseId = async (classe_id: number) => {
  if(!classe_id) return null
  const data = await db.classe.findMany({
    where: {
      id: classe_id,
    },
    select: {
      name: true,
    },
  });

  return data;
};
