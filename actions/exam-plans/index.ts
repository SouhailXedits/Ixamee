"use server"
import { db } from "@/lib/db";

export async function createExamPlan(values: any) {
    console.log(values)

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
      studentVisibility: values.studentsVisibility == "true" ? true : false,
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
