'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getClasseById, getUserById } from '@/actions/classe';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import StudentDetails from './_components/studentDetails';

export default function Page() {
  const params = useParams();

  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['classe'],
    queryFn: async () => await getClasseById(+params?.classesId),
  });

  const { data: student, isPending: isPendingStudent } = useQuery({
    queryKey: ['student'],
    queryFn: async () => await getUserById(params?.user_id as string),
  });

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          {classe?.name ? (
            <div className="text-[#1B8392] text-2xl font-semibold ">{classe?.name}</div>
          ) : (
            <Skeleton className="w-[90px] h-[40px]" />
          )}

          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <Link href={`${params?.etab_id}/classes`} className="cursor-pointer">
              Classes
            </Link>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            {student?.name ? (
              <span className="cursor-pointer">{classe?.name}</span>
            ) : (
              <Skeleton className="w-[90px] h-[20px]" />
            )}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            {student?.name ? (
              <span className="cursor-pointer">{student?.name}</span>
            ) : (
              <Skeleton className="w-[90px] h-[20px]" />
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* )} */}
          {/* importer */}
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#1B8392] text-[#1B8392] bg-white gap-3 hover:opacity-80 ">
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Afficher bulletin
            </div>
          </div>
          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Inviter l’étudiant
            </div>
          </div>
        </div>
      </nav>

      <div>
        {/* <StudentList data={data} isPending={isPending} /> */}
        <StudentDetails student={student} classe={classe} />
      </div>
    </main>
  );
}
