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
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useSendExamMark } from '../hooks/useSendResult';
import { Skeleton } from '@/components/ui/skeleton';
import AddStudent from './_components/AddStudent';
import ImportClasse from './_components/ImportClasse';
import ExportClassePdf from './_components/ExportClassePdf';
import Selects from './_components/Selects';
import { getCorrectionOfUser } from '@/actions/mark-sheets/actions';

interface classe {
  id: number;
  name: string;
  range: number;
  is_archived: boolean;
  exam_classe: [];
}
const Student = ({ params }: { params: { classesId: string } }) => {
  const { sendExamMark, isPending: isPendingSend } = useSendExamMark();
  const queryClient = useQueryClient();
  const { classesId } = params;
  const [filter, setFilter] = useState<any>('');
  const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['classe'],
    queryFn: async () => await getClasseById(+params.classesId),
  });
  const [exam, setExam] = useState<string>('');
  useEffect(() => {
    const note = classe?.exam_classe[0]?.id;
    setExam(note + '');
  }, [classe, isPendingClasse]);
  console.log(exam);

  const { data: userCorrection, isPending: isPendingUser } = useQuery({
    queryKey: ['userCorrection', exam, classesId],
    queryFn: async () => await getCorrectionOfUser(classesId, data, exam),
    retry: 0,
  });

  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  // const data = queryClient.getQueryData(['userOfClasses']) as any;
  const { data, isPending: isPendingUserOfClasses } = useQuery({
    queryKey: ['userOfClasses', classesId],
    queryFn: async () => await getStudentOfClasse(+classesId),
  });


  const teacherEstabName = teacherEstab?.filter((item: any) => item.id === +etab_id)[0]?.name;
  const classeName = classe?.name as string;


  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent', exam],
    queryFn: async () => await getCorigeExameContentOfAllUser(exam, data),
  });
  // }
  const newData = data
    ?.map((item: any) => {
      return {
        ...item,
        correctionExamOfUser: getCorrigeExamOfUser,
        exam: exam,
        classe: classe,
        status:
          userCorrection?.find((user: any) => user?.user_id === item?.id)?.status || 'notCorrected',
      };
    })
    ?.filter((item: any) => {
      // Apply your filter condition here based on the 'filter' state and item.status
      if (filter === 'corrige' && item.status === 'done') {
        return true;
      } else if (filter === 'en-cours' && item.status === 'pending') {
        return true;
      } else if (filter === 'non-corrigé' && item.status === 'notCorrected') {
        return true;
      } else if (filter === 'non-classé' && item.status === 'notClassified') {
        return true;
      } else if (filter === 'absent' && item.status === 'absent') {
        return true;
      } else if (filter === 'allExam') {
        // If filter is empty, include all items
        return true;
      } else if (filter === '') {
        // If filter is empty, include all items
        return true;
      }
      return false;
    });
  const handleSendResults = () => {
    if (data?.length === userCorrection?.length) {
      const ExamMarkData = userCorrection?.map((user: any) => {
        const userExamContent = queryClient.getQueryData([
          'CorigeExameContent',
          exam,
          // user?.user_id,
        ]) as any;
        const markObtin = userExamContent.filter((item: any) => item.user_id === user?.user_id)[0]
          .mark_obtained;
        return {
          user_id: user?.user_id,
          exam_id: exam,
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
        exam_id: exam,
        mark,
        classesId: classesId,
        rank,
      }));
      sendExamMark({ exam_id: exam, marks: marksDataToSend });
    }
  };
  if (isPendingUser) return <Loading />;
  if (isPendingCorrige) return <Loading />;
  function notCorrected(userCorrection: any) {
    return userCorrection?.filter(
      (user: any) => user?.status === 'notCorrected' || user?.status === 'pending'
    );
  }
  const userNotCorrected = notCorrected(userCorrection);
  console.log(exam);
  console.log(newData);

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex items-center justify-between w-full gap-14 ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div>
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
          <Selects exam={exam} setExam={setExam} setFilter={setFilter} classe={classe} />
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

          <ExportClassePdf newData={newData} classeName={classeName} teacherEstabName={teacherEstabName} />

          <AddStudent classesId={classesId} etab_id={etab_id} />
        </div>
      </nav>

      {/* console.log(' :', ); */}
      {isPendingClasse ? (
        <div>
          <Skeleton className="w-full h-[200px]" />
        </div>
      ) : (
        <div className="pt-6 max-lg:pt-20 max-ml:pt-30">
          <StudentList data={newData} class_id={classesId} isPending={false} />
        </div>
      )}
    </main>
  );
};

export default Student;
