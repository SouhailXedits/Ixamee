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
      },
    });
  } catch (error: any) {
    console.error(error); // Log the actual error for debugging purposes
  }
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
