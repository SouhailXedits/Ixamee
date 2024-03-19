import SubjectCard from '../../results/components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';

const ClassesCards = ({ subjects, isPending }: any) => {
  return (
    <>
      {isPending && (
        <div className="grid w-full gap-10 xl:grid-cols-2 lg:grid-cols-1">
          <Skeleton className=" justify-between h-[180px] py-[15px] rounded-[20px] flex flex-col gap-4 inline-fle p-5 pb-48 overflow-hidden max-lg:w-full " />
          <Skeleton className=" justify-between h-[180px] py-[15px] rounded-[20px] flex flex-col gap-4 inline-fle p-5 pb-48 overflow-hidden max-lg:w-full " />
        </div>
      )}
      <div className="grid w-full gap-10 xl:grid-cols-2 lg:grid-cols-1 ">
        {subjects?.map((subject: any) => (
          <SubjectCard key={subject.id} subject={subject} etab_id={subject.classe_subject.id} />
        ))}
      </div>
    </>
  );
};

export default ClassesCards;
