'use server';

import { db } from '@/lib/db';

export const getMarkSheets = async (filters: {
  term: string;
  classe_id: number | undefined;
  subject_id: number | undefined;
}) => {
  if (!filters.term || !filters.classe_id || !filters.subject_id) return {data: []};
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          term: filters.term,
          subject: {
            id: filters.subject_id,
          },
        },
        user: {
          classe: {
            some: {
              id: filters.classe_id,
            },
          },
        },
        status: 'done' || 'absent' || 'notClassified' || 'pending',
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

    const groupedData = markSheets?.reduce((acc: any, item: any) => {
      const userId = item.user.id;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(item);

      return acc;
    }, {});
    console.log(groupedData)

    let maxCoefficient = 0;

    // Iterate through each user's data
    for (const userId in groupedData) {
      const userMarks = groupedData[userId];

      const weightedCoef = userMarks.reduce((sum: any, entry: any) => {
        const weightedMark = entry.exam.coefficient;
        return sum + weightedMark;
      }, 0);

      // Update maxWeightedTotalMarkSum if the current sum is higher
      if (weightedCoef > maxCoefficient) {
        maxCoefficient = weightedCoef;
      }
    }

    let resultArray = [] as any;
    if (groupedData) {
      resultArray = Object?.keys(groupedData).map((userId) => {
        const userData = groupedData[userId];

        const examsInfo = userData.map((examData: any) => {
          const { id, exam } = examData;

          const average = (examData.mark_obtained * exam.coefficient) / exam.coefficient;
          const overTwentyAvg = (20 / exam.total_mark) * average;

          return {
            id: exam.id,
            name: exam.name,
            marksObtained: examData.mark_obtained,
            totalMarks: exam.total_mark,
            coefficient: exam.coefficient,
            average: average,
            overTwentyAvg: overTwentyAvg,
            rank: examData.rank,
          };
        });

        // const totalMarksObtained = examsInfo.reduce(
        //   (acc: any, exam: any) => acc + exam.marksObtained,
        //   0
        // );
        // const totalCoefficient = examsInfo.reduce((acc: any, exam: any) => acc + exam.coefficient, 0);

        let overallAverage =
          examsInfo.reduce(
            (acc: any, exam: any): any => acc + exam.overTwentyAvg * exam.coefficient,
            0
          ) / maxCoefficient;

        return {
          id: userId,
          name: userData[0].user.name,
          image: userData[0].user.image,
          exams: examsInfo,
          average: overallAverage,
          rank: userData[0].rank,
        };
      });
    }
    const reRankedStudents = resultArray.map((student: any, i: number) => {
      if (i > 0 && student.average === resultArray[i - 1].average) {
       console.log(student.rank, resultArray[i - 1].rank) 
        return {
          ...student,
          rank: resultArray[i - 1].rank,
        };
      }
      return student;
    });
    console.log(reRankedStudents)

    // const sortedData = [...resultArray].sort((a, b) => b.average - a.average);
    // const rankedData = sortedData.map((student, index) => ({ ...student, rank: index + 1 }));


    return { data: reRankedStudents || {data: []}, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};


export const getMarksheetByUserId = async (
  classeId: number,
  userId: string,
  subject_id: number
) => {
  if (!classeId) return;
  try {
    const markSheets = await db.examCorrection.findMany({
      where: {
        exam: {
          subject: {
            id: subject_id,
          },
        },
        user: {
          id: userId,
          classe: {
            some: {
              id: classeId,
            },
          },
        },
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
            exam_correction: true,
            content: true,
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
        is_published: true,
      },
    });

    return { data: markSheets, error: undefined };
  } catch (error: any) {
    return {
      data: undefined as any,
      error: 'Failed to get mark sheets.',
    };
  }
};

export const getCorrectionOfUser = async (class_id: string, data: any, exam_id: string) => {
  if (exam_id === 'undefined') return null;
  const res = await db.examCorrection.findMany({
    where: {
      exam_id: +exam_id,
      user: {
        classe: {
          some: {
            id: +class_id,
          },
        },
      },
      user_id: {
        in: data?.map((el: any) => el.id),
      },
    },
    select: {
      status: true,
      user_id: true,
    },
  });
  return res;

};
