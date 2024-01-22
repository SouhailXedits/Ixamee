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

import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { useParams, useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
import UserExam from './components/UserExam';

const userExams = [
  {
    id: 1,
    name: 'Examen 1',
    date: '22/03/2023',
    marksObtained: 15.5,
    totalScore: 20,
    rang: 8,
  },
  {
    id: 2,
    name: 'Examen 1',
    date: '22/03/2023',
    marksObtained: 15.5,
    totalScore: 20,
    rang: 8,
  },
  {
    id: 3,
    name: 'Examen 1',
    date: '22/03/2023',
    marksObtained: 15.5,
    totalScore: 20,
    rang: 8,
  },
];
const Student = () => {
  const params = useParams();
  const router = useRouter();
  const currentId = params.bulletin_id;
  function handleGoBack() {
    router.back();
  }
  return (
    <main className="flex flex-col gap-12 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            <button className="cursor-pointer" onClick={handleGoBack}>
              Bulletins
            </button>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">{currentId}</span>
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
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche un étudiant"
              className=" w-40 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>

          {/* <AjouterUnEtudiant>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un étudiant
              </div>
            </div>
          </AjouterUnEtudiant> */}
        </div>
      </nav>
      <div className=" flex gap-3 items-center ml-5">
        <Image src="/userAvatar/user1.svg" alt=" user avatar" height={50} width={50} />
        <div>
          <p className=" text-mainGreen text-xl">Firas Latrach</p>
          <p className=" text-gray">Bac math 2</p>
        </div>
      </div>

      <div className="flex overflow-auto gap-9 p-7">
        <div className=" flex flex-col gap-6 shadow-lg rounded p-4">
          <div className=" bg-mainGreen/35 p-2 rounded">Trimester 1</div>
          <div className=" flex flex-col gap-10">
            {userExams.map((exam) => (
              <UserExam key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" bg-mainGreen/35 p-2 rounded">Trimester 1</div>
          <div className=" flex flex-col gap-10">
            {userExams.map((exam) => (
              <UserExam key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
        <div className=" flex flex-col gap-6">
          <div className=" bg-mainGreen/35 p-2 rounded">Trimester 1</div>
          <div className=" flex flex-col gap-10">
            {userExams.map((exam) => (
              <UserExam key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </div>
      <div className=" flex w-full justify-end gap-2 text-white">
        <p className=" p-2 bg-orangeColor rounded">Rang: 4</p>
        <p className=" p-2 bg-mainGreen rounded">Moyenne génerale: 15/40</p>
      </div>
    </main>
  );
};

export default Student;
