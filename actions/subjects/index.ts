// index.ts
'use server';
import { db } from '@/lib/db';
import { Subject } from '@prisma/client';
import { SubjectInputProps } from '@/types/subjects/subjectTypes'


export const createSubject = async (data: SubjectInputProps) => {
  console.log(data)
  try {
    const exam = await db.subject.create({
      data: data,
    });
    console.log('subject created succecfully ! ');
  } catch (error: any) {
    console.log(error)
    return {
      error: 'Failed to create subject.',
    };
  }
};

export const getAllSubjectsByPage = async (page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;
    console.log(skip);
    const estabs = await db.subject.findMany({
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

    return { data: estabs , error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get subjects.',
    };
  }
};

// export const editEstablishement = async (id: number, name: string) => {
//   try {
//     console.log(id, name);
//     await db.establishment.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: name,
//       },
//     });
//     console.log('estab edited succecfully ! ');
//   } catch (error: any) {
//     return {
//       error: 'Failed to edit establishement.',
//     };
//   }
// };

// export const deleteEstablishement = async (id: number) => {
//   console.log(id);
//   try {
//     const data = await db.establishment.delete({
//       where: {
//         id: id,
//       },
//     });
//     console.log('estab deleted succecfully ! ');
//   } catch (error: any) {
//     return {
//       error: 'Failed to delete establishement.',
//     };
//   }
// };
