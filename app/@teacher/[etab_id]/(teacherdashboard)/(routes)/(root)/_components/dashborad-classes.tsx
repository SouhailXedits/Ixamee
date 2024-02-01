import Image from 'next/image';
import DashboardClassesCard from './dashborad-classes-card';
import Link from 'next/link';

const DashboradClasses = ({ classe, classeCount, isPending, etabId }: any) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className=" flex gap-4 items-center">
          <Image alt="state img" src="dashboard/classe/classe.svg" width={22} height={22} />

          <span className=" text-[#727272] text-xl font-semibold  ">Classes</span>
        </div>
        <span
          className="text-[#1B8392] text-lg font-[500] 
      underline cursor-pointer"
        >
          <Link href={`/${etabId}/classes`}>
            Voir plus ({isPending ? 0 : classeCount > 3 ? classeCount - 3 : 0})
          </Link>
        </span>
      </div>

      <DashboardClassesCard classes={classe} isPending={isPending} etabId={etabId} />
    </div>
  );
};

export default DashboradClasses;
