'use client';

import Image from 'next/image';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { useParams, useRouter } from 'next/navigation';
import UserExam from '../../../../../../../../../../../../components/shared-components/UserExam';
import TermCard from '@/components/shared-components/TermCard';
import { useQuery } from '@tanstack/react-query';
import { getMarksheetByUserId } from '@/actions/mark-sheets/actions';
import { getUserById } from '@/data/user';
import Loading from '@/app/loading';
import { getNameClasseByClasseId } from '@/actions/classe';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateAverageMark } from '../../../../../../../../../../../_utils/calculateAverage';

// const trimesters = [
//   {
//     name: 'Trimester 1',
//     exams: [
//       {
//         id: 1,
//         name: 'Devoir de Controle N°1 Maths',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//       {
//         id: 2,
//         name: 'Devoir de Controle physique',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//       {
//         id: 3,
//         name: 'Devoir de Controle N°1 Maths',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//       {
//         id: 4,
//         name: 'Devoir de Controle physique',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//     ],
//   },
//   {
//     name: 'Trimester 2',
//     exams: [],
//   },
//   {
//     name: 'Trimester 3',
//     exams: [
//       {
//         id: 1,
//         name: 'Devoir de Controle N°1 Maths',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//       {
//         id: 2,
//         name: 'Devoir de Controle physique',
//         date: '22/03/2023',
//         marksObtained: 15.5,
//         totalScore: 20,
//         rang: 8,
//       },
//     ],
//   },
// ];
const Student = () => {
  const params = useParams();
  const router = useRouter();
  // const currentId = params.bulletin_id;
  function handleGoBack() {
    router.back();
  }
  const classeId = params.classe_id;
  const subjectId = params.subject_id;
  const currentId = params.student_id;

  const { data: user, isPending } = useQuery({
    queryKey: ['user-marksheet', currentId],
    queryFn: async () => await getUserById(currentId + ''),
  });
  console.log(user);

  const { data: marksheet, isPending: isPendingmMarksheet } = useQuery({
    queryKey: ['marksheet', currentId],
    queryFn: async () => getMarksheetByUserId(+classeId, currentId + '', +subjectId),
  });
  console.log(marksheet);

  const { data: classeName, isPending: classeNamePending } = useQuery<any>({
    queryKey: ['classeName', classeId],
    queryFn: async () => await getNameClasseByClasseId(+classeId),
  });
  console.log(classeName);

  const examsData = marksheet?.data || [];
  console.log(examsData);

  const groupedExams = examsData.reduce((result: any, exam: any) => {
    console.log(exam);
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
    });
    return result;
  }, {});
  console.log(groupedExams);

  const terms = ['trimestre_1', 'trimestre_2', 'trimestre_3'];

  const trimesters = terms.map((term) => ({
    name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()), // Formatting term name
    exams: groupedExams[term] || [], // Check and add empty array if term has no exams
  }));

  const averageMark = calculateAverageMark(trimesters);

  console.log('Average Mark:', averageMark);
  console.log(trimesters);
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
          {/* <ImportUneClasse>
            <div className=" justify-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
              <Image src="/download-icon.svg" alt="download icon" width={20} height={20} />
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Télécharger en pdf
              </div>
            </div>
          </ImportUneClasse> */}
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
      <div className=" flex gap-3 items-center ml-5">
        <Image
          src={user?.image || '/userAvatar/user1.svg'}
          alt=" user avatar"
          height={50}
          width={50}
        />
        <div>
          <p className=" text-mainGreen text-xl">{user?.name}</p>
          {classeNamePending && <Skeleton className=" h-5 w-20" />}
          {classeName?.length && <p className=" text-gray">{classeName[0]?.name}</p>}
        </div>
      </div>

      <div className="flex overflow-auto gap-9 p-7">
        {trimesters.map((trimester) => (
          <TermCard term={trimester} />
        ))}
      </div>
      <div className=" flex w-full justify-end gap-2 text-white">
        <p className=" p-2 bg-orangeColor rounded">Rang: -</p>
        <p className=" p-2 bg-mainGreen rounded">Moyenne génerale: {averageMark}/20</p>
      </div>
    </main>
  );
};

export default Student;
