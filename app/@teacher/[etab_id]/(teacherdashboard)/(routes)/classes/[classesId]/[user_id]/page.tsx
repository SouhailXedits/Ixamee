'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { getClasseById } from '@/actions/classe';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserById } from '@/data/user';
export default function page() {
  const params = useParams();
  console.log(params);

  const { data: classe, isPending: isPendingClasse } = useQuery({
    queryKey: ['classe'],
    queryFn: async () => await getClasseById(+params?.classesId),
  });

  const { data: student, isPending: isPendingStudent } = useQuery({
    queryKey: ['student'],
    queryFn: async () => await getUserById(params?.user_id),
  });
  console.log(student);

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

            <Link href={'/classes'} className="cursor-pointer">
              Classes
            </Link>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">{classe?.name}</span>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">{classe?.name}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <Select>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" justify-center p-2  rounded-lg cursor-pointer bg-[#1B8392] text-white gap-1 hover:opacity-80 flex items-center">
                <Image src="/telechargeIcon.svg" alt="icons" width={20} height={20} />
                <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                  Télécharger
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer ">Fichier PDF</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer ">Fichier CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* )} */}
          {/* importer */}

          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
              Ajouter un étudiant
            </div>
          </div>
        </div>
      </nav>

      <div>{/* <StudentList data={data} isPending={isPending} /> */}</div>
    </main>
  );
}
