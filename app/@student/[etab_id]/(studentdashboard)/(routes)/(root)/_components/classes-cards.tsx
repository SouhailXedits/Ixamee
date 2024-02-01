import { Skeleton } from 'antd';
import Image from 'next/image';
import SubjectCard from '../../results/components/SubjectCard';

const ClassesCards = ({ subjects, isPending }: any) => {
  
  return (
    <div className=" flex flex-wrap gap-8 h-full">
      {isPending && <Skeleton className=" w-[350px] rounded-[20px] h-[200px] " />}
      {subjects?.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} etab_id={subject.classe_subject.id} />
      ))}
    </div>
  );
};

export default ClassesCards;
