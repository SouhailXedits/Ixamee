import Image from 'next/image';
import SubjectCard from '../../results/components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';

const ClassesCards = ({ subjects, isPending }: any) => {
  return (
    <div className="grid w-full gap-4 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
      {isPending && <Skeleton className=" w-[350px] rounded-[20px] h-[200px] " />}
      {subjects?.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} etab_id={subject.classe_subject.id} />
      ))}
    </div>
  );
};

export default ClassesCards;
