'use client';
import TermCard from '@/components/shared-components/TermCard';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const trimesters = [
  {
    name: 'Trimester 1',
    exams: [
      {
        id: 1,
        name: 'Devoir de Controle N°1 Maths',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
      {
        id: 2,
        name: 'Devoir de Controle physique',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
      {
        id: 3,
        name: 'Devoir de Controle N°1 Maths',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
      {
        id: 4,
        name: 'Devoir de Controle physique',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
    ],
  },
  {
    name: 'Trimester 2',
    exams: [],
  },
  {
    name: 'Trimester 3',
    exams: [
      {
        id: 1,
        name: 'Devoir de Controle N°1 Maths',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
      {
        id: 2,
        name: 'Devoir de Controle physique',
        date: '22/03/2023',
        marksObtained: 15.5,
        totalScore: 20,
        rang: 8,
      },
    ],
  },
];
function SubjectLayout() {
  const params = useParams();
  const router = useRouter();
  function handleGoBack() {
    router.back();
  }
  return (
    <main className="flex flex-col gap-12 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mes résultats</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            <button name='btn' className="cursor-pointer" onClick={handleGoBack}>
              Mes résultats
            </button>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Mathématiques</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* importer */}
          <div className=" justify-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
            <Image src="/download-icon.svg" alt="download icon" width={20} height={20} />
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Télécharger en pdf
            </div>
          </div>


        </div>
      </nav>

      <div className="flex overflow-auto gap-9 p-7">
        {trimesters.map(trimester => <TermCard term={trimester} /> )}
  
      </div>
      <div className=" flex w-full justify-end gap-2 text-white">
        <p className=" p-2 bg-orangeColor rounded">Rang: 4</p>
        <p className=" p-2 bg-mainGreen rounded">Moyenne génerale: 15/40</p>
      </div>
    </main>
  );
}

export default SubjectLayout;
