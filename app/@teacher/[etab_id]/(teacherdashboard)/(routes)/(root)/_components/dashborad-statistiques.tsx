'use client';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatistiquesItems from './statistiques-items';

import { useEffect, useState } from 'react';
import { getClasseByClassId } from '@/actions/classe';
import { getCorrectionOfUser } from '@/actions/mark-sheets/actions';
import { useQuery } from '@tanstack/react-query';
import { getCorrectionProgressStats, getExamCorrectionById2 } from '@/actions/exam-correction';

const DashboradStatistiques = ({
  isPendingClasses,
  classes,
  allStudentCount,
  studentCountPending,
}: {
  isPendingClasses: boolean;
  classes: any;
  allStudentCount: number;
  studentCountPending: boolean;
}) => {
  const [classId, setClassId] = useState<string>('');
  const [examId, setExamId] = useState<string>('');
  const [classe, setClasse] = useState<any>(undefined);
  const [userCorrection, setUserCorrection] = useState<any>(undefined);
  const [disable, setDisable] = useState<boolean>(true);
  const [allStudentOfClasseCount, setAllStudentOfClasseCount] = useState<number>(allStudentCount);
  console.log(classe, 'classe');

  const {data: classeInfos, isPending} = useQuery({
    queryKey: ['classe', classId],
    queryFn: async () => await getClasseByClassId(+classId)
  })
  console.log(classeInfos);

  useEffect(() => {
    setAllStudentOfClasseCount(classeInfos ? classeInfos?.student_class.length : 0);
    setClasse(classeInfos);
  })

  const { data: correctionsProgress } = useQuery({
    queryKey: ['usersProgress', classId, examId],
    queryFn: async () => await getCorrectionProgressStats(+classId, +examId),
  });
// const userCorrec = (await getCorrectionOfUser(classId, classe?.student_class, value)) as any;

// setUserCorrection(userCorrec);

  // const { data: usersProgresse } = useQuery({
  //   queryKey: ['usersProgress', classId, examId],
  //   queryFn: async () => await getCorrectionOfUser(examId, classId),
  // });
  console.log(classeInfos);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between max-md:flex-col max-md:gap-3">
        <div className="flex items-center gap-4 ">
          <Image
            alt="state img"
            src="dashboard/statistique/statistique.svg"
            width={22}
            height={22}
          />
          <span className=" text-11 text-xl font-[500] whitespace-nowrap ">
            Statistiques Examens
          </span>
        </div>
        <div className="flex items-end justify-end w-full gap-3 max-md:w-full">
          {/* Classe */}

          <Select
            onValueChange={async (value) => {
              // setDisable(true);
              //const data = await getClasseByClassId(+value);
              // setAllStudentOfClasseCount(data ? data?.student_class.length : 0);
              // setClasse(data);

              setClassId(value);
              // setDisable(false);
            }}
            disabled={isPendingClasses || !classes?.length }
          >
            <SelectTrigger className="flex items-center p-2 border w-1/4 rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 max-md:w-full">
              <SelectValue placeholder={'classe'} />
            </SelectTrigger>
            <SelectContent>
              {classes?.length > 0 &&
                classes?.map((classe: any) => (
                  <SelectItem key={classe?.id} value={classe?.id} className="">
                    {classe?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={async (value) => {
              console.log(value);
              setExamId(value);
            }}
            disabled={!classeInfos?.exam_classe?.length}
          >
            <SelectTrigger className="flex items-center p-2 border w-1/4 rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 max-md:w-full ">
              <SelectValue placeholder={'Devoir'} />
            </SelectTrigger>

            <SelectContent>
              {classe &&
                classe?.exam_classe?.map((exam: any) => (
                  <SelectItem key={exam?.id} value={exam?.id} className="">
                    {exam?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <StatistiquesItems
          classeExam={classe}
          userCorrection={userCorrection}
          allStudentCount={allStudentOfClasseCount}
          studentCountPending={studentCountPending}
          correctionsProgress={correctionsProgress}
        />
      </div>
    </div>
  );
};

export default DashboradStatistiques;
