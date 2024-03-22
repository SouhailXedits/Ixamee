'use client';
import Image from 'next/image';
import Link from 'next/link';
import { StudentList } from './_components/student-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getClasseById,
  getCorigeExameContentOfAllUser,
  getStudentOfClasse,
} from '@/actions/classe';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import Loading from '@/app/loading';
import { useSendExamMark } from '../hooks/useSendResult';
import { Skeleton } from '@/components/ui/skeleton';
import AddStudent from './_components/AddStudent';
import ImportClasse from './_components/ImportClasse';
import ExportClassePdf from './_components/ExportClassePdf';
import Selects from './_components/Selects';
import { getCorrectionOfUser } from '@/actions/mark-sheets/actions';
import { useConfettiStore } from '@/store/use-confetti-store';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useFilters } from '@/store/use-filters-params';
import ExportAllEvaluationPdf from './_components/ExportAllEvaluation';

interface classe {
  id: number;
  name: string;
  range: number;
  is_archived: boolean;
  exam_classe: [];
}
const Student = ({ params }: { params: { classesId: string } }) => {
  const queryClient = useQueryClient();
  const confetti = useConfettiStore();
  const { classesId } = params;
  const etab_id = queryClient.getQueryData(['etab_id']) as number; //get The list of Id in the classe
  const getIdOfUserInTheClasse = queryClient.getQueryData(['getIdOfUserInTheClasse']) as any;
  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  const teacherEstabName = teacherEstab?.filter((item: any) => item.id === +etab_id)[0]?.name;

  const { sendExamMark, isPending: isPendingSend } = useSendExamMark();
  const { filters, setFilters } = useFilters((state) => state);
  console.log(filters);
  // const [filter, setFilter] = useState<any>(filters.filterBy);
  // const [exam, setExam] = useState<string>(filters.exam_id + '');

  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['classe', params.classesId],
    queryFn: async () => await getClasseById(+params.classesId),
  });
  // get the correction of user : hadi bach tjiblna el correction mta3 el user el koll

  const { data: userCorrection, isPending: isPendingUser } = useQuery({
    queryKey: ['userCorrection', filters.exam_id, classesId],
    enabled: filters.exam_id !== undefined && filters.exam_id !== '',
    queryFn: async () => await getCorrectionOfUser(classesId, data, filters.exam_id),
  });

  // get the student of classe  : hadi bach tjiblna el student mta3 el classe
  const { data, isPending: isPendingUserOfClasses } = useQuery({
    queryKey: ['userOfClasses', classesId],
    queryFn: async () => await getStudentOfClasse(+classesId),
  });
  console.log(data);
  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent', filters.exam_id],
    queryFn: async () =>
      await getCorigeExameContentOfAllUser(filters.exam_id, getIdOfUserInTheClasse),
  });
  console.log(getCorrigeExamOfUser);

  useEffect(() => {
    if (filters.exam_id === 'undefined' || filters.exam_id === '') {
      const examId = classe?.exam_classe[0]?.id;
      setFilters({ ...filters, exam_id: examId + '' });
    }
  }, [classe, isPendingClasse, filters.exam_id]);

  const classeName = classe?.name as string;

  // }
  const newData = useMemo(() => {
    return data
      ?.map((item: any) => ({
        ...item,
        correctionExamOfUser: getCorrigeExamOfUser,
        exam: filters.exam_id,
        classe: classe,
        status:
          userCorrection?.find((user: any) => user?.user_id === item?.id)?.status || 'notCorrected',
      }))
      ?.filter((item: any) => {
        if (filters.filterBy === 'corrige' && item.status === 'done') {
          return true;
        } else if (filters.filterBy === 'en-cours' && item.status === 'pending') {
          return true;
        } else if (filters.filterBy === 'non-corrigé' && item.status === 'notCorrected') {
          return true;
        } else if (filters.filterBy === 'non-classé' && item.status === 'notClassified') {
          return true;
        } else if (filters.filterBy === 'absent' && item.status === 'absent') {
          return true;
        } else if (filters.filterBy === 'allExam' || filters.filterBy === '') {
          return true;
        }
        return false;
      });
  }, [data, filters.exam_id, getCorrigeExamOfUser, userCorrection, filters.filterBy]);

  const handleSendResults = () => {
    if (data?.length === userCorrection?.length) {
      const ExamMarkData = userCorrection?.map((user: any) => {
        const userExamContent = queryClient.getQueryData([
          'CorigeExameContent',
          filters.exam_id,
          // user?.user_id,
        ]) as any;
        console.log(userExamContent);
        console.log(user?.user_id);
        const markObtin = userExamContent.filter((item: any) => item.user_id === user?.user_id)[0]
          .mark_obtained;
        return {
          user_id: user?.user_id,
          exam_id: filters.exam_id,
          rank: 0,
          classesId: classesId,
          mark: markObtin,
        };
      });

      // Sort ExamMarkData array in descending order based on exam_content
      ExamMarkData?.sort((a: any, b: any) => b.mark - a.mark);

      // Assign ranks to users
      // Assign ranks to users
      let rank = 1 as any;
      let prevMark = null as any;

      ExamMarkData?.forEach((mark: any) => {
        if (prevMark !== null && mark.mark < prevMark) {
          rank++;
        }
        mark.rank = rank;
        prevMark = mark.mark;
      });
      const marksDataToSend = ExamMarkData?.map(({ user_id, mark, classesId, rank }: any) => ({
        user_id,
        exam_id: filters.exam_id,
        mark,
        classesId: classesId,
        rank,
      }));
      sendExamMark({ exam_id: filters.exam_id, marks: marksDataToSend });
      confetti.onOpen();
    }
  };

  // if (isPendingUser) return <Loading />;
  // if (isPendingCorrige) return <Loading />;
  function notCorrected(userCorrection: any) {
    return userCorrection?.filter(
      (user: any) => user?.status === 'notCorrected' || user?.status === 'pending'
    );
  }
  const userNotCorrected = notCorrected(userCorrection);
  const alphabiticSorted = newData?.sort((a, b) => a.name.localeCompare(b.name));
  console.log(newData);
  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex items-center justify-between w-full gap-14 ">
        <div className="flex flex-col gap-4">
          {isPendingClasse ? (
            <div className="text-[#1B8392] text-2xl font-semibold ">
              <Skeleton className="w-[300px] h-[40px]" />
            </div>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-[#1B8392] text-2xl font-semibold ">{classeName}</span>
                {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
              </HoverCardTrigger>
              <HoverCardContent className="text-[#727272]  break-words w-[200px] text-md">
                <span className="text-[#1B8392] text-xl font-semibold">{classeName}</span>
              </HoverCardContent>
            </HoverCard>
          )}

          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <Link href={`/${etab_id}/classes`} className="cursor-pointer">
              Classes
            </Link>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">d’étudiants</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-4 h-14 cursor-pointe ">
          <Selects classe={classe} />
          <Button
            className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center"
            disabled={userNotCorrected?.length !== 0 || userCorrection?.length === 0}
            onClick={() => handleSendResults()}
          >
            <Image src="/sendIcon.svg" alt="icons" width={20} height={20} />
            <span className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Envoyer résultats
            </span>
          </Button>

          <ImportClasse classesId={classesId} etab_id={etab_id} />

          <ExportClassePdf
            newData={newData}
            classeName={classeName}
            teacherEstabName={teacherEstabName}
          />

          <AddStudent classesId={classesId} etab_id={etab_id} />
          {getCorrigeExamOfUser && newData && classesId && filters?.exam_id && (
            <ExportAllEvaluationPdf
              newData={newData}
              classeId={classesId}
              examId={filters?.exam_id}
            />
          )}
        </div>
      </nav>

      {isPendingClasse ? (
        <div className="flex flex-col gap-6 pt-10">
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[30px]" />
          <Skeleton className="w-full h-[30px]" />

          <Skeleton className="w-full h-[30px]" />

          <Skeleton className="w-full h-[30px]" />
        </div>
      ) : (
        <div className="pt-6 max-lg:pt-20 max-ml:pt-30">
          <StudentList
            data={alphabiticSorted}
            class_id={classesId}
            isPending={isPendingClasse}
            isPendingUserOfClasses={isPendingUserOfClasses}
          />
        </div>
      )}
    </main>
  );
};

export default Student;
