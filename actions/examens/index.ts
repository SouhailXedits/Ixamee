// index.ts
'use server';
import Student from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/[classesId]/page';
import { calculateAverageMark, calculateOverallAverage } from '@/app/_utils/calculateAverage';
import { transferAllMarkToNull } from '@/app/_utils/calculateChildrenMarks';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { equal } from 'assert';
interface ExamEstablishment {
  establishement_id: number;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
}

interface Class {
  id: string;
  name: string;
  range: string;
  establishment_id: number;
  teacher_id: string;
  is_archived: boolean;
}

interface ExamClass {
  classe_id: string;
  exam_id: number;
  assignedAt: Date;
  assignedBy: string;
  class: Class;
}

interface ExamData {
  id: number;
  name: string;
  total_mark: number;
  coefficient: number;
  teacher_id: string;
  class_id: number;
  subject_id: number;
  term: string | null;
  examEstablishment: ExamEstablishment;
  ExamClassess: ExamClass[];
}

export const getIdOfUserInTheClasse = async (classeId: number) => {
  const data = await db.user.findMany({
    where: {
      role: 'STUDENT',
      classe: {
        some: {
          id: classeId,
        },
      },
    },
    select: {
      id: true,
    },
  });
  return data;
};
export const getAllExam = async ({ user_id, etab_id }: { user_id: string; etab_id: number }) => {
  if (!etab_id) return null;
  const exams = await db.exam.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
      exam_classess: {
        some: {
          establishment: {
            some: {
              id: {
                equals: +etab_id,
              },
            },
          },
        },
      },
      is_archived: false,
    },
    include: {
      // teacher: true,
      exam_classess: {
        include: {
          establishment: true,
        },
      },
    },
  });

  return exams;
};
export const getAllExamsNameAndId = async ({
  user_id,
  etab_id,
  classe_id,
}: {
  user_id: string;
  etab_id: number;
  classe_id: string;
}) => {
   
   
  const exams = await db.exam.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
      exam_classess: {
        some: {
          id: +classe_id,
          establishment: {
            some: {
              id: +etab_id,
            },
          },
        },
      },
      is_archived: false,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return exams;
};
export const getUserSubject = async (user_id: string) => {
  const subject = await db.subject.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
    },
  });

  return subject;
};
export const createExamCorrection = async (
  exam_id: number,
  mark_obtained: number,
  user_id: string,
  correction_exam_content: any,
  status: any
) => {

  // Check if there is an existing examCorrection for the given exam_id and user_id
  const existingExamCorrection = await db.examCorrection.findMany({
    where: {
      exam_id: exam_id,
      user_id: user_id,
    },
  });

  // let examCorrection;

  if (existingExamCorrection.length === 0) {
    // Create a new examCorrection if it doesn't exist

    const examCorrection = await db.examCorrection.create({
      data: {
        exam: {
          connect: {
            id: exam_id,
          },
        },
        status: status,
        mark_obtained: +mark_obtained,
        correction_exam_content: correction_exam_content,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    return examCorrection;
  } else {
    // Update the existing examCorrection if it already exists
    const examCorrection = await db.examCorrection.updateMany({
      where: {
        exam_id: exam_id,
        user_id: user_id,
      },
      data: {
        status: status,
        exam_id: exam_id,
        mark_obtained: mark_obtained,
        correction_exam_content: correction_exam_content,
        user_id: user_id,
      },
    });
     
    return examCorrection;
  }
};
export const getMe = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
};
type Establishment = {
  value: number;
  label: string;
};

export const getClasseOfUser = async (user_id: string, userEstablishments: Establishment[]) => {
  const findOneClasse = async (user_id: string, establishmentId: string) => {
    const classe = await db.classe.findMany({
      where: {
        teacher: {
          some: {
            id: user_id,
          },
        },
        establishment: {
          some: {
            id: +establishmentId,
          },
        },
        is_archived: false,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return classe;
  };

  const establishmentIds = userEstablishments.map(
    (establishment: Establishment) => establishment.value
  );

  const result = await Promise.all(
    establishmentIds.map(
      async (establishmentId) => await findOneClasse(user_id, establishmentId + '')
    )
  );

  const intersectionResult = getIntersectionOfArrays(result);

  return intersectionResult;
};

const getIntersectionOfArrays = (arrays: any) => {
  if (arrays.length === 0) {
    return [];
  }
  let intersection = arrays[0];
  for (let i = 1; i < arrays.length; i++) {
    const currentArray = arrays[i];

    intersection = intersection.filter((element: any) =>
      currentArray.some((item: any) => item.id === element.id)
    );
  }

  return intersection;
};
export const getSubjectOfUser = async (user_id: string, data: any) => {
  const findOneSubject = async (user_id: string, classe: any) => {
    const subject = await db.subject.findMany({
      where: {
        teacher: {
          some: {
            id: user_id,
          },
        },
        classe_subject: {
          some: {
            id: {
              in: [classe.value],
            },
          },
        },
        is_archived: false,
      },
    });

    return subject;
  };

  const result = await Promise.all(
    data.map(async (classe: any) => await findOneSubject(user_id, classe))
  );

  const intersectionResult = getIntersectionOfArrays(result);

  return intersectionResult;
};

export const getSubjectOfUserById = async (user_id: string) => {
  const subject = await db.subject.findMany({
    where: {
      teacher: {
        some: {
          id: user_id,
        },
      },
    },
  });

  return subject;
};

export const getTermOfUser = async (user_id: string) => {
  const term = await db.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      term: true,
    },
  });
  return term;
};
export const getEstablishmentOfUser = async (user_id: string) => {
  if (!user_id) return;
  const data = await db.establishment.findMany({
    where: {
      user_establishment: {
        some: {
          id: user_id,
        },
      },
    },
  });

  return data;
};
// getExamenById;
export const getOneExamById = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    include: {
      exam_classess: true,
    },
  });

  return exam;
};
export const getOneExamByIdForCorrection = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    include: {
      exam_classess: true,
    },
  });
  const newData = exam?.content;

  transferAllMarkToNull(newData);

  return exam;
};
export const getExamContent = async ({ id }: { id: string }) => {
  const exam = await db.exam.findUnique({
    where: { id: +id },
    select: {
      content: true,
    },
  });
  return exam;
};

export async function createExamm(data: any, user_id: string) {
  const examm = await db.exam.create({
    data: {
      name: data.name,
      total_mark: +data.totalMarks,
      coefficient: +data.coefficient,
      teacher: {
        connect: {
          id: user_id,
        },
      },
      teacher_id: user_id,

      subject: {
        connect: {
          id: +data.subject.value,
        },
      },
      term: data.term,

      exam_classess: {
        connect: data.classes.map((class_id: any) => ({
          id: +class_id.value,
        })),
      },
      is_archived: false,
      language: data.style,
    },
  });

  const allUsers = await db.classe.findMany({
    where: {
      id: {
        in: data.classes.map((class_id: any) => +class_id.value),
      },
    },
    select: {
      student_class: {
        select: {
          id: true,
        },
      },
    },
  });

  const flattenedUsers = Array.from(
    new Set(
      allUsers.flatMap((user: any) =>
        user.student_class.map((student: any) => ({ id: student.id }))
      )
    )
  );

  const allData = await db.examCorrection.createMany({
    data: flattenedUsers.map((user: any) => ({
      exam_id: examm.id,
      user_id: user.id,
      mark_obtained: 0,
      status: 'notCorrected',
    })),
  });

  return examm;
}
export async function updateExam(examId: number, data: any, user_id: string) {
  try {
    const updatedExam = await db.exam.update({
      where: {
        id: examId,
      },
      data: {
        name: data.name,
        total_mark: +data.totalMarks,
        coefficient: +data.coefficient,
        subject: {
          connect: { id: +data.subject[0].value }, // Assuming subject is a single selection
        },
        exam_classess: {
          set: data.classes.map((class_id: any) => ({ id: +class_id.value })),
        },
      },
    });

    return updatedExam;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
}

export const deleteExame = async (id: number) => {
  try {
    await db.exam.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return {
      error: 'Failed to delete Exam.',
    };
  }
};
export const updateExamContent = async (examId: string, content: any, is_published: boolean) => {
  try {
    const updatedExam = await db.exam.update({
      where: {
        id: +examId,
      },

      data: {
        content: content,
        is_published: is_published,
      },
    });

    return updatedExam;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
};

export const createNoteExamCorrectio = async ({
  exam_id,
  mark_obtained,
  user_id,
}: {
  user_id: string;
  mark_obtained: string;
  exam_id: string;
}) => {
  try {
    const existingExamCorrection = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        user_id: user_id,
      },
    });

    if (existingExamCorrection.length === 0) {
      const examCorrection = await db.examCorrection.create({
        data: {
          exam: {
            connect: {
              id: +exam_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
          mark_obtained: +mark_obtained,
          status: 'done',
        },
      });

      return examCorrection;
    } else {
      const updatedExamCorrection = await db.examCorrection.updateMany({
        where: {
          exam_id: +exam_id,
          user_id: user_id,
        },
        data: {
          user_id: user_id,
          mark_obtained: +mark_obtained,
          status: 'done',
        },
      });

      return updatedExamCorrection;
    }
  } catch (error) {
    console.error('Error in createNoteExamCorrectio:', error);
    throw new Error('An error occurred while creating/updating exam correction.');
  }
};

export const sendRankOfUserExam = async ({ exam_id, marks }: { exam_id: string; marks: any[] }) => {
  const classe_id = marks?.[0].classesId;
   
  const subject = await db.subject.findMany({
    select: {
      id: true,
    },
    where: {
      exams: {
        some: {
          id: +exam_id,
        },
      },
    },
  });
   

  try {
    const updatedExamCorrectionBatch = await Promise.all(
      marks.map(async ({ user_id, rank }: { user_id: string; rank: string }) => {
        return db.examCorrection.updateMany({
          where: {
            exam_id: +exam_id,
            user_id: user_id,
          },
          data: {
            user_id: user_id,
            rank: +rank,
            is_published: true,
            published_at: new Date(),
          },
        });
      })
    );
     

    await Promise.all(
      marks.map(async (item: any) => {
        const markSheets = await db.examCorrection.findMany({
          where: {
            exam: {
              subject: {
                id: subject[0].id,
              },
              is_archived: false,
            },
            user: {
              id: item.user_id,
              classe: {
                some: {
                  id: +item.classesId,
                },
              },
            },
            status: 'done',
            is_published: true,
          },
          select: {
            id: true,
            mark_obtained: true,
            exam: {
              select: {
                id: true,
                name: true,
                total_mark: true,
                coefficient: true,
                term: true,
                create_at: true,
                exam_classess: {
                  select: {
                    id: true,
                  },
                },
              },
              where: {
                is_archived: false,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            rank: true,
          },
        });
         
        const groupedExams = markSheets.reduce((result: any, exam: any) => {
          const term = exam?.exam?.term;
          if (!result[term]) {
            result[term] = [];
          }
          result[term].push({
            id: exam?.id,
            exam_id: exam?.exam.id,
            name: exam?.exam.name,
            date: exam?.exam.create_at.toISOString().split('T')[0],
            marksObtained: exam?.mark_obtained,
            coefficient: exam?.exam.coefficient,
            totalScore: exam?.exam.total_mark,
            overTwnetyMark: exam?.mark_obtained * (20 / exam.exam.total_mark),
            range: exam?.rank,
            exam_classess: exam?.exam.exam_classess,
            user: exam?.user,
          });
          return result;
        }, {});
         

        const isTrimester = Object.keys(groupedExams).some((key) =>
          key.toLowerCase().includes('trimestre')
        );

        const terms = isTrimester
          ? ['trimestre_1', 'trimestre_2', 'trimestre_3']
          : ['semestre_1', 'semestre_2'];

        const trimesters = terms.map((term) => ({
          name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          exams: groupedExams[term] || [],
        }));
         

        const averageMark = calculateAverageMark(trimesters);
         

        const infos = await db.userClasseInfos.findMany({
          where: {
            user_id: item.user_id,
            classe_id: +item.classesId,
            subject_id: +subject[0].id,
          },
          select: {
            id: true,
          },
        });

         
        const existingInfo = infos.length !== 0;
         

        if (!existingInfo) {
          try {
            await db.userClasseInfos.create({
              data: {
                user_id: item.user_id,
                classe_id: +classe_id,
                subject_id: subject?.[0]?.id,
                average: +averageMark,
              },
            });
          } catch (err) {
             
          }
        }

        const allClasseInfos = (await db.userClasseInfos.findMany({
          where: {
            classe_id: +item.classesId,
            subject_id: +subject[0].id,
          },
        })) as any;

        const sorted = allClasseInfos.sort((a: any, b: any) => +b.average - +a.average);
         
        const ranked = sorted.map((el: any, index: number) => {
          return {
            ...el,
            rankInClasse: index + 1,
          };
        });
        const reRanked = ranked.map((el: any, index: any, array: any) => {
          if (index === 0) {
            return {
              ...el,
              rankInClasse: 1,
            };
          } else {
            const sameAverageAsPrevious = index > 0 && el.average === array[index - 1].average;
             
            //  
             
             
            // const rank = index + 1;
            const rank = sameAverageAsPrevious ? array[index - 1].rankInClasse : index + 1;
             

            if (el.user_id === item.user_id) {
              return {
                ...el,
                rankInClasse: rank,
                average: averageMark,
              };
            }
            return {
              ...el,
              rankInClasse: rank,
            };
          }
        });
         

        for (const item of reRanked) {
          const { user_id, average, classe_id, rankInClasse, subject_id } = item;
           
           
           
          await db.userClasseInfos.updateMany({
            where: {
              user_id,
              classe_id: classe_id,
              subject_id: subject_id,
            },
            data: {
              average: +average,
              rankInClasse,
            },
          });

          // if (!existingInfo) {
          //    
          //   await db.userClasseInfos.create({
          //     data: {
          //       user_id,
          //       classe_id: classe_id,
          //       subject_id: subject_id,
          //       average: +average,
          //       rankInClasse,
          //     },
          //   });
          // } else {
          //    
          //   await db.userClasseInfos.updateMany({
          //     where: {
          //       user_id,
          //       classe_id: classe_id,
          //       subject_id: subject_id,
          //     },
          //     data: {
          //       average: +average,
          //       rankInClasse,
          //     },
          //   });
          // }
        }

        return markSheets;
      })
    );
    return updatedExamCorrectionBatch;
  } catch (error) {
    console.error('Error in sendRankOfUserExam:', error); // Fix typo in the error message
    throw new Error('An error occurred while updating exam correction.'); // Simplify the error message
  }
};
export const editeExamFeedback = async ({
  exam_id,
  student_id,
  newFeedback,
}: {
  student_id: string;
  exam_id: string;
  newFeedback: any;
}) => {
  try {
    const existingExamCorrection = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        user_id: student_id,
      },
    });

    if (existingExamCorrection.length === 0) {
      const examCorrection = await db.examCorrection.create({
        data: {
          exam: {
            connect: {
              id: +exam_id,
            },
          },
          user: {
            connect: {
              id: student_id,
            },
          },
          feedback: newFeedback,
        },
      });

      return examCorrection;
    } else {
      // Update the existing examCorrection if it already exists
      const updatedExamCorrection = await db.examCorrection.updateMany({
        where: {
          exam_id: +exam_id,
          user_id: student_id,
        },
        data: {
          feedback: newFeedback,
        },
      });
      return updatedExamCorrection;
    }
  } catch (error) {
    console.error('Error in createNoteExamCorrectio:', error);
    throw new Error('An error occurred while creating/updating exam correction.');
  }
};
export const editeExamStatus = async ({
  exam_id,
  user_id,
  status,
}: {
  user_id: string;
  exam_id: string;
  status: 'notClassified' | 'absent';
}) => {
  try {
    const existingExamCorrection = await db.examCorrection.findMany({
      where: {
        exam_id: +exam_id,
        user_id: user_id,
      },
    });

    if (existingExamCorrection.length === 0) {
      const examCorrection = await db.examCorrection.create({
        data: {
          exam: {
            connect: {
              id: +exam_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
          status: status,
        },
      });

      return examCorrection;
    } else {
      // Update the existing examCorrection if it already exists
      const updatedExamCorrection = await db.examCorrection.updateMany({
        where: {
          exam_id: +exam_id,
          user_id: user_id,
        },
        data: {
          status: status,
        },
      });

      return updatedExamCorrection;
    }
  } catch (error) {
    console.error('Error in createNoteExamCorrectio:', error);
    throw new Error('An error occurred while creating/updating exam correction.');
  }
};

// const getRecursiveExamQuestion = async () => {
//   const exam_id = 19;
//   const exercises = await db.exercise.findUnique({

//     includeRecursive: { children: { maxDepth: 10 } },
//   });

//   const questionsId = exercises[0]?.question?.id;

// };
// const getRecursiveExamQuestion = async () => {
//   const exam_id = 19;
// const result = await db.$queryRaw`
//   WITH RECURSIVE RecursiveQuestions AS (
//     SELECT *
//     FROM question as q1
//     where q1.id = 1
//     UNION ALL

//     SELECT q2.*
//     FROM question as q2
//     JOIN RecursiveQuestions rq ON q2.parent_id = rq.id

//   )
//   SELECT * FROM RecursiveQuestions;
// `;
//   const result = await db.exercise.findMany({
//     where: {
//       id: 5,
//     },
//     include: {
//       question: {
//         include: {
//           parent: true,
//         },
//       },
//     },
//   });
// };

// getRecursiveExamQuestion();

export const getUserClasseInfos = async ({
  userId,
  classeId,
  subjectId,
}: {
  userId: string;
  classeId: number;
  subjectId: number;
}) => {
  const data = await db.userClasseInfos.findMany({
    where: {
      user_id: userId,
      classe_id: classeId,
      subject_id: subjectId,
    },
    select: {
      rankInClasse: true,
      average: true,
    },
  });
  return data;
};


export const updateExamAttachements = async ({
  exam_id,
  attachements,
}: {
  exam_id: number;
  attachements: any;
}) => {
  const data = await db.exam.update({
    where: {
      id: exam_id,
    },
    data: {
      attachements: attachements,
    },
  });
  return data;
};


export const getExamAttachements = async ({
  exam_id,
}: {
  exam_id: number;
}) => {
  const data = await db.exam.findUnique({
    where: {
      id: exam_id,
    },
    select: {
      attachements: true,
    },
  });
  return data;
};