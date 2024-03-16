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
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserCorrectionBySubjectId } from '@/actions/exam-correction';
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
  const [subId, setSubId] = useState<string>('');
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const userId = user?.id;
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
    data: subjectsExams,
    isPending: isSubjectsExamsPending,
    error: subjectsExamsError,
  } = useQuery({
    queryKey: ['user-subjects-examCorrection', userId, subId],
    queryFn: async () => getUserCorrectionBySubjectId(userId, +subId),
  }) as any;

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
          <Select
            onValueChange={async (value) => {
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
        </div>
      </div>
      <div>
        <StatistiquesItems marksObtained={subjectsExams} SubjectsPending={isSubjectsExamsPending} />
      </div>
    </div>
  );
};

export default DashboradStatistiques;
