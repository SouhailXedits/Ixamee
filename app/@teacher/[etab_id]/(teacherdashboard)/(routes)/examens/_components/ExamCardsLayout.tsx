'use client';

import ExamCards from './ExamCards';
import { Skeleton } from '@/components/ui/skeleton';

function ExamCardsLayout({ isPending, data }: any) {
  const exams = data.sort((a: any, b: any) => {
    if (a.term < b.term) return -1;
    if (a.term > b.term) return 1;
    return 0;
  });
  return (
    <div className="grid w-full gap-4 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
      {isPending
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-[333px] h-[190px] rounded-2xl" />
          ))
        : exams?.map((exam: any) => <ExamCards key={exam.id} exam={exam} />)}
    </div>
  );
}

export default ExamCardsLayout;
