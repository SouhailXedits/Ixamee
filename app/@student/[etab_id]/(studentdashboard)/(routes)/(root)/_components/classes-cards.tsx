import Image from 'next/image';
import SubjectCard from '../../results/components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';

const ClassesCards = ({ subjects, isPending }: any) => {
  return (
    <div className="flex flex-wrap h-full gap-8 ">
      {isPending && <Skeleton className=" w-[350px] rounded-[20px] h-[200px] " />}
      {subjects?.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} etab_id={subject.classe_subject.id} />
      ))}
    </div>
  );
};

export default ClassesCards;
