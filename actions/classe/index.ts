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
  if (!id) return null;
  const classe = await db.classe.findUnique({
    where: {
      id: id,
    },
    include: {
      exam_classe: {
        where: {
          is_published: true,
        },
      },
    },
  });

  return classe;
};
export const getClasseByClassId = async (id: number) => {
  if (!id) return null;
  const classe = await db.classe.findUnique({
    where: {
      id: id,
      is_archived: false,
    },
    include: {
      exam_classe: {
        select: {
          name: true,
          id: true,
        },
        where: {
          is_archived: false,
        }
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
  console.log(email);
  const isTeacher = await db.user.findUnique({
    where: {
      email,
      OR: [
        {
          role: 'TEACHER',
        },
        {role: 'ADMIN'}
      ],
    },
  });
  if (isTeacher) {
    throw new Error('Given email is associated to a teacher account');
  }
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
  try {
    await Promise.all(
      data.map(async (user: any) => {
        const res = await db.user.findMany({
          where: {
            email: user.email.trim(),
            role: 'STUDENT',
          },
        });

        if (res.length === 0) {
          await db.user.create({
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
        } else {
          await db.user.update({
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
        }
      })
    );
    // If all users are created/updated successfully, return a resolved Promise
  } catch (error) {
    // If any error occurs during creation/updation, return a rejected Promise with the error
    throw error;
  }
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
      take: 4,
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
  if (!classe_id) return null;
  console.log("🚀 ~ file: index.ts:classe_id", classe_id);
  const res = await db.user.findMany({
    where: {
      role: 'STUDENT',
      classe: {
        some: {
          id: classe_id,
        },
      },
    },

    // orderBy: {
    //   name: 'desc',
    // },
  });

  return res;
};

export const updateUserInClasse = async (
  id: string,
  name: string,
  email: string,
  image: string
) => {
  if (image === '') {
    const data = await db.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
      },
    });
  } else {
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
  }
};

export const deleteUserInClasse = async (user_id: string, classe_id: string) => {
  const data = await db.user.update({
    where: {
      id: user_id,
    },
    data: {
      classe: {
        disconnect: {
          id: +classe_id,
        },
      },
    },
  });

  return { data: data, error: undefined };
};

export const getClassesByEstablishmentId = async (etab_id: number) => {
  if (!etab_id) return null;
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
  if (!id) return null;
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
  if (!id) return null;
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

export const getStatusById = async (id: any) => {
  if (!id) return null;
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
  if (!exam_id || !student_id) return null;
  const data = await db.examCorrection.findMany({
    where: {
      exam_id: +exam_id,
      user_id: student_id,
    },
    select: {
      id: true,
      correction_exam_content: true,
      mark_obtained: true,
      feedback: true,
      is_published: true,
      student_prespectation: true,
    },
  });

  return data;
};
export const getCorigeExameContentOfAllUser = async (exam_id: any, userData: any) => {
  if (!exam_id || !userData) return null;
  console.log(exam_id, userData, "🎒");

  const data = await db.examCorrection.findMany({
    where: {
      exam_id: {
        equals: +exam_id,
      },
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
  if (!classe_id) return null;
  const data = await db.classe.findMany({
    where: {
      id: classe_id,
    },
    select: {
      name: true,
      teacher: {
        select: {
          term: true,
        },
      },
    },
  });

  return data;
};
