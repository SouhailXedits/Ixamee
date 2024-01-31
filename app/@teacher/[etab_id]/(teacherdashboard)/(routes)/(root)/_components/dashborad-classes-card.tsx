import Image from 'next/image';
import ClassesCards from './classes-cards';

const DashboardClassesCard = ({classes}:any) => {
  return (
    // <div className="w-full h-[301px]  gap-24  rounded-[20px] border border-[8] gap-14  flex items-center justify-center">
    //   <Image
    //     src="dashboard/classe/noclasseilustrator.svg"
    //     width={264}
    //     height={264}
    //     alt="noclasseilustrator"
    //   />
    //   <div className="flex flex-col gap-8">
    //     <span className=" text-center text-[#1B8392] text-[19px] font-normal ">
    //       Pas de classes créées
    //     </span>
    //     <div className="bg-[#1B8392] text-white flex items-center justify-center p-2 rounded-sm cursor-pointer hover:opacity-80 transition-all duration-150">
    //       Ajouter une classe
    //     </div>
    //   </div>
    // </div>

    <div className="w-full h-[301px] p-3   rounded-[20px] border border-[8] gap-14  flex items-center justify-start">
      <ClassesCards classes={classes} />
    </div>
  );
};

export default DashboardClassesCard;
