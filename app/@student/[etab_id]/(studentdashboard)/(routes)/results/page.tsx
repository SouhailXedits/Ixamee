// const fakeResults = [
//     {
//         id: 1,
//         name: 'bac math 2'
//     },
//   {
//     id: 1,
//     name: 'Mathematique',
//     coefficient: 3,
//     icon: '/subjects/formula.svg',

//   },
// ];
'use client';

import { getAllSubjectsByClasseId } from '@/actions/subjects';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import SubjectCard from './components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

function Results() {
  const params = useParams();
  const id = params.etab_id;

  const { data, isPending, error } = useQuery({
    queryKey: ['user-subjects', id],
    queryFn: async () => getAllSubjectsByClasseId(+id),
  });
  console.log(data);

  if (error) return;
  return (
    <div className="flex flex-col gap-6 p-10 ">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Mes résultats</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">Matières</span>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap gap-8 ">
        {isPending && <Skeleton className=" w-[350px] rounded-[20px] h-[200px]" />}
        {data?.map((subject: any) => (
          <SubjectCard key={subject.id} subject={subject} etab_id={id} />
        ))}
      </div>
      {/* <SubjectCard/> */}
    </div>
  );
}

export default Results;
