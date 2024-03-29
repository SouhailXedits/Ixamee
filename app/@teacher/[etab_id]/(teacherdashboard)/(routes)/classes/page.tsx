'use client';
import Image from 'next/image';
import ClasseCardContainer from './_components/classe-card-container';
import { AjouterUneClasse } from '@/components/modals/ajouter-une-classe';
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClasse } from '@/actions/classe';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { getMe } from '@/actions/examens';
import Pagination from '@/components/shared-components/Pagination';

export default function Classes() {
  const params = useParams();
  const etab_id = +params.etab_id;
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();

  // const { data: user, isPending: userISPending } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => await getMe(),
  //   retry: true,
  // });
  // const etab_id = (queryClient.getQueryData(['etab_id']) as number) || params.etab_id as number;
  const user = queryClient.getQueryData(['user']) as any;

  const user_id = user?.id as string;

  const { data, isPending } = useQuery({
    queryKey: ['classe', etab_id],
    queryFn: async () => await getAllClasse({ user_id, etab_id }),
    retry: true,
  });

  const filteredData = data?.data?.filter((classe: any) => {
    const classes = classe.name.toLowerCase();
    return classes.includes(value.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.ceil(filteredData?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  return (
    <main className="flex flex-col h-full gap-6 p-10">
      <nav className="flex justify-between w-full max-md:flex-col">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold text-[#1B8392] ">Classes</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Classes</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 cursor-pointer max-md:flex-wrap h-14">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#1B8392] max-md:w-full p-2 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche"
              className=" text-2 w-24 border-none bg-transparent  text-sm font-semibold  leading-tight placeholder-[#1B8392] outline-none"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </div>
          <AjouterUneClasse user_id={user?.id} estab={etab_id}>
            <Button className="flex cursor-pointer items-center gap-3 rounded-lg border max-md:w-full bg-[#1B8392] p-2 text-white ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter une classe
              </div>
            </Button>
          </AjouterUneClasse>
        </div>
      </nav>

      <div className="flex flex-col justify-between h-full gap-6 pb-10 max-md:pt-10">
        <ClasseCardContainer
          data={paginatedData}
          user_id={user?.id}
          estab={etab_id}
          // class_id ={}
          isPending={isPending}
        />
        <div className="pb-8 ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
