'use client';
import Image from 'next/image';
import { TeacherAdminsList } from './_components/TeacherAdminsList';
import { AddTeacher } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/teachers/_components/AddTeacher';
import { useQuery } from '@tanstack/react-query';
import { getAllAdminTeachers } from '@/actions/teachers';
import { useState } from 'react';

const Teacher = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: teachers,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['teachers-admins', searchQuery],
    queryFn: async () => await getAllAdminTeachers(searchQuery),
  });
  // const {
  //   data: seachData,
  //   isPending : isSearchPending,
  // } = useQuery<any>({
  //   queryKey: ['teachers-admins-seach'],
  //   queryFn: async () => await getAllSearchQuery(searchQuery, table),
  // });

  const data = teachers?.data;

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full flex-col sm:flex-row ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Paramètres</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/settings'} className="cursor-pointer">
              Classes
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Admins</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* <SearchModal field="enseignant" table="user"> */}
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche"
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" w-24 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>
          {/* </SearchModal> */}
          <AddTeacher>
            <button
              name="btn"
              className="pl-2 pr-2 text-sm font-semibold leading-tight text-center flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 "
            >
              Ajouter un admin
            </button>
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
