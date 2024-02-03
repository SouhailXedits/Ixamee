'use client';
import { useEffect, useMemo, useState } from 'react';
import PieChartItem from './pie-chartItem';
import { transformData } from './transformStatus';

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
  classeExam: any;
  userCorrection: InputItem[];
  allStudentCount: number;
  studentCountPending: boolean;
}

// ... (imports remain the same)

const StatistiquesItems: React.FC<StatistiquesItemsProps> = ({
  classeExam,
  userCorrection,
  allStudentCount,
  studentCountPending,
}) => {
  const transformedData = useMemo(
    () => userCorrection && transformData(userCorrection, allStudentCount),
    [userCorrection, allStudentCount]
  );

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

  const finalCount = animatedCount;

  const defaultItems = useMemo(
    () => [
      { color: '#D0D5DD', firstMessage: 'Non corrigées', studentNumber: 0 },
      { color: '#D0D5DD', firstMessage: 'En cours de corrections', studentNumber: 0 },
      { color: '#D0D5DD', firstMessage: 'Corrigées', studentNumber: 0 },
    ],
    []
  );

  const items = useMemo(
    () =>
      transformedData?.map((item) => ({
        color: finalCount || finalCount > 0 ? item.color : '#D0D5DD',
        firstMessage: item.status,
        studentNumber: item.studentNumber,
      })) || [],
    [transformedData, finalCount]
  );

  const series = useMemo(
    () => transformedData?.map((item) => item.studentNumber) || [100],
    [transformedData]
  );
  const colors = useMemo(
    () => transformedData?.map((item) => item.color) || ['#D9D9D9'],
    [transformedData]
  );

  return (
    <div className="flex items-center justify-center w-full pt-4 pb-4 border rounded-xl max-2xl:flex-wrap max-2xl:gap-4  h-[205px] ">
      <PieChartItem series={series} colors={colors} numberOfStudent={finalCount || '-'} />

      <div className="flex  ">
        {items.length
          ? items.map((item: OutputItem | any) => (
              <div key={item.color} className="flex  gap-2 pl-6">
                <div
                  className={`w-[5.08px] h-full rounded-[126.89px]  `}
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col gap-1 pl-4">
                  <span className="text-[#727272]">{item.firstMessage}</span>
                  <span className="text-10 font-[500] leading-9">
                    {item.studentNumber} étudiants
                  </span>
                </div>
              </div>
            ))
          : ''}
        {(!items.length && classeExam) || !classeExam
          ? defaultItems.map((item: OutputItem | any) => (
              <div key={item.color} className="flex  gap-2 pl-6">
                <div
                  className={`w-[5.08px] h-full rounded-[126.89px]  `}
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex flex-col gap-1 pl-4">
                  <span className="text-[#727272]">{item.firstMessage}</span>
                  <span className="text-10 font-[500] leading-9">
                    {item.studentNumber} étudiants
                  </span>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default StatistiquesItems;
