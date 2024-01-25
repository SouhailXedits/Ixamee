// index.ts
'use server';
import { db } from '@/lib/db';
import { Subject } from '@prisma/client';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';

export const createSubject = async (data: SubjectInputProps) => {
  console.log(data);
  try {
    const exam = await db.subject.create({
      data: data,
    });
    console.log('subject created succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to create subject.',
    };
  }
};

export const getAllSubjectsByPage = async (page = 1, pageSize = 10, name = '') => {
  try {
    const skip = (page - 1) * pageSize;
    console.log(skip);
    const estabs = await db.subject.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      skip,
      take: pageSize,
    });
    const totalCount = await db.subject.count();
    console.log(totalCount);

    console.log(estabs);

    return { data: { estabs, totalCount }, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

export const getAllSubjects = async () => {
  try {
    const estabs = await db.subject.findMany();

    console.log(estabs);

    return { data: estabs, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

export const getAllSubjectsByUserId = async (id: number) => {
  try {
    const subjects = await db.classe.findMany({
      where: {
        id,
      },
      include: {
        subject: true,
      },
    });
    return subjects[0].subject;
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

export const editSubject = async (id: number, data: SubjectInputProps) => {
  try {
    console.log(id, data);
    await db.subject.update({
      where: {
        id: id,
      },
      data: data,
    });
    console.log('subject edited succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to edit subject.',
    };
  }
};

export const deleteSubject = async (id: number) => {
  console.log(id);
  try {
    const data = await db.subject.delete({
      where: {
        id: id,
      },
    });
    console.log('subject deleted succecfully ! ');
  } catch (error: any) {
    return {
      error: 'Failed to delete subject.',
    };
  }
};


export const getAllSubjectsByClasseId = async (classeId: number) => {
  // const res = await db.classe.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     subject: {
  //       select: {
  //         id: true,
  //         name: true,
  //         coefficient: true,
  //         icon: true,
  //         teacher: {
  //           select: {
  //             id: true,
  //             name: true,
  //             image: true,

  //           },
  //           where: {

  //           }
  //         },

  //       },
  //     },
  //   },
  //   where: {
  //     id: classeId,
  //     // teacher: {
  //     //   some: {
  //     //     classe_teacher: {
  //     //       some: {
  //     //         id: classeId
  //     //       }
  //     //     }
  //     //   }
  //     // },
  //     subject: {
  //       some: {
  //         classe_subject: {
  //           some: {
  //             id: classeId
  //           }
  //         }
  //       }
  //     }
  //   },
  // });
  const res = await db.subject.findMany({
    where: {
      classe_subject: {
        some: {
          id: classeId,
        },
      },
      is_archived: false,
    },
    select: {
      id: true,
      name: true,
      coefficient: true,
      icon: true,
      teacher: {
        select: {
          id: true,
          name: true,
          image: true,
          term: true,
        },
        where: {
          classe_teacher: {
            some: {
              id: classeId,
            },
          },
        },
      },
      classe_subject: {
        select: {
          id: true,
          name: true,
        },
        where: {
          id: classeId,
        },
      },
      // exams: {
      //   select: {
      //     id: true,
      //     name: true,
      //     term: true,
      //   },
      //   where: {
      //     is_archived: false,
      //     exam_classess: {
      //       some: {
      //         id: classeId,
      //       },
      //     },
      //   },
      // },
    },
  });
  console.log(res);
  return res;
};