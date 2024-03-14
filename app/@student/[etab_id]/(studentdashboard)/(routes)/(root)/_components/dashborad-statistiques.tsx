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
import {
  getCorrectionProgressStats,
  getExamCorrectionById2,
  getUserCorrectionBySubjectId,
} from '@/actions/exam-correction';
import { getAllSubjectsByClasseId } from '@/actions/subjects';
import { useParams } from 'next/navigation';

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
  const [examId, setExamId] = useState<string>('');
  const [subId, setSubId] = useState<string>('');
  const [classe, setClasse] = useState<any>(undefined);
  const [userCorrection, setUserCorrection] = useState<any>(undefined);
  const [disable, setDisable] = useState<boolean>(true);
  const [allStudentOfClasseCount, setAllStudentOfClasseCount] = useState<number>(allStudentCount);

  const params = useParams();

  const classId = params.etab_id;
  const {
    data: subjects,
    isPending: isSubjectsPending,
    error: subjectsError,
  } = useQuery({
    queryKey: ['user-subject', classId],
    queryFn: async () => getAllSubjectsByClasseId(+classId),
  }) as any;

  const {
    data: exams,
    isPending: isExamPending,
    error,
  } = useQuery({
    queryKey: ['subject-examCorrection', subId],
    queryFn: async () => getUserCorrectionBySubjectId(userId,subId),
  }) as any;
  console.log('🚀 ~ exams:', exams);

  console.log('🚀 ~ subjects:', subjects);
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
              console.log(value);
              setSubId(value);
            }}
            disabled={isSubjectsPending || !subjects?.length}
          >
            <SelectTrigger className="flex items-center p-2 px-1 border w-1/4 rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] hover:opacity-80 max-md:w-full">
              <SelectValue placeholder={'Toutes les matiéres'} />
            </SelectTrigger>
            <SelectContent>
              {subjects?.length > 0 &&
                subjects?.map((subject: any) => (
                  <SelectItem key={subject?.id} value={subject?.id} className="">
                    {subject?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {/* <Select
            onValueChange={async (value) => {
              console.log(value);
              setExamId(value);
            }}
            disabled={subId === ''}
          >
            <SelectTrigger className="flex items-center p-2 border w-1/4 rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 max-md:w-full ">
              <SelectValue placeholder={'Tous les examens'} />
            </SelectTrigger>

            <SelectContent>
              {subjects?.length > 0 &&
                subjects[subId]?.exams?.map((exam: any) => (
                  <SelectItem key={exam?.id} value={exam?.id} className="">
                    {exam?.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <div>
        {/* <StatistiquesItems
          allSubjectCount={subjects?.length}
          classeExam={subjects}
          studentCountPending={true}
          correctionsProgress={subjects}
          allStudentCount={subjects?.length}
        /> */}
      </div>
    </div>
  );
};

export default DashboradStatistiques;
