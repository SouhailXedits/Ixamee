'use client';
import Image from 'next/image';
import { AddEstab } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/settings/establishements/_components/AddEstabModal';
import { getAllEstabs } from '@/actions/establishements';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchModal } from '@/components/modals/SearchModal';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const ArchiveLayout = ({children}: {children: React.ReactNode}) => {
  const params = useParams()
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string>()
  const currEtabId = params.etab_id
  // const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  // console.log(currentPage);
  // const handleImportedData = (jsonData: any) => {
  //   // Handle the imported data in the external page
  //   console.log(jsonData);
  // };
  // const {
  //   data: estabs,
  //   error,
  //   isPending,
  // } = useQuery<any>({
  //   queryKey: ['estabs', currentPage],
  //   queryFn: async () => await getAllEstabs(currentPage),
  // });
  // const data = estabs?.data.estabs || [];
  // const totalCount = estabs?.data.totalCount;

  function handleChangeTab(value: string) {
    setCurrentTab(value)
    router.push(`/${currEtabId}/archive/${value}`)
  }

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Archive</div>
          <div className="flex items-center text-[#727272]">
            {/* <Image src="/arrowleft.svg" alt="icons" width={20} height={20} /> */}

            {/* <Link href={'/settings'} className="cursor-pointer">
              Classes
            </Link> */}
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Archive</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <SearchModal field="etablissements" table="establishment">
            <button className="flex items-center p-2 border rounded-lg cursor-pointer border-[#99C6D3] gap-3 hover:opacity-80 ">
              <Image src="/scoop.svg" alt="icons" width={20} height={20} />

              <p className=" text-mainGreen/50 w-24 bg-transparent outline-none border-none  text-sm font-semibold  leading-tight placeholder-[#99C6D3]">
                Recherche
              </p>
            </button>
          </SearchModal>
        </div>
      </nav>

      <div className=" border-b border-mainGreen/50 w-fit">
        <button
          className={cn(
            ' px-2 text-mainGreen/50',
            currentTab === 'classes' && 'border-b border-mainGreen text-mainGreen'
          )}
          onClick={() => handleChangeTab('classes')}
        >
          {' '}
          Classes
        </button>
        <button
          className={cn(
            ' px-2 text-mainGreen/50',
            currentTab === 'exams' && 'border-b border-mainGreen text-mainGreen'
          )}
          onClick={() => handleChangeTab('exams')}
        >
          {' '}
          Examens
        </button>
      </div>
      <div>{children}</div>
    </main>
  );
};

export default ArchiveLayout;
