'use client';
import { getNameClasseByClasseId } from '@/actions/classe';
import { getNameEstabByClasseId } from '@/actions/establishements';
import { getUserClasseInfos } from '@/actions/examens';
import { getMarksheetByUserId } from '@/actions/mark-sheets/actions';
import { getAllSubjectNameById } from '@/actions/subjects';
import { getTeacherName } from '@/actions/teachers';
import PDFExport from '@/app/_utils/ExportAsPdf';
import { calculateAverageMark } from '@/app/_utils/calculateAverage';
import { calculateProgress } from '@/app/_utils/calculateProgress';
import Loading from '@/app/loading';
import { MarkSheetStudent } from '@/components/shared-components/MarkSheetStudent';
import TermCard from '@/components/shared-components/TermCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const Student = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const currentId = params.bulletin_id;
  function handleGoBack() {
    router.back();
  }
  const classeId = Number(params.etab_id);

  const subjectId = Number(params.subject_id);

  const user = queryClient.getQueryData(['user']) as any;

  const currentId = user?.id;

  //

  const { data: userClasseInfos, isPending: userClasseInfosPending } = useQuery<any>({
    queryKey: ['userClasseInfos', currentId],

    queryFn: async () => await getUserClasseInfos({ userId: currentId, classeId, subjectId }),
  });

  const { data: marksheet, isPending: isPendingmMarksheet } = useQuery({
    queryKey: ['marksheet', currentId],
    queryFn: async () => getMarksheetByUserId(+classeId, currentId + '', +subjectId),
  });
  //

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

  const examsData = marksheet?.data || [];
  const groupedExams = examsData.reduce((result: any, exam: any) => {
    const term = exam.exam.term;
    if (!result[term]) {
      result[term] = [];
    }
    result[term].push({
      id: exam.id,
      exam_id: exam.exam.id,
      name: exam.exam.name,
      date: exam.exam.create_at.toISOString().split('T')[0],
      marksObtained: exam.mark_obtained,
      coefficient: exam.exam.coefficient,
      totalScore: exam.exam.total_mark,
      overTwnetyMark: exam.mark_obtained * (20 / exam.exam.total_mark),
      range: exam.rank,
      isPublished: exam.is_published,
      user: exam?.user,
      examContent: exam?.exam?.content,
      examCorrection: exam?.exam?.exam_correction,
      status: exam?.status,
    });

    return result;
  }, {});
    const pregressedTrimesters = calculateProgress(groupedExams);

  const isTrimester = classeName?.[0].teacher?.[0]?.term === 'TRIMESTRE';

  const terms = isTrimester
    ? ['trimestre_1', 'trimestre_2', 'trimestre_3']
    : ['semestre_1', 'semestre_2'];

  const trimesters = terms.map((term) => ({
    name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    exams: pregressedTrimesters[term] || [],
  }));

  // const onlyDoneExams = examsData.filter((exam: any) => exam.status === 'done');

  // const averageMark = calculateAverageMark(trimesters);

  if (isPendingmMarksheet) return <Loading />;

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
          {/* <PDFExport pdfName="bulletin">
            <MarkSheetStudent
              data={trimesters}
              meta={{
                estab: estabName?.name,
                subject: subjectName?.name,
                classe: classeNamePending || classeName[0]?.name,
                fullName: user?.name,
                average: userClasseInfos.length && userClasseInfos[0].average,
                range: userClasseInfos.length && userClasseInfos[0].rankInClasse,
                teacherName: TeacherName?.name,
                userClasseInfos,
              }}
            />
          </PDFExport> */}
        </div>
      </nav>
      <div className="flex items-center gap-3 ml-5 ">
        <Image
          src={user?.image || '/defaultUserAvatr.svg'}
          alt=" user avatar"
          width={100}
          height={100}
          className="object-cover rounded-full w-[50px] h-[50px]"
        />
        <div>
          <p className="text-xl text-mainGreen">{user?.name}</p>
          {classeNamePending && <Skeleton className="w-20 h-5 " />}
          {classeName?.length && <p className=" text-gray">{classeName[0]?.name}</p>}
        </div>
      </div>

      <div className="flex overflow-auto gap-9 p-7">
        {trimesters.map((trimester) => (
          <TermCard key={trimester.name} term={trimester} examsData={examsData} />
        ))}
      </div>
      <div className="flex justify-end w-full gap-2 text-white ">
        {userClasseInfosPending ? (
          <Skeleton className="" />
        ) : (
          <>
            {' '}
            <p className="p-2 rounded bg-orangeColor">
              Rang: {userClasseInfos[0]?.rankInClasse || '-'}
            </p>{' '}
            <p className="p-2 rounded bg-mainGreen">
              Moyenne génerale: {userClasseInfos[0]?.average}/20
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Student;
