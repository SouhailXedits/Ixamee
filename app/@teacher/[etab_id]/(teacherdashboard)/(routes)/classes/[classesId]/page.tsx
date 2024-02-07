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
import {
  getClasseById,
  getCorigeExameContent,
  getCorigeExameContentOfAllUser,
  getCorrectionOfUser,
  getStudentOfClasse,
} from '@/actions/classe';
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
import PDFExport from '@/app/_utils/ExportAsPdf';
import { AllStudentList } from './_components/allStudent';
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
  const classe = queryClient.getQueryData(['classe', etab_id]) as any;
  const [exam, setExam] = useState<any>(classe.data[0].exam_classe[0]?.id);
  const { data: userCorrection, isPending: isPendingUser } = useQuery({
    queryKey: ['userCorrection', exam, classesId],
    queryFn: async () => await getCorrectionOfUser(classesId, data, exam),
    retry: 0,
  });

  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  // const data = queryClient.getQueryData(['userOfClasses']) as any;
  const { data, isPending: isPendingUserOfClasses } = useQuery({
    queryKey: ['userOfClasses'],
    queryFn: async () => await getStudentOfClasse(+classesId),
  });
  // queryKey: ['userOfClasses'],
  // queryFn: async () => await getStudentOfClasse(+params.classesId),

  const teacherEstabName = teacherEstab?.filter((item: any) => item.id === +etab_id)[0]?.name;
  const classeName = classe?.data[0]?.name;

  // const handleImportedData = (jsonData: any) => {
  //   // Handle the imported data in the external page
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
    const note = classe.data[0].exam_classe[0]?.id;
    setExam(note + '');
    // }
  }, [classe]);

  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent', exam],
    queryFn: async () => await getCorigeExameContentOfAllUser(exam, data),
  });
  const newData = data
    ?.map((item: any) => {
      return {
        ...item,
        correctionExamOfUser: getCorrigeExamOfUser,
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
  const handleDownload = () => {};
  function notCorrected(userCorrection: any) {
    return userCorrection?.filter(
      (user: any) => user?.status === 'notCorrected' || user?.status === 'pending'
    );
  }
  const userNotCorrected = notCorrected(userCorrection);
  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
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

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div>
            <Select
              onValueChange={(value) => setExam(value)}
              defaultValue={classe?.data[0]?.exam_classe[0]?.id + ''}
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
                {classe?.data[0].exam_classe?.map((exam: any) => (
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
            disabled={userNotCorrected.length !== 0}
            onClick={() => handleSendResults()}
          >
            <Image src="/sendIcon.svg" alt="icons" width={20} height={20} />
            <span className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Envoyer résultats
            </span>
          </Button>

          {/* {data?.length === 0 && ( */}
          <ImportUneClasse class_id={classesId} etab_id={etab_id}>
            <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Importer
              </div>
            </div>
          </ImportUneClasse>
          <PDFExport pdfName="Etudiants">
            <AllStudentList
              data={newData}
              classeName={classeName}
              teacherEstabName={teacherEstabName}
            />
          </PDFExport>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
                <Image src="/telechargeIcon.svg" alt="icons" width={20} height={20} />
                <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                  Télécharger
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer ">
                
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer ">Fichier CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* )} */}
          {/* importer */}

          <AjouterUnEtudiant class_id={classesId} etab_id={etab_id}>
            <div className="flex items-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant>
        </div>
      </nav>

      <div>
        <StudentList data={newData} class_id={classesId} isPending={false} />
      </div>
    </main>
  );
};

export default Student;
