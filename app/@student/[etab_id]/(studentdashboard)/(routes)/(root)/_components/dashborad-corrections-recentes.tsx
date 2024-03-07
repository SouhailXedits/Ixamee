"use client"
import Image from 'next/image';
import CorrectionsRecentes from './corrections-recentes-item';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecentCorrections } from '@/actions/exam-correction';

const DashboradCorrectionsRecentes = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']) 
  const userId = user?.id
  const { data } = useQuery({
    queryKey: ['corrections-recentes'],
    queryFn: async () => getRecentCorrections(userId),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <Image
            src="dashboard/correctexamp/corectionsRecentes.svg"
            alt="correct"
            width={21}
            height={21}
          />
          <span className=" text-[#727272] text-xl font-semibold ">Corrections récentes</span>
        </div>
        {data && (
          <div className="text-[#1B8392] cursor-pointer text-lg font-medium  underline">
            Voir plus
          </div>
        )}
      </div>

      <CorrectionsRecentes data={data} />
    </div>
  );
};

export default DashboradCorrectionsRecentes;
