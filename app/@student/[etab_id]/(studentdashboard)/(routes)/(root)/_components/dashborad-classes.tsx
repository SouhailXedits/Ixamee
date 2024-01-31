import Image from 'next/image';
import ClassesCards from './classes-cards';
import Link from 'next/link';
import Rien from './Rien';
import { QueryClient } from '@tanstack/react-query';

const DashboradClasses = ({ subjects, isPending, allSubjectsCount, classId }: any) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className=" flex gap-4 items-center">
          <Image alt="state img" src="dashboard/classe/classe.svg" width={22} height={22} />

          <span className=" text-[#727272] text-xl font-semibold  ">Mes matières</span>
        </div>
        <span className="text-[#1B8392] text-lg font-[500] underline cursor-pointer">
          <Link href={`/${classId}/results`}>
            Voir plus ({isPending ? 0 : allSubjectsCount > 2 ? allSubjectsCount - 2 : 0})
          </Link>
        </span>
      </div>
      {subjects && !subjects.length ? (
        <div className="w-full border h-full rounded-xl flex items-center justify-center p-5">
          <Rien
            image="/dashboard/laptop.svg"
            className="flex gap-6 justify-center"
            message="Pas de matières pour le moment"
          />
        </div>
      ) : (
        <ClassesCards subjects={subjects} isPending={isPending} />
      )}
    </div>
  );
};

export default DashboradClasses;
