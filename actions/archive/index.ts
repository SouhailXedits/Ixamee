import { db } from "@/lib/db";

export const getAllArchivedExams = async () => {
  try {
    const exams = await db.exam.findMany({
        where:{
            is_archived: true
        }
    });

    console.log(exams);

    return { data: exams, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get exams.',
    };
  }
};


export const getAllArchivedClasses = async () => {
  try {
    const classe = await db.classe.findMany({
      where: {
        is_archived: true,
      },
      select: {
        id: true,
        name: true,
        archived_at: true,
        student_class: {
            select: {
                id: true
            }
        }
        
      },
      

    });

    console.log(classe);

    return { data: classe, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get classes.',
    };
  }
};

export const unArchiveExam = async (id: number) => {
  try {
    console.log(id);
    await db.exam.update({
      where: {
        id: id,
      },
      data: {
        is_archived: false
      },
    });
    console.log('exam edited succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to edit exam.',
    };
  }
};


export const unArchiveClasse = async (id: number) => {
  try {
    console.log(id);
    await db.classe.update({
      where: {
        id: id,
      },
      data: {
        is_archived: false
      },
    });
    console.log('classe edited succecfully ! ');
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Failed to edit classe.',
    };
  }
};


