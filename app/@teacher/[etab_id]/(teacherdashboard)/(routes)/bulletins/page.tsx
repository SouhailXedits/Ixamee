'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

import MarkSheetStudentList from './components/StudentsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClasse } from '@/actions/classe';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { getMarkSheets } from '@/actions/mark-sheets/actions';
import Loading from '@/app/loading';

const Student = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const etab_id = Number(params.etab_id);

  const { data: classes } = useQuery({
    queryKey: ['classe'],
    queryFn: async () => await getAllClasse({ user_id: user?.id, etab_id }),
  });

  const defaultTerm = user?.term === 'TRIMESTRE' ? 'trimestre_1' : 'semestre_1';
  const subjects = queryClient.getQueryData(['teacherSubject']) as any;

  const defaultSubject = subjects?.length && subjects[0]?.id;

  const [filters, setFilters] = useState({
    term: defaultTerm,
    classe_id: classes?.data?.length && classes?.data[0]?.id,
    subject_id: subjects?.length && subjects[0]?.id,
  });
  queryClient.setQueryData(['classe-filters'], filters.classe_id);

  useEffect(() => {
    classes?.data?.length && setFilters({ ...filters, classe_id: classes?.data[0]?.id });
  }, [classes?.data]);

  const { data: markSheets, isPending } = useQuery({
    queryKey: ['mark-sheets', filters.classe_id, filters.term, filters.subject_id],
    queryFn: async () => await getMarkSheets(filters),
  });

  const groupedData = markSheets?.data.reduce((acc: any, item: any) => {
    const userId = item.user.id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(item);

    return acc;
  }, {});

  if (!groupedData && isPending) return <Loading />;
  console.log(groupedData);

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
      };
    });
  }
  console.log(resultArray);

  const sortedData = [...resultArray].sort((a, b) => b.average - a.average);
  const rankedData = sortedData.map((student, index) => ({ ...student, rank: index + 1 }));

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex items-center justify-between w-full max-md:justify-normal">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/classes'} className="cursor-pointer">
              Bulletins
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Bulletins</span>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-end gap-3 pt-4 h-14 cursor-pointe">
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>

          <Select
            defaultValue={defaultTerm}
            onValueChange={(value) => {
              setFilters({ ...filters, term: value });
            }}
            value={filters.term}
          >
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              {/* {user.term === 'TRIMESTRE' && <SelectItem value="tremester1">Trimester 1</SelectItem>}
              {user.term === 'SEMESTRE' && <SelectItem value="semester1">Semestre 1</SelectItem>} */}
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Period</span>
                  </div>
                }
              />
            </SelectTrigger>

            <SelectContent>
              {user?.term === 'TRIMESTRE' && (
                <>
                  <SelectItem value="trimestre_1">Trimester 1</SelectItem>
                  <SelectItem value="trimestre_2">Trimester 2</SelectItem>
                  <SelectItem value="trimestre_3">Trimester 3</SelectItem>
                </>
              )}
              {user?.term === 'SEMESTRE' && (
                <>
                  <SelectItem value="semestre_1">Semestre 1</SelectItem>
                  <SelectItem value="semestre_2">Semestre 2</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          <Select
            defaultValue={defaultSubject}
            onValueChange={(value) => {
              setFilters({ ...filters, subject_id: value });
            }}
            value={filters.subject_id}
          >
            <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
              {/* {user.term === 'TRIMESTRE' && <SelectItem value="tremester1">Trimester 1</SelectItem>}
              {user.term === 'SEMESTRE' && <SelectItem value="semester1">Semestre 1</SelectItem>} */}
              <SelectValue
                placeholder={
                  <div className="flex items-center">
                    <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                    <span className="ml-2 text-[#1B8392] text-base  ">Period</span>
                  </div>
                }
              />
            </SelectTrigger>

            <SelectContent>
              {subjects?.map((subject: any) => (
                <SelectItem value={subject.id} key={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {classes?.data ? (
            <Select
              defaultValue={classes?.data?.length && classes?.data[0].id}
              onValueChange={(value) => {
                setFilters({ ...filters, classe_id: value });
              }}
              value={filters.classe_id}
            >
              <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
                <SelectValue
                  placeholder={
                    <div className="flex items-center">
                      <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                      <span className="ml-2 text-[#1B8392] text-base  ">Classe</span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {classes?.data?.map((classe: any) => (
                  <SelectItem value={classe.id} key={classe.id}>
                    {classe.name}
                  </SelectItem>
                ))}

                {/* <SelectItem value="bac_info">Bac Info</SelectItem> */}
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className=" h-10 w-[146px]" />
          )}
        </div>
      </nav>

      <div className="pt-[4rem] max-md:pt-[6rem]">
        <MarkSheetStudentList data={rankedData} filters={filters} />
      </div>
    </main>
  );
};

export default Student;
