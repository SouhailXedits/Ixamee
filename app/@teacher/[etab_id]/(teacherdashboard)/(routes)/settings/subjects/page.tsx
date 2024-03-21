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
import { SubjectsList } from './_components/SubjectsList';
import { ImportUneClasse } from '@/components/modals/importer-une-classe';
import { AjouterUnEtudiant } from '@/components/modals/ajouter-un-etudiant';
import { AddEstab } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/_components/AddEstabModal';
import { AddSubject } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/subjects/_components/AddSubject';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllSubjectsByPage } from '@/actions/subjects';

const Establishement = ({ params }: { params: { classesId: string } }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  //  const handleImportedData = (jsonData: any) => {
  //    // Handle the imported data in the external page
  //
  //  };
  const {
    data: subjects,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['subjects', currentPage, searchQuery],
    queryFn: async () => await getAllSubjectsByPage(currentPage, 10, searchQuery),
  });

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);

  const data = subjects?.data?.estabs || [];
  const totalCount = subjects?.data?.totalCount;


  // const { classesId } = params;
  // const handleImportedData = (jsonData: any) => {
  //   // Handle the imported data in the external page
  //
  // };

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full flex-col sm:flex-row">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Paramètres</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/settings'} className="cursor-pointer">
              Classes
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Matières</span>
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
          <AddSubject>
            <button
              name="btn"
              className="pl-2 pr-2 text-sm font-semibold leading-tight text-center flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 "
            >
              Ajouter une Matières
            </button>
          </AddSubject>
        </div>
      </nav>

      <div>
        <SubjectsList
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
