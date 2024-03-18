import SubjectCard from '../../results/components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';

const ClassesCards = ({ subjects, isPending }: any) => {
  return (
    <div className="grid w-full gap-10 xl:grid-cols-2 lg:grid-cols-1 ">
      {isPending && <Skeleton className=" w-[350px] rounded-[20px] h-[200px] " />}
      {subjects?.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} etab_id={subject.classe_subject.id} />
      ))}
    </div>
  );
};

export default ClassesCards;
