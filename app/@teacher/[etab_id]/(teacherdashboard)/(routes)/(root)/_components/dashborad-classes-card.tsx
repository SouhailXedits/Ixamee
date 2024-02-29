import ClassesCards from './classes-cards';
import Rien from '@/app/@student/[etab_id]/(studentdashboard)/(routes)/(root)/_components/Rien';

const DashboardClassesCard = ({ classes, isPending, etabId }: any) => {
  return (
    <div className="w-full">
      {classes && !classes.length ? (
        <div className="flex items-center justify-center w-full h-full border rounded-xl p-9">
          <Rien
            image="/dashboard/laptop.svg"
            className="flex justify-center gap-6"
            message="Pas de matières pour le moment"
          />
        </div>
      ) : (
        <div className="w-full p-4 rounded-[20px] border border-[8] gap-14  ">
          <ClassesCards classes={classes} isPending={isPending} etabId={etabId} />
        </div>
      )}
    </div>
  );
};

export default DashboardClassesCard;
