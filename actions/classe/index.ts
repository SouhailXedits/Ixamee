'use server';
import { db } from '@/lib/db';

export const createClasse = async (
  name: string,
  matiere: any,
  establishmentId: string,
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
        is_archived: false,
      },
    });
  } catch (error: any) {
    console.error(error); // Log the actual error for debugging purposes
  }
};

export const deleteClasse = async (id: string) => {
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
        teacher_id: user_id,
        establishment_id: +etab_id,
      },
      include: {
        StudentClass: true,
        subject: true,
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
