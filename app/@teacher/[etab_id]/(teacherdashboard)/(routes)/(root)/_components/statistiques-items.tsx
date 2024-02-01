'use client';
import { useEffect, useState } from 'react';
import PieChartItem from './pie-chartItem';

const StatistiquesItems = ({
  allStudentCount,
  studentCountPending,
}: {
  allStudentCount: number;
  studentCountPending: boolean;
}) => {
  console.log('🚀 ~ allStudentCount:', allStudentCount);
  const [animatedCount, setAnimatedCount] = useState<number>(allStudentCount);
  useEffect(() => {
    if (studentCountPending || allStudentCount === undefined) return;
    let startCount = 0;
    const interval = setInterval(() => {
      startCount += 1;
      if (startCount <= allStudentCount) {
        setAnimatedCount(startCount);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [allStudentCount, studentCountPending]);
  let finalCount = animatedCount;
  const items = [
    {
      color: finalCount || finalCount > 0 ? `#F04438` : '#D0D5DD',
      firstMessage: 'Non corrigées',
      studentNumber: 0,
    },
    // {
    //   color: finalCount || finalCount > 0 ? `#1B8392` : '#D0D5DD',
    //   firstMessage: 'Entre 30 - 60%',
    //   studentNumber: 0,
    // },
    {
      color: finalCount || finalCount > 0 ? `#F69D16` : '#D0D5DD',
      firstMessage: 'En cours de corrections',
      studentNumber: 0,
    },
    {
      color: finalCount || finalCount > 0 ? `#12b76a` : '#D0D5DD',
      firstMessage: 'Corrigées',
      studentNumber: 0,
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pt-4 pb-4 border rounded-xl max-2xl:flex-wrap max-2xl:gap-4  h-[205px] ">
      <PieChartItem
        series={[11, 16, 13]}
        // series={[100]}
        colors={
          finalCount || finalCount > 0 ? ['#F04438', '#F69D16', '#12b76a'] : ['#D9D9D9']
        }
        numberOfStudent={finalCount || '-'}
      />
      {/* PieChartItem */}
      <div className="flex  ">
        {items.map((item) => {
          return (
            <div key={item.color} className="flex  gap-2 pl-6">
              <div
                className={`w-[5.08px] h-full rounded-[126.89px]  `}
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col gap-1 pl-4">
                <span className=" text-[#727272]">{item.firstMessage}</span>
                <span className=" text-10 font-[500] leading-9">
                  {item.studentNumber} étudiants{' '}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatistiquesItems;
