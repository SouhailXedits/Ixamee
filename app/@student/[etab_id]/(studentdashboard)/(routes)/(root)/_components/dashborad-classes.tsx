import Image from 'next/image';
import DashboardClassesCard from './dashborad-classes-card';

const DashboradClasses = () => {
  



  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className=" flex gap-4 items-center">
          <Image alt="state img" src="dashboard/classe/classe.svg" width={22} height={22} />

          <span className=" text-[#727272] text-xl font-semibold  ">Mes matières</span>
        </div>
        <span
          className="text-[#1B8392] text-lg font-[500] 
      underline cursor-pointer"
        >
          Voir plus (0)
        </span>
      </div>

      <DashboardClassesCard />
    </div>
  );
};

export default DashboradClasses;
