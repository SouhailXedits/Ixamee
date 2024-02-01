'use client';
import Image from 'next/image';
import ClasseCardContainer from './_components/classe-card-container';
import { AjouterUneClasse } from '@/components/modals/ajouter-une-classe';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClasse } from '@/actions/classe';

export default function Classes() {
  const queryClient = useQueryClient();
  const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const user = queryClient.getQueryData(['user']) as any;

  const { data, isPending } = useQuery({
    queryKey: ['classe', etab_id],
    queryFn: async () => await getAllClasse({ user_id: user?.id, etab_id }),
  });

  // to DO Scelton

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Classes</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Classes</span>
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
          <AjouterUneClasse user_id={user?.id} estab={etab_id}>
            <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              <div className="pl-2 pr-2 text-sm font-semibold leading-tight text-center ">
                Ajouter une classe
              </div>
            </div>
          </AjouterUneClasse>
        </div>
      </nav>

      <div>
        <ClasseCardContainer data={data} isPending={isPending} />
      </div>
    </main>
  );
}
