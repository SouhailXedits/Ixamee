import Image from 'next/image';
import React from 'react';
import CreateExam from './_components/create-exam';
// import { Editor } from './_components/toolbar-editor';
// import CreateExam from './_components/create-exam';
export default function page({ params }: { params: { examenId: string } }) {
  const { examenId } = params;

  return (
    <div className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Devoir de contrôle N°2 </div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Examens</span>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">3ème Maths_1, 3ème Maths_2, 3ème Maths_3</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche"
              className=" w-24 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#1B8392]"
            />
          </div>

          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Créer un examen
            </div>
          </div>
        </div>
      </nav>
      {/* <CreateExam /> */}
    </div>
  );
}
