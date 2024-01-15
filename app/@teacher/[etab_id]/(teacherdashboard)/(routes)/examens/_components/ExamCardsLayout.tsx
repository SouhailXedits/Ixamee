'use client';

import ExamCards from './ExamCards';
import { Skeleton } from '@/components/ui/skeleton';

function ExamCardsLayout({ isPending, data }: any) {


  return (
    <div className="flex flex-wrap items-center gap-5 rounded-2xl">
      {isPending
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-[333px] h-[190px] rounded-2xl" />
          ))
        : data?.map((exam) => <ExamCards key={exam.id} exam={exam} />)}
    </div>
  );
}

export default ExamCardsLayout;
