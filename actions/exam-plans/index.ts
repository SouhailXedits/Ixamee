'use server';
import { db } from '@/lib/db';

export async function createExamPlan(values: any) {
  console.log(values);

  const exam = await db.examPlans.create({
    data: {
      name: values.title,
      //   subject_id: values.subject,
      subject: {
        connect: {
          id: values.subject,
        },
      },

      classes: {
        connect: values.classes.map((class_id: any) => ({
          id: class_id,
        })),
      },
      //   teacher_id: values.user_id,
      //   estab_id: values.estab,
      establishment: {
        connect: {
          id: +values.estab,
        },
      },
      studentVisibility: values.studentsVisibility == 'true' ? true : false,
      start: values.start,
      end: values.end,
      description: values.description,
      color: values.color,
      teacher: {
        connect: {
          id: values.user_id,
        },
      },

      //   subject: {
      //     connect: {
      //       id: +data.subject.value,
      //     },
      //   },
      //   term: data.term,

      //   exam_classess: {
      //     connect: data.classes.map((class_id: any) => ({
      //       id: +class_id.value,
      //     })),
      //   },
      //   is_archived: false,
      //   language: data.style,
    },
  });

  return exam;
}

export const getExamPlansByUserId = async (user_id: string, estab_id: number) => {
  try {
    const examPlans:any = await db.examPlans.findMany({
      where: {
        teacher_id: user_id,
        estab_id: estab_id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        description: true,
        start: true,
        end: true,
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        classes: {
          select: {
            id: true,
            name: true,
          },
        },
        studentVisibility: true,
      },
    });
    const renamedExamPlans = examPlans.map((plan:any) => ({
      ...plan,
      title: plan.name,
      studentsVisibility: plan.studentVisibility,
      studentVisibility: undefined,
      textColor: plan.color?.dark,
      name: undefined,
    }));
    return renamedExamPlans;
  } catch (error: any) {
    console.log(error);
    return {
      data: undefined as any,
      error: 'Failed to get exam plans.',
    };
  }
};

export const deleteExamPlan = async (id: number) => {
  try {
    await db.examPlans.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to delete examPlan.',
    };
  }
};

interface UpdateEventProps {
  id?: number;
  title?: string;
  color?: any;
  subject?: any;
  classes?: any;
  start?: Date;
  end?: Date;
  description?: string;
  studentsVisibility?: boolean;
  estab?: number;
  user_id?: string;
}

export const updateExamPlan = async (data: UpdateEventProps) => {
  console.log('‼️ update 🚀', data);
 
  // if(!id || !data) return;
  const {
    start,
    end,
    title: name,
    description,
    classes ,
    studentsVisibility: studentVisibility,
    color,
    subject ,
  } = data;
  await db.examPlans.update({
    where: {
      id: data.id,
    },
    data: {
      name,
      start,
      end,
      description,
      studentVisibility,
      color,
      subject: {
        connect: {
          id: subject
        }
      },
      classes: {
        connect: classes.map((class_id: any) => ({
          id: class_id,
        })),
      },
    },
  });
};
