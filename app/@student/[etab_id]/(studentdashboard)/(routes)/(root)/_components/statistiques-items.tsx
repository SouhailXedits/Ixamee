'use client';
import { useEffect, useMemo, useState } from 'react';
import PieChartItem from './pie-chartItem';
import { transformData } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/(root)/_components/transformStatus';
import { Skeleton } from '@/components/ui/skeleton';
import Rien from './Rien';
import Loading from '@/app/loading';

interface InputItem {
  status: string;
  user_id: string;
}

interface OutputItem {
  status: string;
  studentNumber: number;
  color: string;
}

interface StatistiquesItemsProps {
  marksObtained: any;
  SubjectsPending: boolean;
}

// ... (imports remain the same)

const StatistiquesItems: React.FC<StatistiquesItemsProps> = ({
  marksObtained,
  SubjectsPending,
}) => {
  const totalExams =
    marksObtained &&
    Object?.values(marksObtained)?.reduce(
      (acc: number, currentValue: any) => acc + currentValue,
      0
    );

  const transformedData = useMemo(
    () => marksObtained && transformData(marksObtained),
    [marksObtained]
  );

  const [animatedCount, setAnimatedCount] = useState<number>(totalExams);

  useEffect(() => {
    if (SubjectsPending || totalExams === undefined) return;

    let startCount = 0;
    const interval = setInterval(() => {
      startCount += 1;
      if (startCount <= totalExams) {
        setAnimatedCount(startCount);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [totalExams, SubjectsPending]);

  const finalCount = animatedCount;

  // const defaultItems = useMemo(
  //   () => [
  //     { color: '#D0D5DD', firstMessage: 'Entre 0 - 30%', studentNumber: 0 },
  //     { color: '#D0D5DD', firstMessage: 'Entre 30 - 60%', studentNumber: 0 },
  //     { color: '#D0D5DD', firstMessage: 'Entre 60 - 80%', studentNumber: 0 },
  //     { color: '#D0D5DD', firstMessage: 'Plus de 80%', studentNumber: 0 },
  //   ],
  //   []
  // );

  const items = useMemo(
    () =>
      (!SubjectsPending &&
        transformedData?.map((item: any) => ({
          color: item.color,
          firstMessage: item.status,
          numExams: item.numExams,
        }))) ||
      [],
    [transformedData, finalCount]
  );

  const series = useMemo(
    () => transformedData?.map((item: any) => item.numExams) || [100],
    [transformedData]
  );
  const colors = useMemo(() => transformedData?.map((item: any) => item.color), [transformedData]);

  return (
    <div className="flex items-center justify-center w-full pt-4 pb-4 border rounded-xl max-2xl:flex-wrap max-2xl:gap-4  h-[205px]  max-2xl:h-[400px]  overflow-y-scroll">
      {!SubjectsPending && transformedData?.length ? (
        <>
          <PieChartItem series={series} colors={colors} numberOfStudent={finalCount || '-'} />
          <div className="flex min-w-[600px]">
            {!SubjectsPending && transformedData?.length
              ? items.map((item: OutputItem | any) => (
                  <div key={item.color} className="flex gap-2 pl-6">
                    <div
                      className={`w-[5.08px] h-full rounded-[126.89px]  `}
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex flex-col gap-1 pl-4">
                      <span className="text-[#727272]">{item.firstMessage}</span>
                      <span className="text-10 font-[500] leading-9">
                        {item.numExams} Examen(s)
                      </span>
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-16">
          <Skeleton className="h-36 w-36 rounded-full" />
          <div className="flex gap-4 items-center">
            {[0, 0, 0, 0].map(() => {
              return (
                <div className="flex gap-2 items-center">
                  <Skeleton className="w-2 h-16 rounded-[126.89px]" />
                  <div className="flex flex-col gap-4 pl-4">
                    <Skeleton className="h-4 w-20 " />
                    <Skeleton className="h-4 w-16 " />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatistiquesItems;
