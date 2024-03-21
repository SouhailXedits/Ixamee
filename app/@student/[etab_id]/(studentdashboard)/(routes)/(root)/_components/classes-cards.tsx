import Image from 'next/image';
import SubjectCard from '../../results/components/SubjectCard';
import { Skeleton } from '@/components/ui/skeleton';

type ClassesCardsProps = {
  subjects?: Array<{
    id: string;
    classe_subject: {
      id: string;
    };
  }>;
  isPending: boolean;
};

const ClassesCards = ({ subjects, isPending }: ClassesCardsProps) => {
  return (
    <div className="flex flex-wrap h-full gap-8 ">
      {isPending && <Skeleton key="skeleton" className=" w-[350px] rounded-[20px] h-[200px] " />}
      {subjects?.map((subject) =>
        subject ? (
          <SubjectCard
            key={subject.id}
            subject={subject}
            etab_id={subject.classe_subject.id}
          />
        ) : null
      )}
    </div>
  );
};

export default ClassesCards;
