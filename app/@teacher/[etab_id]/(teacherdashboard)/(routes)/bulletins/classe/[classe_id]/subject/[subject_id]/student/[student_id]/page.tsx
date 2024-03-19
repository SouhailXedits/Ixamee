'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import TermCard from '@/components/shared-components/TermCard';
import { useQuery } from '@tanstack/react-query';
import { getMarksheetByUserId } from '@/actions/mark-sheets/actions';
import { getUserById } from '@/data/user';
import Loading from '@/app/loading';
import { getNameClasseByClasseId } from '@/actions/classe';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateAverageMark } from '../../../../../../../../../../../_utils/calculateAverage';
import { getUserClasseInfos } from '@/actions/examens';
import { getNameEstabByClasseId } from '@/actions/establishements';
import { getAllSubjectNameById } from '@/actions/subjects';
import { getTeacherName } from '@/actions/teachers';
import PDFExport from '@/app/_utils/ExportAsPdf';
import { MarkSheetStudent } from '@/components/shared-components/MarkSheetStudent';


const Student = () => {
  const params = useParams();
  const router = useRouter();
  // const currentId = params.bulletin_id;
  function handleGoBack() {
    router.back();
  }
  const classeId = Number(params.classe_id);
  const subjectId = Number(params.subject_id);
  const currentId = params.student_id.toString();

  const { data: user, isPending } = useQuery({
    queryKey: ['user-marksheet', currentId],
    queryFn: async () => await getUserById(currentId + ''),
  });


  const { data: marksheet, isPending: isPendingmMarksheet } = useQuery({
    queryKey: ['marksheet', currentId],
    queryFn: async () => getMarksheetByUserId(+classeId, currentId + '', +subjectId),
  });


  const { data: classeName, isPending: classeNamePending } = useQuery<any>({
    queryKey: ['classeName', classeId],
    queryFn: async () => await getNameClasseByClasseId(+classeId),
  });
  const { data: estabName, isPending: estabNamePending } = useQuery<any>({
    queryKey: ['estabName', classeId],
    queryFn: async () => await getNameEstabByClasseId(+classeId),
  });
  const { data: subjectName, isPending: subjectNamePending } = useQuery<any>({
    queryKey: ['subjectName', subjectId],
    queryFn: async () => await getAllSubjectNameById(+subjectId),
  });
  const { data: TeacherName, isPending: TeacherNamePending } = useQuery<any>({
    queryKey: ['TeacherName', subjectId],
    queryFn: async () => await getTeacherName(+subjectId, +classeId),
  });


  const { data: userClasseInfos, isPending: userClasseInfosPending } = useQuery<any>({
    queryKey: ['userClasseInfos', currentId],

    queryFn: async () => await getUserClasseInfos({ userId: currentId, classeId, subjectId }),
  });



  const examsData = marksheet?.data || [];


  const groupedExams = examsData.reduce((result: any, exam: any) => {

    const term = exam?.exam?.term;
    if (!result[term]) {
      result[term] = [];
    }
    result[term].push({
      id: exam?.id,
      exam_id: exam?.exam?.id,
      name: exam?.exam?.name,
      date: exam?.exam?.create_at.toISOString().split('T')[0],
      marksObtained: exam?.mark_obtained,
      coefficient: exam?.exam?.coefficient,
      totalScore: exam?.exam?.total_mark,
      overTwnetyMark: exam?.mark_obtained * (20 / exam?.exam?.total_mark),
      range: exam?.rank,
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
    name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()), // Formatting term name
    exams: groupedExams[term] || [], // Check and add empty array if term has no exams
  }));

  const averageMark = calculateAverageMark(trimesters);

  if (isPending || isPendingmMarksheet) return <Loading />;

  return (
    <main className="flex flex-col gap-12 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            <button name="btn" className="cursor-pointer" onClick={handleGoBack}>
              Bulletins
            </button>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">{user?.name}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* importer */}
          <PDFExport pdfName="bulletin">
            <MarkSheetStudent
              data={trimesters}
              meta={{
                estab: estabName?.name,
                subject: subjectName?.name,
                classe: classeNamePending || classeName?.[0]?.name,
                fullName: user?.name,
                average: userClasseInfos?.length && userClasseInfos?.[0].average,
                range: userClasseInfos?.length && userClasseInfos?.[0].rankInClasse,
                teacherName: TeacherName?.name,
                userClasseInfos,
              }}
            />
          </PDFExport>
          {/* <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div> */}
        </div>
      </nav>
      <div className="flex items-center gap-3 ml-5 ">
        <Image
          src={user?.image || '/defaultUserAvatr.svg'}
          alt=" user avatar"
          height={50}
          width={50}
        />
        <div>
          <p className="text-xl text-mainGreen">{user?.name}</p>
          {classeNamePending && <Skeleton className="w-20 h-5 " />}
          {classeName?.length && <p className=" text-gray">{classeName?.[0]?.name}</p>}
        </div>
      </div>

      <div className="flex overflow-auto gap-9 p-7">
        {trimesters.map((trimester) => (
          <TermCard term={trimester} key={trimester.name} />
        ))}
      </div>
      <div className="flex justify-end w-full gap-2 text-white ">
        {userClasseInfosPending ? (
          <Skeleton className="w-16 h-7" />
        ) : (
          <>
            {' '}
            <p className="p-2 rounded bg-orangeColor">
              Rang: {userClasseInfos?.[0]?.rankInClasse || '-'}
            </p>{' '}
            <p className="p-2 rounded bg-mainGreen">
              Moyenne génerale: {userClasseInfos?.[0]?.average}/20
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Student;
