'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { TeacherAdminsList } from './_components/TeacherAdminsList';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { AddTeacher } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/teachers/_components/AddTeacher';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllAdminTeachers } from '@/actions/teachers';

const Teacher = ({ params }: { params: { classesId: string } }) => {



  const handleImportedData = (jsonData: any) => {
    // Handle the imported data in the external page
    console.log(jsonData);
  };
  const {
    data: teachers,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['teachers-admins'],
    queryFn: async () => await getAllAdminTeachers(),
  });
  console.log(teachers);
  const data = teachers?.data

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Paramètres</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/settings'} className="cursor-pointer">
              Classes
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Enseignants</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche"
              className=" w-24 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>
          <AddTeacher>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter un admin
              </div>
            </div>
          </AddTeacher>
        </div>
      </nav>

      <div>
        <TeacherAdminsList data={data} isPending={isPending} />
      </div>
    </main>
  );
};

export default Teacher;
