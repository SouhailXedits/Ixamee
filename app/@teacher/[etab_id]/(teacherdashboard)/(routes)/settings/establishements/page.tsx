'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EstablishementsList } from './_components/EstablishementsList';
import { AddEstab } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/_components/AddEstabModal';
import { getAllEstabs } from '@/actions/establishements';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchModal } from '@/components/modals/SearchModal';

const Establishement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  console.log(currentPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const {
    data: estabs,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['estabs', currentPage, searchQuery],
    queryFn: async () => await getAllEstabs(currentPage, 10, searchQuery),
  });
  const data = estabs?.data.estabs || [];
  const totalCount = estabs?.data.totalCount;
  console.log(totalCount);
  console.log(data);

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

            <span className="cursor-pointer">Établissements</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
            <Image src="/scoop.svg" alt="icons" width={20} height={20} />

            <input
              type="text"
              placeholder="Recherche"
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" w-24 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]"
            />
          </div>
          <AddEstab>
            <button className="pl-2 pr-2 text-sm font-semibold leading-tight text-center flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
              Ajouter une établissements
            </button>
          </AddEstab>
        </div>
      </nav>

      <div>
        <EstablishementsList
          data={data}
          isPending={isPending}
          onPageChange={handlePageChange}
          currentpage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </main>
  );
};

export default Establishement;
