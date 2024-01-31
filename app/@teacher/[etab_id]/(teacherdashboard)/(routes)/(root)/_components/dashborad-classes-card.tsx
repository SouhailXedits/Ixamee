import Image from 'next/image';
import ClassesCards from './classes-cards';
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';

const DashboardClassesCard = ({ classes, isPending, etabId }: any) => {
  return (
    <div className="w-full">
      {classes && !classes.length ? (
        <div className="w-full border h-full rounded-xl flex items-center justify-center p-9">
          <Rien
            image="/dashboard/laptop.svg"
            className="flex gap-6 justify-center"
            message="Pas de matières pour le moment"
          />
        </div>
      ) : (
        <div className="w-full p-3 rounded-[20px] border border-[8] gap-14 flex items-center justify-start">
          <ClassesCards classes={classes} isPending={isPending} etabId={etabId} />
        </div>
      )}
    </div>
  );
};

export default DashboardClassesCard;
