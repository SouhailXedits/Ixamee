'use client';
import Image from 'next/image';
import CorrectionsRecentes from './corrections-recentes-item';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecentCorrections } from '@/actions/exam-correction';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const DashboradCorrectionsRecentes = ({
  classId,
  subjects,
}: {
  classId: string;
  subjects: any;
}) => {
  const [subId, setSubId] = useState<any>();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const userId = user?.id;

  const { data, isPending, error } = useQuery({
    queryKey: ['corrections-recentes', userId, subId, classId],
    queryFn: async () => getRecentCorrections(3, userId, Number(subId), Number(classId)),
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
        {!isPending && (
          <div className="text-[#1B8392] cursor-pointer text-lg font-medium  underline">
            <Link href={`/${classId}/results`}>Voir plus</Link>
          </div>
        )}
      </div>
      <div className="flex items-end justify-end w-full gap-3 max-md:w-full">
        <Select
          onValueChange={async (value) => {
            setSubId(value);
          }}
          disabled={!subjects?.length}
        >
          <SelectTrigger className="flex items-center p-2 px-1 border w-1/3 rounded-lg cursor-pointer text-[#1B8392] border-[#99C6D3] hover:opacity-80 max-md:w-full">
            <SelectValue placeholder={'Toutes les matiéres'} />
          </SelectTrigger>
          <SelectContent>
            {subjects?.length > 0 &&
              subjects?.map((subject: any) => (
                <SelectItem key={subject?.id} value={subject?.id} className="">
                  {subject?.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <CorrectionsRecentes data={data} isPending={isPending} />
    </div>
  );
};

export default DashboradCorrectionsRecentes;
