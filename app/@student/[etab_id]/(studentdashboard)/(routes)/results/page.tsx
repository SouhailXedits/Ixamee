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
'use client'

import { getAllSubjectsByClasseId } from "@/actions/classe";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SubjectCard from "./components/SubjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

function Results() {
    const params = useParams()
    const id = params.etab_id
    console.log(id)
    const { data,  isPending, error } = useQuery({
      queryKey: ['user-subjects', id],
      queryFn: async () => getAllSubjectsByClasseId(+id),
    });
    console.log(data)
    if(isPending) return <Skeleton className=" h-[200px] w-[400px]"/>
    if(error) return;
    return (
      <div className=" p-10 flex flex-col gap-6">
        <nav className="flex justify-between w-full ">
          <div className="flex flex-col gap-4">
            <div className="text-[#1B8392] text-2xl font-semibold ">Mes résultats</div>
            <div className="flex items-center text-[#727272]">
              <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

              <span className="cursor-pointer">Matières</span>
            </div>
          </div>
        </nav>
        <div className=" flex flex-wrap gap-8">
          {data?.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
        {/* <SubjectCard/> */}
      </div>
    );
}

export default Results;
