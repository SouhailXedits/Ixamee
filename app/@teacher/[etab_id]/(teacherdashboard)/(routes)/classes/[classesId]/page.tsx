'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { StudentList } from './_components/student-list';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getClasseById, getCorrectionOfUser, getStudentOfClasse } from '@/actions/classe';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { any } from 'zod';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useSendExamMark } from '../hooks/useSendResult';
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
  const [exam, setExam] = useState<any>(0);
  const [filter, setFilter] = useState<any>('');
  const { data: userCorrection, isPending: isPendingUser } = useQuery({
    queryKey: ['userCorrection', exam, classesId],
    queryFn: async () => await getCorrectionOfUser(classesId, data, exam),
    retry: 0,
  });
  // if (isPendingUser) return <Loading />;

  const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const data = queryClient.getQueryData(['userOfClasses']) as any;
  const classe = queryClient.getQueryData(['classe']) as any;

  // const handleImportedData = (jsonData: any) => {
  //   // Handle the imported data in the external page
  //   console.log(jsonData);
  // };
  // const { data, isPending } = useQuery({
  //   queryKey: ['userOfClasses'],
  //   queryFn: async () => await getStudentOfClasse(+classesId),
  // });
  // const { data: classe, isPending: isPendingClasse } = useQuery({
  //   queryKey: ['classe'],
  //   queryFn: async () => await getClasseById(+classesId),
  // });
  useEffect(() => {
    // if (Array.isArray(classe?.exam_classe)) {
    setExam(classe?.exam_classe[0]?.id + '');
    // }
  }, [classe]);

  const newData = data
    ?.map((item: any) => {
      return {
        ...item,
        exam: exam, // Add your new field here
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
          +exam,
          user?.user_id,
        ]) as any;
        console.log(userExamContent);
        return {
          user_id: user?.user_id,
          exam_id: exam,
          rank: 0,
          mark: userExamContent[0]?.mark_obtained,
        };
      });

      // Sort ExamMarkData array in descending order based on exam_content
      ExamMarkData?.sort((a, b) => b.mark - a.mark);

      // Assign ranks to users
      // Assign ranks to users
      let rank = 1 as any;
      let prevMark = null as any;

      ExamMarkData?.forEach((mark) => {
        if (prevMark !== null && mark.mark < prevMark) {
          rank++;
        }
        mark.rank = rank;
        prevMark = mark.mark;
      });
      const marksDataToSend = ExamMarkData?.map(({ user_id, mark, rank }) => ({
        user_id,
        exam_id: exam,
        mark,
        rank,
      }));
      console.log(marksDataToSend);
      sendExamMark({ exam_id: exam, marks: marksDataToSend });
    }
  };
  if (!classe) return null;

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">{classe?.name}</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <Link href={`/${etab_id}/classes`} className="cursor-pointer">
              Classes
            </Link>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">d’étudiants</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div>
            <Select
              onValueChange={(value) => setExam(value)}
              defaultValue={
                !classe?.exam_classe || classe?.exam_classe.length === 0
                  ? '0'
                  : classe?.exam_classe[0]?.id + ''
              }
            >
              <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 ">
                <SelectValue
                  placeholder={
                    <div className="flex items-center">
                      <span className="ml-2 text-[#1B8392] text-base  ">
                        Sélectionner un examen
                      </span>
                    </div>
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {classe?.exam_classe?.map((exam: any) => (
                  <SelectItem value={exam.id + ''} className="">
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {exam !== 0 && (
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="flex items-center p-2 border rounded-lg cursor-pointer text-[#1B8392]  border-[#99C6D3] gap-3 hover:opacity-80 w-[146px]">
                <SelectValue
                  placeholder={
                    <div className="flex items-center">
                      <Image src={'/filterIcon.svg'} alt="filtericon" width={20} height={20} />
                      <span className="ml-2 text-[#1B8392] text-base  ">Filter</span>
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corrige" className="">
                  Corrigé
                </SelectItem>
                <SelectItem value="en-cours">En cours</SelectItem>
                <SelectItem value="non-corrigé">Non corrigé</SelectItem>
                <SelectItem value="non-classé">Non classé</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button
            className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center"
            disabled={!data || !userCorrection ? true : data?.length !== userCorrection?.length}
            onClick={() => handleSendResults()}
          >
            <Image src="/sendIcon.svg" alt="icons" width={20} height={20} />
            <span className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Envoyer résultats
            </span>
          </Button>

          {/* {data?.length === 0 && ( */}
          <ImportUneClasse data={data} class_id={classesId} etab_id={etab_id}>
            <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Importer
              </div>
            </div>
          </ImportUneClasse>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
                <Image src="/telechargeIcon.svg" alt="icons" width={20} height={20} />
                <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                  Télécharger
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer ">Fichier PDF</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer ">Fichier CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* )} */}
          {/* importer */}

          <AjouterUnEtudiant data={data} class_id={classesId} etab_id={etab_id}>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant>
        </div>
      </nav>

      <div>
        <StudentList data={newData} isPending={false} />
      </div>
    </main>
  );
};

export default Student;
